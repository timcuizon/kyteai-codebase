using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

public class JwtValidationService
{
    private IConfiguration _configuration;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public JwtValidationService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
    {
        _configuration = configuration;
        _httpContextAccessor = httpContextAccessor;
    }


    public bool ValidateJWTClaims(string[] roles, string authHeader)
    {
        var authorizationHeader = authHeader;

        if (string.IsNullOrWhiteSpace(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
        {
            return false;
        }

        var token = authorizationHeader.Substring("Bearer ".Length);

        // Configure JWT token validation parameters
        var tokenHandler = new JwtSecurityTokenHandler();
        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = _configuration["AppSettings:Issuer"],
            ValidAudience = _configuration["AppSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(_configuration["AppSettings:Token"])
            )
        };

        try
        {
            // Validate the token
            SecurityToken validatedToken;
            var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);

            // Check for a specific role claim
            var roleClaim = claimsPrincipal.FindFirst(ClaimTypes.Role);
            if (roleClaim != null && roles.Contains(roleClaim.Value))
            {
                return true;
            }
        }
        catch (SecurityTokenExpiredException)
        {
            // Token has expired
        }
        catch (SecurityTokenValidationException)
        {
            // Token validation failed
        }
        catch (Exception)
        {
            // Other exceptions
        }

        return false;
    }
}
