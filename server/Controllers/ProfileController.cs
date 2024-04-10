using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SamWonAPI.Data;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace SamWonAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly SamwonDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly JwtValidationService _jwtValidationService;
        string[] allowedRoles;

        public ProfileController(SamwonDbContext context, IConfiguration configuration, JwtValidationService jwtValidationService)
        {
            _context = context;
            _configuration = configuration;
            _jwtValidationService = jwtValidationService;
            allowedRoles = ["Student", "Parent", "Professional", "Admin"];
        }

        // GET: api/<AndreTestController>
        [AllowAnonymous]
        [HttpPost("GetProfile")]
        public IActionResult GetProfile([FromForm] ProfileModel data)
        {
            try
            {

                var paramaters = new
                {
                    email = data.email,
                };

                DataTable dt = SharedClass.GetTable("GetProfile", true, paramaters);

                if (dt.Rows.Count > 0)
                {

                    List<ProfileData> profileData = new List<ProfileData>();

                    foreach (DataRow row in dt.Rows)
                    {
                        DateTime dob = (DateTime)row["dob"];

                        profileData.Add(new ProfileData()
                        {
                            email = row["email"].ToString(),
                            dob = dob.ToString("MMMM dd, yyyy"),
                            sex = row["sex"].ToString(),
                            role = row["role"].ToString(),
                            picture = row["picture"].ToString(),
                            name = row["givenname"].ToString() + " " + row["familyname"],
                            userId = row["userId"].ToString(),
                        });
                    }

                    //Testing Start

                    //List<ProfileData> profileData = new List<ProfileData>();

                    //profileData.Add(new ProfileData()
                    //{
                    //    email = "test@gmail.com",
                    //    dob = "January 20, 2024",
                    //    sex = "Male",
                    //    role = "Student"
                    //});
                    //Testing End
                    return Ok(profileData);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                // Log the exception for debugging and monitoring purposes
                // This could be using a logging framework like Serilog, NLog, or simply writing to a file or database
                // Example: _logger.LogError(ex, "An error occurred in GetProfile method.");

                // Return an appropriate error response
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [AllowAnonymous]
        [HttpPost("GetProfileInfo")]
        public IActionResult GetProfileInfo([FromForm] ProfileModel data)
        {
            try
            {
                var parameters = new
                {
                    email = data.email,
                };

                DataTable dt = SharedClass.GetTable("GetProfile", true, parameters);

                if (dt.Rows.Count > 0)
                {
                    var row = dt.Rows[0]; // Assuming only one row is expected

                    var userId = row["userId"].ToString(); // Replace with the actual column name
                    var userType = row["role"].ToString(); // Replace with the actual column name

                    return Ok(new { UserId = userId, UserType = userType });
                }
                else
                {
                    return NotFound("User not found");
                }
            }
            catch (Exception ex)
            {
                // Log the exception for debugging and monitoring purposes
                // This could be using a logging framework like Serilog, NLog, or simply writing to a file or database
                // Example: _logger.LogError(ex, "An error occurred in GetProfileInfo method.");

                // Return an appropriate error response
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [AllowAnonymous]
        [HttpPost("AffiliateGet")]
        public IActionResult AffiliateGet([FromForm] AffiliateModel data)
        {
            try
            {
                var parameters = new
                {
                    email = data.email,
                };

                DataTable dt = SharedClass.GetTable("AffiliateGet", true, parameters);

                if (dt.Rows.Count > 0)
                {
                    List<AffiliateData> affiliateData = new List<AffiliateData>();

                    foreach (DataRow row in dt.Rows)
                    {

                        affiliateData.Add(new AffiliateData()
                        {
                            fullname = row["fullname"].ToString(),
                            picture = row["picture"].ToString(),
                            email = row["email"].ToString(),
                            relationship = row["relationship"].ToString(),
                        });
                    }
                    return Ok(affiliateData);
                }
                else
                {
                    return Ok("No records found");
                }
            }
            catch (Exception ex)
            {
                // Log the exception for debugging and monitoring purposes
                // This could be using a logging framework like Serilog, NLog, or simply writing to a file or database
                // Example: _logger.LogError(ex, "An error occurred in GetProfileInfo method.");

                // Return an appropriate error response
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }


        // USER NOTIFICATION LOGIC
        [AllowAnonymous]
        [HttpPost("NotificationGet")]
        public IActionResult NotificationGet([FromForm] NotificationRequestModel data)
        {
            try
            {
                var parameters = new
                {
                    userId = data.UserId,
                    userType = data.UserType
                };

                DataTable dt = SharedClass.GetTable("NotificationGet", true, parameters);

                if (dt.Rows.Count > 0)
                {
                    List<NotificationData> notificationData = new List<NotificationData>();

                    foreach (DataRow row in dt.Rows)
                    {
                        DateTime createdAt = (DateTime)row["created_at"];

                        notificationData.Add(new NotificationData()
                        {
                            Id = (int)row["id"],
                            UserId = row["userId"].ToString(),
                            Description = row["description"].ToString(),
                            NotificationStatus = (int)row["notification_status_id"],
                            CreatedAt = createdAt.ToString("MMMM dd, yyyy hh:mm tt"),
                            Title = row["title"].ToString(),
                            Link = row["link"].ToString(),
                        });
                    }

                    return Ok(notificationData);
                }
                else
                {
                    return Ok("No notifications found for the specified user.");
                }

            }
            catch (Exception ex)
            {
                // Log the exception for debugging and monitoring purposes
                // This could be using a logging framework like Serilog, NLog, or simply writing to a file or database
                // Example: _logger.LogError(ex, "An error occurred in GetProfile method.");

                // Return an appropriate error response
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [AllowAnonymous]
        [HttpPost("NotificationUpdateStatus")]
        public IActionResult Notification([FromForm] NotificationUpdateStatusModel data)
        {
            var parameters = new
            {
                userType = data.userType,
                notifId = data.notifId,
                status = data.status,
            };

            string dt = SharedClass.Execute_Query("NotificationUpdateStatus", true, parameters);

            return Ok(dt);
        }


        [AllowAnonymous]
        [HttpPost("EditProfile")]
        public IActionResult EditProfile([FromForm] EditProfileModel data)
        {
            var parameters = new
            {
                email = data.email,
                sex = data.sex,
                role = data.role
            };

            string dt = SharedClass.Execute_Query("UpdateProfile", true, parameters);

            return Ok(dt);
        }


        [AllowAnonymous]
        [HttpPost("GetUserActivityLogs")]
        public IActionResult GetUserActivityLogs([FromForm] RequestModel data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    StatusCode = 400,
                    success = false,
                    errors = string.Join("; ", ModelState.Values
                                            .SelectMany(x => x.Errors)
                                            .Select(x => x.ErrorMessage))
                });
            }

            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                var parameters = new
                {
                    email = data.email,
                    role = data.role
                };
                DataTable dt = SharedClass.GetTable("GetUserActivityLogs", true, parameters);

                if (dt.Rows.Count > 0)
                {

                    List<ActivityLogsModel> activityLogs = new List<ActivityLogsModel>();

                    foreach (DataRow row in dt.Rows)
                    {

                        activityLogs.Add(new ActivityLogsModel()
                        {
                            activity = row["activity"].ToString(),
                            createdAt = row["created_at"].ToString()
                        });
                    }

                    return Ok(activityLogs);
                }
                else
                {
                    return NoContent();
                }
            }
            else
            {
                return BadRequest("Unauthorized User");
            }
        }

        public class EditProfileModel
        {
            [Required]
            public string email { get; set; }
            public string sex { get; set; }
            public string role { get; set; }
        }
        public class RequestModel
        {
            [Required]
            public string email { get; set; }
            public string role { get; set; }
        }
        public class ActivityLogsModel
        {
            [Required]
            public string activity { get; set; }
            public string createdAt { get; set; }
        }
        public class NotificationUpdateStatusModel
        {
            public string userType { get; set; }
            public int notifId { get; set; }
            public int status { get; set; }
        }

        public class NotificationRequestModel
        {
            public string UserId { get; set; }
            public string UserType { get; set; }
        }

        public class ProfileModel
        {
            [Required]
            [EmailAddress]
            public string email { get; set; }
        }

        public class AffiliateModel
        {
            [Required]
            [EmailAddress]
            public string email { get; set; }
        }

        public class NotificationData
        {
            // "type" means the type of the notification (report, appointment, etc)
            public int Id { get; set; }
            public string UserId { get; set; }
            public string Description { get; set; }
            public int NotificationStatus { get; set; }
            public string CreatedAt { get; set; }

            public string Title { get; set; }
            public string Link { get; set; }
        }

        public class AffiliateData
        {
            // "type" means the type of the notification (report, appointment, etc)
            public string fullname { get; set; }
            public string picture { get; set; }
            public string email { get; set; }
            public string relationship { get; set; }
        }

        public class ProfileData
        {
            public string email { get; set; }
            public string dob { get; set; }
            public string sex { get; set; }
            public string role { get; set; }
            public string? picture { get; set; }
            public string? name { get; set; }
            public string? userId { get; set; }
        }
    }
}