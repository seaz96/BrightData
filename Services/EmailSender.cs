using MailKit.Net.Smtp;
using MimeKit;

namespace digital_portfolio.Services;

public class EmailSender : IEmailSender
{
    public async Task SendEmailAsync(string email, string subject, string message)
    {
        using var emailMessage = new MimeMessage();

        emailMessage.From.Add(new MailboxAddress("BrightData", "brightdata@internet.ru"));
        emailMessage.To.Add(new MailboxAddress("", email));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
        {
            Text = message
        };

        using var client = new SmtpClient();

        await client.ConnectAsync("smtp.mail.ru", 465, true);
        await client.AuthenticateAsync("brightdata@internet.ru", "ruJHnqmYvsWRqAdEtprR");
        await client.SendAsync(emailMessage);

        await client.DisconnectAsync(true);
    }
}

