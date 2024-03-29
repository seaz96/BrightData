﻿using digital_portfolio.Data;
using digital_portfolio.Data.Entities;
using digital_portfolio.Data.Repositories;
using digital_portfolio.Models;
using digital_portfolio.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace digital_portfolio.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IRepository<UserEntity> _userRepository;
    private readonly ITokenService _tokenService;
    private readonly IConfiguration _configuration;
    private readonly IHasher _hasher;
    private readonly IEmailSender _emailSender;
    private readonly IPasswordGenerator _passwordGenerator;

    public AuthController(
        DataContext context, ITokenService tokenService, IConfiguration configuration, IRepository<UserEntity> userRepository, 
        IHasher hasher, IEmailSender emailSender, IPasswordGenerator passwordGenerator)
    {
        _context = context;
        _tokenService = tokenService;
        _configuration = configuration;
        _userRepository = userRepository;
        _hasher = hasher;
        _emailSender = emailSender;
        _passwordGenerator = passwordGenerator;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] AuthRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest("Invalid Model State");
        }

        var user = _userRepository
            .GetAll()
            .FirstOrDefault(x => x.Login == request.Login && _hasher.VerifyPassword(request.Password, x.Password));

        if (user is null)
        {
            return BadRequest("User not found");
        }

        var token = _tokenService.CreateToken(request, _configuration, user.Id);

        var result = new AuthResponse
        {
            Login = request.Login,
            Token = token,
            Id = user.Id,
        };

        return new ActionResult<AuthResponse>(result);
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest("Invalid Model State");
        }

        if (request.Password != request.PasswordConfirm)
        {
            return BadRequest("Passwords are different");
        }

        var mailRegex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");

        if (!mailRegex.IsMatch(request.Email))
        {
            return BadRequest("Wrong email insert");
        }

        var hashedPassword = _hasher.HashPassword(request.Password);

        var id = _context.Users.Count();

        var user = new UserEntity
        {
            Id = id.ToString(),
            Email = request.Email,
            Login = request.Login,
            Password = hashedPassword
        };

        if (_userRepository.GetAll().Any(x => x.Login == request.Login))
        {
            return BadRequest("User is already registered");
        }

        await _userRepository.Add(user);

        return await Login(
            new AuthRequest
            {
                Login = request.Login,
                Password = request.Password
            });
    }

    [Authorize]
    [HttpPost("change-password")]
    public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest("Invalid Model State");
        }

        var id = HttpContext.User.FindFirstValue("id");
        var user = await _context.Users.FindAsync(id);

        if (request.NewPassword != request.ConfirmNewPassword)
        {
            return BadRequest("Passwords are different");
        }

        if (request.NewPassword == request.OldPassword)
        {
            return BadRequest("Old and new passwords are same");
        }

        if (!_hasher.VerifyPassword(request.OldPassword, user!.Password))
        {
            return BadRequest("Old password is wrong");
        }

        user.Password = _hasher.HashPassword(request.NewPassword);

        await _context.SaveChangesAsync();

        return Ok("Password successfully changed");
    }

    [AllowAnonymous]
    [HttpPost("recover-password")]
    public async Task<ActionResult> RecoverPassword([FromBody] RecoverPasswordRequest request)
    {
        var user = _userRepository
            .GetAll()
            .FirstOrDefault(x => x.Login == request.Login);

        if (user is null)
        {
            return BadRequest("User not found");
        }

        if (user.Email != request.Email)
        {
            return BadRequest("Wrong email");
        }

        var newPassword = _passwordGenerator.GeneratePassword();

        await _emailSender.SendEmailAsync(user.Email, "Восстановление пароля",
            "Ваш новый пароль от аккаунта: " + newPassword);

        user.Password = _hasher.HashPassword(newPassword);

        await _context.SaveChangesAsync();

        return Ok("Mail sent");
    }
}
