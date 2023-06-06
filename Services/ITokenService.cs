using digital_portfolio.Models;

namespace digital_portfolio.Services;

public interface ITokenService
{
    public string CreateToken(AuthRequest authRequest, IConfiguration configuration, string id);
}
