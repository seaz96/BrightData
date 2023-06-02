using digital_portfolio.Data;
using digital_portfolio.Data.Entities;
using digital_portfolio.Data.Repositories;
using digital_portfolio.Models;
using digital_portfolio.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

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

    public AuthController(DataContext context, ITokenService tokenService,
        IConfiguration configuration, IRepository<UserEntity> userRepository, IHasher hasher)
    {
        _context = context; 
        _tokenService = tokenService; 
        _configuration = configuration;
        _userRepository = userRepository;
        _hasher = hasher;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] AuthRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid Model State");

        var user = _userRepository
            .GetAll()
            .FirstOrDefault(x => x.Login == request.Login && _hasher.VerifyPassword(request.Password, x.Password));

        if (user == null)
            return BadRequest("User not found");

        var token = _tokenService.CreateToken(request, _configuration, user.Id);

        var result = new AuthResponse() {Login = request.Login, Token = token};

        return new ActionResult<AuthResponse>(result);
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid Model State");

        if (request.Password != request.PasswordConfirm)
            return BadRequest("Passwords are different");

        var hashedPassword = _hasher.HashPassword(request.Password);

        var id = _context.Users.Count();

        var user = new UserEntity()
        {
            Id = id.ToString(),
            Email = request.Email,
            Login = request.Login,
            Password = hashedPassword
        };

        if (_userRepository.GetAll().FirstOrDefault(x => x.Login == request.Login) != null)
            return BadRequest("User is already registered");

        await _userRepository.Add(user);

        return await Login(new AuthRequest() { Login = request.Login, Password = request.Password });
    }

    [Authorize]
    [HttpPost("change-password")]
    public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid Model State");

        var id = HttpContext.User.FindFirstValue("id");
        var user = _context.Users.FindAsync(id).Result;

        if (request.NewPassword != request.ConfirmNewPassword)
            return BadRequest("Passwords are different");

        if (request.NewPassword == request.OldPassword)
            return BadRequest("Old and new passwords are same");

        if (!_hasher.VerifyPassword(request.OldPassword, user.Password))
            return BadRequest("Old password is wrong");

        user.Password = _hasher.HashPassword(request.NewPassword);

        await _context.SaveChangesAsync();

        return Ok("Password successfully changed");
    }
}
