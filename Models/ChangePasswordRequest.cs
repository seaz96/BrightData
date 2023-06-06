namespace digital_portfolio.Models;

public class ChangePasswordRequest
{
    public string Login { get; set; }

    public string OldPassword { get; set; }

    public string NewPassword { get; set; }

    public string ConfirmNewPassword { get; set; }
}
