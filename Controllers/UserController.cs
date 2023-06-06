using digital_portfolio.Data;
using digital_portfolio.Data.Entities;
using digital_portfolio.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace digital_portfolio.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly DataContext _context;

    public UsersController(DataContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet("get-my-info")]
    public async Task<ActionResult> GetMyInfo()
    {
        var id = HttpContext.User.FindFirstValue("id");
        var user = await _context.Users.FindAsync(id);

        var response = new UserProfileResponse
        {
            Description = user!.Description,
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
    [HttpPost("update")]
    public async Task<ActionResult> UpdateUserInfo([FromBody] UserUpdateRequest updatedUser)
    {
        var id = HttpContext.User.FindFirstValue("id");
        var user = await _context.Users.FindAsync(id);

        user!.Description = updatedUser.Description;
        user.Photo = updatedUser.Photo;
        user.TelegramLink = updatedUser.TelegramLink;
        user.VkLink = updatedUser.VkLink;
        user.Email = updatedUser.Email;
        user.Name = updatedUser.Name;

        await _context.SaveChangesAsync();

        return Ok("User info updated");
    }

    [AllowAnonymous]
    [HttpGet("id/{id}")]
    public async Task<ActionResult> GetUserById(string id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user is null)
        {
            return BadRequest("User not found");
        }

        var userProjects = _context.Projects.Where(x => x.AuthorID == id).ToList();

        var response = new UserProfileResponse
        {
            Description = user.Description,
            Photo = user.Photo,
            TelegramLink = user.TelegramLink,
            Id = user.Id,
            Login = user.Login,
            Name = user.Name,
            VkLink = user.VkLink,
            Projects = userProjects
        };

        return Ok(response);
    }
}

