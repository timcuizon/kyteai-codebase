using Microsoft.AspNetCore.Mvc;
using SamWonAPI.Data;
using SamWonAPI.Models;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace SamWonAPI.Controllers
{
    [Route("api/Records")]
    [ApiController]
    public class RecordsController : ControllerBase
    {
        private readonly SamwonDbContext _context;
        private readonly JwtValidationService _jwtValidationService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        string[] allowedRoles;

        public RecordsController(SamwonDbContext context, JwtValidationService jwtValidationService, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _jwtValidationService = jwtValidationService;
            _httpContextAccessor = httpContextAccessor;
            allowedRoles = ["Admin", "Professional"];
        }

        [HttpPost("getUsers")]
        public IActionResult getUsers([FromForm] UserIdentity data)
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                //var students = _context.Students
                //        .Where(student => student.AccountStatusId == 1)
                //        .ToList();

                string role = _context.UserLogins.Where(e => e.Email == data.email).Select(i => i.Role).FirstOrDefault();

                var param = new
                {
                    role = role,
                };

                DataTable dt = SharedClass.GetTable("GetUsers", true, param);
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

        [HttpPost("getUserRecord")]
        public IActionResult getUserRecord([FromForm] UserIdentity data)
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                //Method to Check if user already exist
                var param_email = new
                {
                    email = data.email,
                };
                var param_userId = new
                {
                    userId = data.userId,
                };

                //Executing multiple SPs
                DataTable dt_appointments = SharedClass.GetTable("GetUserRecordsAppointments", true, param_email);
                DataTable dt_drawings = SharedClass.GetTable("GetUserRecordsDrawings", true, param_userId);
                DataTable dt_reports = SharedClass.GetTable("GetUserRecordsReports", true, param_email);


                // Convert the DataTable to a list of appointments
                List<RecordAppointment> appointments = new List<RecordAppointment>();
                foreach (DataRow row in dt_appointments.Rows)
                {
                    appointments.Add(new RecordAppointment
                    {
                        linkId = SharedClass.Encrypt(row["id"].ToString()),
                        id = int.Parse(row["id"].ToString()),
                        appointment_schedule = row["appointment_schedule"].ToString(),
                        appointment_schedule_end = row["appointment_schedule_end"].ToString(),
                        status = row["status"].ToString(),
                        modality = row["modality"].ToString(),
                        created_at = row["created_at"].ToString(),
                        updated_at = row["updated_at"].ToString(),
                    });
                }

                // Convert the DataTable to a list of appointments
                List<RecordDrawing> drawings = new List<RecordDrawing>();
                foreach (DataRow row in dt_drawings.Rows)
                {
                    drawings.Add(new RecordDrawing
                    {
                        id = int.Parse(row["id"].ToString()),
                        drawingType = row["drawingType"].ToString(),
                        professional = row["professional"].ToString(),
                        status = row["status"].ToString(),
                        created_at = row["created_at"].ToString(),
                        updated_at = row["updated_at"].ToString(),
                    });
                }

                // Convert the DataTable to a list of appointments
                List<RecordReport> reports = new List<RecordReport>();
                foreach (DataRow row in dt_reports.Rows)
                {
                    reports.Add(new RecordReport
                    {
                        linkId = SharedClass.Encrypt(row["id"].ToString()),
                        id = int.Parse(row["id"].ToString()),
                        status = row["status"].ToString(),
                        created_at = row["created_at"].ToString(),
                        updated_at = row["updated_at"].ToString(),
                    });
                }


                return Ok(new
                {
                    appointments = appointments,
                    reports = reports,
                    drawings = drawings
                });
            }
            else
            {
                return BadRequest("Unauthorized User");
            }

        }

        [HttpPost("saveNewUser")]
        public IActionResult saveNewUser([FromForm] NewUserModel data)
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                // Check if the new email is already existing
                if (data.role == "student")
                {
                    var user = _context.Students.Where(e => e.UserId == data.userId).ToArray();
                    if (user.Length != 0)
                    {
                        return Ok(new
                        {
                            success = false,
                            mess = "User Id exist."
                        });
                    }
                }
                else if (data.role == "parent")
                {
                    var user = _context.Parents.Where(e => e.UserId == data.userId).ToArray();
                    if (user.Length != 0)
                    {
                        return Ok(new
                        {
                            success = false,
                            mess = "User Id exist."
                        });
                    }
                }
                else if (data.role == "professional")
                {
                    var user = _context.Professionals.Where(e => e.UserId == data.userId).ToArray();
                    if (user.Length != 0)
                    {
                        return Ok(new
                        {
                            success = false,
                            mess = "User Id exist."
                        });
                    }
                }
                else if (data.role == "admin")
                {
                    var user = _context.Admins.Where(e => e.UserId == data.userId).ToArray();
                    if (user.Length != 0)
                    {
                        return Ok(new
                        {
                            success = false,
                            mess = "User Id exist."
                        });
                    }
                }
                else
                {
                    return Ok(new
                    {
                        success = false,
                        mess = "User Id exist."
                    });
                }

                string createdBy = "";
                var query = _context.Professionals
                  .Where(p => p.Email == data.createdByEmail)
                  .Select(p => new { UserId = p.UserId })
                  .Union(_context.Admins
                             .Where(a => a.Email == data.createdByEmail)
                             .Select(a => new { UserId = a.UserId }));

                createdBy = query.FirstOrDefault()?.UserId;

                // Insert New User
                var parameter = new
                {
                    givenname = data.givenname,
                    familyname = data.familyname,
                    dob = data.dob,
                    sex = data.sex,
                    email = data.email,
                    username = data.userId,
                    role = data.role,
                    createdBy = createdBy,
                    position = data.position,
                    isEligible = (data.isEligible == "true") ? 1 : 0,
                };

                ////Executing multiple SPs
                string dt = SharedClass.Execute_Query("SaveNewUser", true, parameter);
                if (dt != "Succes")
                {
                    return Ok(new
                    {
                        success = false,
                        mess = "Query Failed"
                    });
                }

                // Generate relationship
                if (data.children == "" || data.children == null)
                {
                    //No specified children
                    return Ok(new
                    {
                        success = true
                    });
                }
                else
                {
                    //Specified Child/Children
                    string parent_userId = data.userId;
                    string relationship = (data.sex == "Male") ? "Father" : "Mother";

                    string[] arr_children = data.children.Split(",");
                    foreach (var child in arr_children)
                    {
                        string student_userId = _context.Students.Where(e => e.Email == child).Select(e => e.UserId).FirstOrDefault().ToString();

                        var studentContact = new StudentContact();

                        studentContact.StudentId = student_userId;
                        studentContact.ParentId = parent_userId;
                        studentContact.Relationship = relationship;
                        studentContact.UpdatedAt = DateTime.Now;
                        studentContact.UpdatedBy = createdBy;

                        _context.StudentContacts.Add(studentContact);
                        _context.SaveChanges();
                    }
                }
                return Ok(new
                {
                    success = true,
                });
            }
            else
            {
                return BadRequest("Unauthorized User");
            }

        }

        [HttpPost("saveNewAffiliates")]
        public IActionResult saveNewAffiliates([FromForm] NewAffiliatesModel data)
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                //Specified Affiliates
                var created_by_id = "";
                if (data.created_by_role == "Admin")
                {
                    created_by_id = _context.Admins.Where(e => e.Email == data.created_by).Select(e => e.UserId).FirstOrDefault().ToString();
                }
                else if (data.created_by_role == "Professional")
                {
                    created_by_id = _context.Professionals.Where(e => e.Email == data.created_by).Select(e => e.UserId).FirstOrDefault().ToString();
                }


                string[] arr_children = data.affiliates.Split(",");
                foreach (var child in arr_children)
                {
                    // Check if the new email is already existing
                    //Insert student's parent/guardian
                    string userId = "";
                    var newAffiliate = new StudentContact();

                    if (data.role == "Student")
                    {
                        userId = _context.Parents.Where(e => e.Email == child).Select(e => e.UserId).FirstOrDefault().ToString();
                        newAffiliate.StudentId = data.userId;
                        newAffiliate.ParentId = userId;
                        newAffiliate.Relationship = "Parents/Guadians";
                    }
                    else if (data.role == "Parent")
                    {
                        userId = _context.Students.Where(e => e.Email == child).Select(e => e.UserId).FirstOrDefault().ToString();
                        newAffiliate.StudentId = userId;
                        newAffiliate.ParentId = data.userId;
                        newAffiliate.Relationship = "Child";
                    }

                    newAffiliate.UpdatedAt = DateTime.Now;
                    newAffiliate.UpdatedBy = created_by_id;
                    _context.StudentContacts.Add(newAffiliate);
                    _context.SaveChanges();
                }
                return Ok();
            }
            else
            {
                return BadRequest("Unauthorized User");
            }

        }

        [HttpPost("removeAffiliates")]
        public IActionResult removeAffiliates([FromForm] NewAffiliatesModel data)
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                //Specified Affiliates
                var created_by_id = "";
                if (data.created_by_role == "Admin")
                {
                    created_by_id = _context.Admins.Where(e => e.Email == data.created_by).Select(e => e.UserId).FirstOrDefault().ToString();
                }
                else if (data.created_by_role == "Professional")
                {
                    created_by_id = _context.Professionals.Where(e => e.Email == data.created_by).Select(e => e.UserId).FirstOrDefault().ToString();
                }


                string[] arr_children = data.affiliates.Split(",");
                foreach (var child in arr_children)
                {
                    // Check if the new email is already existing
                    //Insert student's parent/guardian
                    string userId = "";
                    var entityToDelete = new StudentContact();

                    if (data.role == "Student")
                    {
                        userId = _context.Parents.Where(e => e.Email == child).Select(e => e.UserId).FirstOrDefault().ToString();
                        // Retrieve the entity you want to delete
                        entityToDelete = _context.StudentContacts
                                .SingleOrDefault(e => e.StudentId == data.userId && e.ParentId == userId);
                    }
                    else if (data.role == "Parent")
                    {
                        userId = _context.Students.Where(e => e.Email == child).Select(e => e.UserId).FirstOrDefault().ToString();
                        // Retrieve the entity you want to delete
                        entityToDelete = _context.StudentContacts
                                .SingleOrDefault(e => e.StudentId == userId && e.ParentId == data.userId);
                    }

                    if (entityToDelete != null)
                    {
                        // Remove the entity from the DbContext
                        _context.StudentContacts.Remove(entityToDelete);

                        // Save the changes to the database
                        _context.SaveChanges();
                    }
                }
                return Ok();
            }
            else
            {
                return BadRequest("Unauthorized User");
            }

        }


        public class UserIdentity
        {
            [Required]
            public string email { get; set; }

            [Required]
            public string? userId { get; set; }
        }

        public class UsersRecordList
        {
            [Required]
            public string id { get; set; }
            [Required]
            public string Email { get; set; }

            public string Name { get; set; }
            public string Sex { get; set; }
            public string Picture { get; set; }
            public string Role { get; set; }
            public string Status { get; set; }
        }

        public class RecordDrawing
        {
            [Required]
            public int id { get; set; }
            [Required]
            public string drawingType { get; set; }
            public string professional { get; set; }
            public string status { get; set; }
            public string created_at { get; set; }
            public string updated_at { get; set; }
        }

        public class RecordAppointment
        {
            [Required]
            public int id { get; set; }
            [Required]
            public string appointment_schedule { get; set; }
            [Required]
            public string appointment_schedule_end { get; set; }
            [Required]
            public string status { get; set; }
            [Required]
            public string modality { get; set; }
            public string created_at { get; set; }
            public string updated_at { get; set; }
            public string linkId { get; internal set; }
        }

        public class RecordReport
        {
            [Required]
            public int id { get; set; }
            [Required]
            public string status { get; set; }
            public string created_at { get; set; }
            public string updated_at { get; set; }
            public string linkId { get; internal set; }
        }

        public class AffiliateUsers
        {
            [Required]
            [EmailAddress]
            public string email { get; set; }
            [Required]
            public string givenname { get; set; }
            [Required]
            public string familyname { get; set; }
            [Required]
            public string picture { get; set; }
            [Required]
            public string role { get; set; }
        }

        public class NewUserModel
        {
            [Required]
            public string userId { get; set; }
            [Required]
            public string email { get; set; }
            [Required]
            public string givenname { get; set; }
            [Required]
            public string familyname { get; set; }
            [Required]
            public string dob { get; set; }
            [Required]
            public string sex { get; set; }
            [Required]
            public string role { get; set; }
            [Required]
            public string createdByEmail { get; set; }
            public string? children { get; set; }
            public string? position { get; set; }
            public string? isEligible { get; set; }
        }

        public class NewAffiliatesModel
        {
            public string userId { get; set; }
            public string role { get; set; }
            public string affiliates { get; set; }
            public string created_by { get; set; }
            public string created_by_role { get; set; }
        }
    }
}
