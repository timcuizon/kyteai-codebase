using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using SamWonAPI.Data;
using SamWonAPI.Models;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Security.Cryptography;

namespace SamWonAPI.Controllers
{

    [EnableCors("AllowEverything")]
    [Route("api/Auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SamwonDbContext _context;
        private readonly IConfiguration _configuration;

        public static string samwonClient = "";
        public AuthController(SamwonDbContext samwonContext, IConfiguration configuration)
        {
            _context = samwonContext;
            _configuration = configuration;
            samwonClient = _configuration.GetSection("clientUrl").Value;
        }

        [AllowAnonymous]
        [HttpPost("google-login")]
        public IActionResult GoogleLogin(string? returnUrl)
        {
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("GoogleResponse", new { returnUrl = returnUrl, prompt = "consent" }),
                Parameters = { { "prompt", "select_account" } }
            };

            return Challenge(properties, GoogleDefaults.AuthenticationScheme); ;
        }

        [AllowAnonymous]
        [HttpGet("google-response")] // route for Google auth response receiver
        public async Task<IActionResult> GoogleResponse(string? returnUrl)
        {
            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            var accessToken = await HttpContext.GetTokenAsync(GoogleDefaults.AuthenticationScheme, "access_token");

            if (accessToken == null)
            {
                HttpContext.SignOutAsync();
                //Response.Cookies.Delete("ParentPortal");
                return Content("<script language='javascript' type='text/javascript'>window.location.href='" + samwonClient + "/authentication/sign-in';</script>", "text/html");
            }

            // Use the access token to fetch the user's profile information, including the profile picture.
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                var response = await client.GetAsync("https://www.googleapis.com/oauth2/v2/userinfo");


                if (response.IsSuccessStatusCode)
                {
                    //Instantiate a Google User Model
                    var userInfoJson = await response.Content.ReadAsStringAsync();
                    var userInfo = JsonConvert.DeserializeObject<GoogleUserInfo>(userInfoJson);
                    var username = userInfo.Email.Split("@");
                    var domainEmail = username[1];
                    userInfo.Username = username[0];
                    userInfo.DomainEmail = domainEmail;

                    var claims = result.Principal.Identities.FirstOrDefault().Claims.Select(claim => new
                    {
                        claim.Type,
                        claim.Value
                    });

                    var givenNameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName);
                    userInfo.GivenName = !string.IsNullOrEmpty(givenNameClaim?.Value) ? givenNameClaim.Value : " ";

                    var familyNameClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.Surname);
                    userInfo.FamilyName = !string.IsNullOrEmpty(familyNameClaim?.Value) ? familyNameClaim.Value : " ";


                    //if claims was returned from google
                    if (claims != null)
                    {
                        //checked if google account exists in the database
                        var auth_res = Authenticate(userInfo.Email, userInfo.GivenName, userInfo.FamilyName, userInfo.Picture);


                        // Check the status code
                        if (auth_res is OkObjectResult okObjectResult)
                        {
                            var data = okObjectResult.Value as dynamic;

                            //Generate User Token
                            userInfo.Role = data.Role;
                            var user_token = GenerateJWT(userInfo);

                            //isEligible, it will just go 1 when the user is Professional Admin
                            //Checking if the professional is eligible to interpret
                            int? isEligible = 0; // Change the type to int? to accommodate nullable values

                            if (data.Role == "Professional")
                            {
                                var aisEligible = _context.Professionals
                                        .Where(e => e.Email == userInfo.Email)
                                        .Select(e => e.IsEligible)
                                        .FirstOrDefault();
                                isEligible = aisEligible ?? 0; // Use null-coalescing operator to provide a default value
                            }

                            var returnUri = $"{samwonClient}/auth?success=true&user_token={user_token.Result.Token}&gaccess_token={accessToken}&token_type=Bearer&givenName={userInfo.GivenName}&familyName={userInfo.FamilyName}&email={userInfo.Email}&role={userInfo.Role}&picture={userInfo.Picture}&ie={isEligible}";


                            return RedirectPermanent(returnUri);

                            //return Ok(new
                            //{
                            //    Success = true,
                            //    User_token = user_token.Result.Token,
                            //    GAccess_token = accessToken,
                            //    Refresh_token = data.Refresh_token,
                            //    Token_type = "Bearer",
                            //    Role = userInfo.Role,
                            //});

                            //============= For implementing the encryption
                            //var encrypted = Encrypt.EncryptString(user_token.Result.Token, _configuration.GetSection("AppSettings:CryptKey").Value);
                            //var decrypted = Encrypt.DecryptString(encrypted, _configuration.GetSection("AppSettings:CryptKey").Value);
                            //var returnUri = $"http://localhost:3000/auth?access={user_token}";
                            //return RedirectPermanent(returnUri);
                        }
                        else
                        {
                            // Handle the case where the user details are not available
                            string message = "User does not exist in the database. Contact your local administrator";
                            HttpContext.SignOutAsync();
                            //Response.Cookies.Delete("ParentPortal");
                            return Content("<script language='javascript' type='text/javascript'>alert('" + message + ", contact help@ismanila.org for more info.');window.location.href='" + samwonClient + "/authentication/sign-in';</script>", "text/html");
                        }
                    }
                    else
                    {
                        HttpContext.SignOutAsync();
                        //Response.Cookies.Delete("ParentPortal");
                        return Content("<script language='javascript' type='text/javascript'>window.location.href='" + samwonClient + "/authentication/sign-in';</script>", "text/html");
                    }
                }
                else
                {
                    // Handle the case where the user details are not available
                    string message = "User does not exist in the database. Contact your local administrator";
                    HttpContext.SignOutAsync();
                    //Response.Cookies.Delete("ParentPortal");
                    return Content("<script language='javascript' type='text/javascript'>alert('" + message + ", contact help@ismanila.org for more info.');window.location.href='" + samwonClient + "/authentication/sign-in';</script>", "text/html");
                }
            }
        }

        [HttpGet]
        public IActionResult Authenticate(string emailAddress, string givenName, string familyName, string picture)
        {
            //Check if nag eexist na sa logged in user
            bool emailExists = _context.UserLogins.Any(e => e.Email == emailAddress);

            double GeneratedTokenDateTime = 1; // hours
            var refreshToken = "";
            var role = "";

            //if yes, check the validity of refresh token
            if (emailExists)
            {
                UserLogin userLogin = _context.UserLogins.FirstOrDefault(e => e.Email == emailAddress);
                role = userLogin.Role;

                //check the validity of refresh token
                if (userLogin.RefreshTokenExpiration >= DateTime.Now)
                {
                    //if yes, return the creds, and refresh RefreshTokenExpiration
                    refreshToken = GenerateRefreshToken();
                    userLogin.RefreshToken = refreshToken;
                    userLogin.RefreshTokenExpiration = DateTime.Now.AddHours(GeneratedTokenDateTime);
                    refreshToken = userLogin.RefreshToken;
                }
                else
                {
                    //if no, generate new refresh token and save
                    refreshToken = GenerateRefreshToken();
                    userLogin.RefreshToken = refreshToken;
                    userLogin.RefreshTokenExpiration = DateTime.Now.AddHours(GeneratedTokenDateTime);
                    _context.SaveChanges();
                }
                //Update the last_login
                userLogin.LastLogin = DateTime.Now;
                //Update the user's info
                if (role == "Student")
                {
                  Student user = _context.Students.FirstOrDefault(e => e.Email == emailAddress);
                    user.Givenname = givenName;
                    user.Familyname = familyName;
                    user.Picture = picture;
                }
                else if(role == "Parent")
                {
                    Parent user = _context.Parents.FirstOrDefault(e => e.Email == emailAddress);
                    user.Givenname = givenName;
                    user.Familyname = familyName;
                    user.Picture = picture;
                }
                else if (role == "Professional")
                {
                    Professional user = _context.Professionals.FirstOrDefault(e => e.Email == emailAddress);
                    user.Givenname = givenName;
                    user.Familyname = familyName;
                    user.Picture = picture;
                }
                else if (role == "Admin")
                {
                    Admin user = _context.Admins.FirstOrDefault(e => e.Email == emailAddress);
                    user.Givenname = givenName;
                    user.Familyname = familyName;
                    user.Picture = picture;
                }
                _context.SaveChanges();
            }
            //if no, check if the user exists in the db
            //FIRST TIME LOG IN
            else
            {
                //Method to Check if user already exist
                var parameters = new
                {
                    Email = emailAddress,
                };

                DataTable dt = SharedClass.GetTable("AuthUserEmail", true, parameters);
                if (dt.Rows.Count > 0)
                {
                    //if yes, generate logged in creds
                    // Create a new userLogin
                    refreshToken = GenerateRefreshToken();
                    var userLogin = new UserLogin();
                    userLogin.Email = emailAddress;
                    userLogin.RefreshToken = refreshToken;
                    userLogin.RefreshTokenExpiration = DateTime.Now.AddHours(GeneratedTokenDateTime);
                    userLogin.Role = dt.Rows[0]["role"].ToString();
                    userLogin.LastLogin = DateTime.Now;
                    role = userLogin.Role;
                    _context.UserLogins.Add(userLogin);
                    // Save the changes to the database
                    _context.SaveChanges();
                }
                else
                {
                    //if no, USER NOT EXIST
                    //return StatusCode(500, "Please make sure that you have entered a correct google email");

                    //SPECIAL CASEE FOR SYSTEM TESTING
                    refreshToken = GenerateRefreshToken();
                    var userLogin = new UserLogin();
                    userLogin.Email = emailAddress;
                    userLogin.RefreshToken = refreshToken;
                    userLogin.RefreshTokenExpiration = DateTime.Now.AddHours(GeneratedTokenDateTime);
                    userLogin.Role = "Tester";
                    role = userLogin.Role;
                    _context.UserLogins.Add(userLogin);
                    // Save the changes to the database
                    _context.SaveChanges();
                }
            }
            return Ok(new
            {
                Success = true,
                Refresh_token = refreshToken,
                Role = role,
            });
        }

        private async Task<JwtResponse> GenerateJWT(GoogleUserInfo user)
        {
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name,user.Name),
                new Claim(ClaimTypes.GivenName,user.Name),
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Role,user.Role),
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
            await HttpContext.SignInAsync(claimsPrincipal, new AuthenticationProperties
            {
                IsPersistent = true,
            });


            var token = new JwtSecurityToken(_configuration.GetSection("AppSettings:Issuer").Value,
                _configuration.GetSection("AppSettings:Audience").Value,
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            var jwtResponse = new JwtResponse
            {
                Token = jwt,
                Expiration = token.ValidTo,
                Success = true
            };

            return jwtResponse;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

    }
    public class JwtResponse
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public bool Success { get; set; }
    }

    public class Tokens
    {
        [Required]
        public string Refresh_token { get; set; }
    }

    public class NewAccountModel
    {
        [Required]
        public string Email { get; set; }
        public string? GivenName { get; set; }
        public string? familyName { get; set; }
        [Required]
        public string dob { get; set; }
        [Required]
        public string Sex { get; set; }
        [Required]
        public string Picture { get; set; }
        [Required]
        public string Role { get; set; }
    }
}