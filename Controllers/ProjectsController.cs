﻿using digital_portfolio.Data;
using digital_portfolio.Data.Entities;
using digital_portfolio.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using digital_portfolio.Helpers;

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
        var user = await _context.Users.FindAsync(userId);
        var projectId = _context.Projects.Count().ToString();

        var project = new ProjectEntity
        {
            Name = request.Name,
            AuthorID = user!.Id,
            Description = request.Description,
            Id = projectId
        };

        await _context.Projects.AddAsync(project);

        await _context.SaveChangesAsync();

        return Ok("Project created");
    }

    [Authorize]
    [HttpPost("comment")]
    public async Task<ActionResult> CommentProject([FromBody] ProjectCommentRequest request, string projectId)
    {
        var userId = HttpContext.User.FindFirstValue("id");
        var project = await _context.Projects.FindAsync(projectId);

        var now = DateTime.Now;
        var publishedDate = now.ToLocalTime().ToString("yyyy-MM-dd HH:mm:ss \"GMT\"zzz");

        var comment = new CommentsEntity()
        {
            AuthorID = userId!,
            Comment = request.Text,
            PublishedDate = publishedDate,
        };

        project!.Comments.Add(comment);

        await _context.SaveChangesAsync();

        return Ok(comment);
    }

    [Authorize]
    [HttpPost("update")]
    public async Task<ActionResult> UpdateProject([FromBody] ProjectUpdateRequest request, string projectId)
    {
        var userId = HttpContext.User.FindFirstValue("id");
        var project = await _context.Projects.FindAsync(projectId);

        if (userId != project!.AuthorID)
        {
            return BadRequest("User has no access");
        }

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

    [Authorize]
    [HttpPost("like")]
    public async Task<ActionResult> AddLike([FromBody] string projectId)
    {
        var project = await _context.Projects.FindAsync(projectId);

        if (project is null)
        {
            return BadRequest("Project not found");
        }

        project.Likes++;

        await _context.SaveChangesAsync();

        return Ok();
    }

    [AllowAnonymous]
    [HttpGet("id/{id}")]
    public async Task<ActionResult> GetProjectByid(string id)
    {
        var project = await _context.Projects
            .Include(x => x.Comments)
            .Include(x => x.Technologies)
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();

        if (project is null)
        {
            return BadRequest("Project not found");
        }

        return Ok(project);
    }

    [AllowAnonymous]
    [HttpGet("feed")]
    public ActionResult<ProjectsFeedResponse> GetProjectsFeed(int count)
    {
       var projects = _context.Projects
            .Include(x => x.Comments)
            .Include(x => x.Technologies)
            .OrderBy(x => x.Likes + x.Comments.Count * 5)
            .Take(count)
            .ToList();
            
        projects.Shuffle();

        var response = new ProjectsFeedResponse
        {
            Projects = projects,
        };

        return new ActionResult<ProjectsFeedResponse>(response);
    }
}

