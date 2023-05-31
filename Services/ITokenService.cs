using digital_portfolio.Data.Entities;
using digital_portfolio.Models;

namespace digital_portfolio.Services;
public interface ITokenService
{
    string CreateToken(AuthRequest authRequest, IConfiguration configuration, string id);
}
