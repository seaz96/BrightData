using digital_portfolio.Data;
using digital_portfolio.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using digital_portfolio.Models;
using Npgsql.Internal.TypeHandlers;

namespace digital_portfolio.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProjectsController : ControllerBase
{
    private readonly DataContext _context;

    public ProjectsController(DataContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpPost("add")]
    public async Task<ActionResult> AddProject([FromBody] NewProjectRequest request)
    {
        var userId = HttpContext.User.FindFirstValue("id");
        var user = _context.Users.FindAsync(userId).Result;
        var projectId = _context.Projects.Count().ToString();

        var project = new ProjectEntity()
        {
            Name = request.Name,
            AuthorID = user.Id,
            Description = request.Description,
            Id = projectId
        };

        await _context.Projects.AddAsync(project);
        await _context.SaveChangesAsync();

        return Ok("Project created");
    }

    [Authorize]
    [HttpPost("update")]
    public async Task<ActionResult> UpdateProject([FromBody] ProjectUpdateRequest request, string projectId)
    {
        var userId = HttpContext.User.FindFirstValue("id");
        var user = _context.Users.FindAsync(userId).Result;
        var project = _context.Projects.FindAsync(projectId).Result;

        if (userId != project.AuthorID)
            return BadRequest("User has no access");

        project.Name = request.Name;
        project.Description = request.Description;
        project.GithubLink = request.GithubLink;
        project.Photo = request.Photo;

        foreach (var entity in request.Technologies)
        {
            entity.Id = Guid.NewGuid().ToString();
        }

        project.Technologies = request.Technologies;

        await _context.SaveChangesAsync();

        return Ok(request.Technologies);
    }
}

