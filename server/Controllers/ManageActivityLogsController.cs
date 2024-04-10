using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SamWonAPI.Data;
using static SamWonAPI.Controllers.RecordsController;
using System.Data;
using System.ComponentModel.DataAnnotations;

namespace SamWonAPI.Controllers
{
    [Route("api/ManageActivityLogs")]
    [ApiController]
    public class ManageActivityLogsController : Controller
    {
        private readonly SamwonDbContext _context;
        private readonly JwtValidationService _jwtValidationService;
        string[] allowedRoles;

        public ManageActivityLogsController(SamwonDbContext context, JwtValidationService jwtValidationService)
        {
            _context = context;
            _jwtValidationService = jwtValidationService;
            allowedRoles = ["Admin"];
        }

        //Getting all the users
        [HttpPost("GetAllActivityLogs")]
        public IActionResult GetAllActivityLogs()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                DataTable dt = SharedClass.GetTable("GetAllActivityLogs", true);
                if (dt.Rows.Count > 0)
                {
                    // Convert the DataTable to a list of Students
                    List<ActivityLogsModel> acitivtyLogs = new List<ActivityLogsModel>();

                    foreach (DataRow row in dt.Rows)
                    {
                        acitivtyLogs.Add(new ActivityLogsModel
                        {
                            id = row["userId"].ToString(),
                            Name = row["name"].ToString(),
                            Picture = row["picture"].ToString(),
                            Email = row["email"].ToString(),
                            Activity = row["activity"].ToString(),
                            Created_At = row["created_at"].ToString(),
                            Role = row["position"].ToString(),
                        });
                    }
                    return Ok(new
                    {
                        success = true,
                        users = acitivtyLogs
                    });
                }
                else
                {
                    return Ok(new
                    {
                        success = true,
                        message = "no records found."
                    });
                }
            }
            else
            {
                return BadRequest("Unauthorized User");
            }

        }

        public class ActivityLogsModel
        {
            [Required]
            public string id { get; set; }

            [Required]
            public string Name { get; set; }

            [Required]
            public string Picture { get; set; }

            [Required]
            public string Email { get; set; }

            [Required]
            public string Activity { get; set; }

            [Required]
            public string Role { get; set; }

            [Required]
            public string Created_At { get; set; }
        }
    }
}
