using System.Security.Claims;
using digital_portfolio.Data;
using digital_portfolio.Data.Entities;
using digital_portfolio.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace digital_portfolio.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly DataContext _context;

    public UserController(DataContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet("get-my-info")]
    public async Task<ActionResult> GetMyInfo()
    {
        var id = HttpContext.User.FindFirstValue("id");
        var user = _context.Users.FindAsync(id).Result;

        var response = new UserProfileResponse()
        {
            Description = user.Description,
            Id = user.Id,
            Login = user.Login,
            Name = user.Name,
            Photo = user.Photo,
            TelegramLink = user.TelegramLink,
            VkLink = user.VkLink
        };

        return Ok(response);
    }

    [Authorize]
    [HttpPost("update-info")]
    public async Task<ActionResult> UpdateUserInfo([FromBody] UserUpdateRequest updatedUser)
    {
        var id = HttpContext.User.FindFirstValue("id");
        var user = _context.Users.FindAsync(id).Result;

        user.Description = updatedUser.Description;
        user.Photo = updatedUser.Photo;
        user.TelegramLink = updatedUser.TelegramLink;
        user.VkLink = updatedUser.VkLink;
        user.Email = updatedUser.Email;
        user.Name = updatedUser.Name;

        await _context.SaveChangesAsync();

        return Ok("User info updated");
    }
}

