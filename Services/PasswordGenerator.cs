using System.Text;

namespace digital_portfolio.Services;

public class PasswordGenerator : IPasswordGenerator
{
    public string GeneratePassword()
    {
        const string chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

        var sb = new StringBuilder();
        var rnd = new Random(Guid.NewGuid().GetHashCode());

        for (int i = 0; i < 8; i++)
        {
            var index = rnd.Next(chars.Length);
            sb.Append(chars[index]);
        }

        return sb.ToString();
    }
}

