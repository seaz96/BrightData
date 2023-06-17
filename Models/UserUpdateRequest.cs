namespace digital_portfolio.Models;

public class UserUpdateRequest
{
    public string? Email { get; set; }

    public string? Name { get; set; }

    public string? VkLink { get; set; }

    public string? TelegramLink { get; set; }

    public string? Description { get; set; }

    public string? Photo { get; set; }
}
