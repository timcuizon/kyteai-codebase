using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SamWonAPI.Data;
using static SamWonAPI.Controllers.RecordsController;
using System.Data;

namespace SamWonAPI.Controllers
{
    [Route("api/ManageUsers")]
    [ApiController]
    public class ManageUsersController : Controller
    {
        private readonly SamwonDbContext _context;
        private readonly JwtValidationService _jwtValidationService;
        string[] allowedRoles;

        public ManageUsersController(SamwonDbContext context, JwtValidationService jwtValidationService)
        {
            _context = context;
            _jwtValidationService = jwtValidationService;
            allowedRoles = ["Admin"];
        }

        //Getting all the users
        [HttpPost("getAllUsers")]
        public IActionResult getUsers()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                DataTable dt = SharedClass.GetTable("GetAllUsers", true);
                if (dt.Rows.Count > 0)
                {
                    // Convert the DataTable to a list of Students
                    List<UsersRecordList> users = new List<UsersRecordList>();

                    foreach (DataRow row in dt.Rows)
                    {
                        users.Add(new UsersRecordList
                        {
                            id = row["userId"].ToString(),
                            Email = row["email"].ToString(),
                            Name = row["name"].ToString(),
                            Sex = row["sex"].ToString(),
                            Picture = row["picture"].ToString(),
                            Role = row["role"].ToString(),
                            Status = row["status"].ToString(),
                        });
                    }
                    return Ok(new
                    {
                        success = true,
                        users = users
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
    }
}
