using System.ComponentModel.DataAnnotations;

namespace digital_portfolio.Models;

public class RegisterRequest
{
    [Required]
    public string Login { get; set; }

    [Required]
    public string Password { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public string PasswordConfirm { get; set; }
}

