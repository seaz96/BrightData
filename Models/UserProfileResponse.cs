﻿namespace digital_portfolio.Data.Entities;

public class UserProfileResponse : BaseEntity
{
    public string Login { get; set; }

    public string Email { get; set; }

    public string? Name { get; set; }

    public string? VkLink { get; set; }

    public string? TelegramLink { get; set; }

    public string? Description { get; set; }

    public string? Photo { get; set; }

    public ICollection<ProjectEntity>? Projects { get; set; }
}
