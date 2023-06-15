namespace digital_portfolio.Services;

public interface IEmailSender
{
    public Task SendEmailAsync(string email, string subject, string message);
}

