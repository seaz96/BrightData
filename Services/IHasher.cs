namespace digital_portfolio.Services;
public interface IHasher
{
    public string HashPassword(string password);

    public bool VerifyPassword(string password, string hashedPassword);
}

