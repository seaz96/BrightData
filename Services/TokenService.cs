using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using digital_portfolio.Models;
using Microsoft.IdentityModel.Tokens;

namespace digital_portfolio.Services;
internal sealed class TokenService : ITokenService
{
    public string CreateToken(AuthRequest authRequest, IConfiguration configuration, string id)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(configuration["Jwt:Secret"]);
        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(new[] { new Claim("login", authRequest.Login), new Claim("id", id)}),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
