using Microsoft.AspNetCore.Mvc;
using SamWonAPI.Data;
using SamWonAPI.Models;
using SamWonAPI.Services.EmailService;
using SamWonAPI.Services.Formats;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace SamWonAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class User_StudentParent_Space : ControllerBase
    {
        private readonly SamwonDbContext _context;
        //Interface
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly IEmailContent _emailContent;
        private readonly JwtValidationService _jwtValidationService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        string[] allowedRoles1;
        string[] allowedRoles2;

        public User_StudentParent_Space(SamwonDbContext context, JwtValidationService jwtValidationService, IEmailService emailService, IConfiguration configuration, IEmailContent emailContent, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _emailService = emailService;
            _configuration = configuration;
            _emailContent = emailContent;
            _jwtValidationService = jwtValidationService;
            _httpContextAccessor = httpContextAccessor;
            allowedRoles1 = ["Student", "Parent"];
            allowedRoles2 = ["Admin", "Professional"];
        }

        //Getting the drawing details for viewing
        [HttpPost("SaveReport")]
        public IActionResult SaveReport([FromForm] SaveReportModel data)
        {
            // Check if the model stasfies the conditions.


            var parameters = new
            {
                user_email = data.user_email,
                report_detail = data.report_detail,
                Type_of_Report = data.Type_of_Report,
                Type_of_Concern = data.Type_of_Concern,
                Contact_Person = data.Contact_Person,
                Relationship = data.Relationship,
                Email = data.Email,
                Role = data.Role,
                IsFeedbackChecked = data.IsFeedbackChecked
            };

            //Saving Report
            string dt = SharedClass.Execute_Query("SaveReport", true, parameters);

            if (dt == "Succes")
            {
                try
                {
                    // Get Last Inserted ID
                    string report = _context.Reports.OrderByDescending(e => e.Id).First().Id.ToString();
                    // Encrypt Inserted ID
                    report = SharedClass.Encrypt(report);
                    // Insert new notification with Encrypted ID in link
                    if (data.Role == "Student")
                    {
                        // Entity Framework
                        // To get the UserID using Email from Student Table
                        Student student = _context.Students.Where(e => e.Email == data.user_email).FirstOrDefault();
                        string userId = student.UserId.ToString();
                        // Object           // Variable           // New Object
                        StudentNotification studentNotification = new StudentNotification();
                        studentNotification.UserId = userId;
                        studentNotification.Description = "The guidance office received your report.";
                        studentNotification.NotificationStatusId = 3;
                        studentNotification.CreatedAt = DateTime.Now;
                        studentNotification.Title = "Report Submitted";
                        studentNotification.Link = "/user-student-parent-space/report-records-view?id=" + report;
                        SendEmailReport(data.user_email, report, "Student");
                        _context.StudentNotifications.Add(studentNotification);
                        _context.SaveChanges();
                    }
                    else if (data.Role == "Parent")
                    {
                        // Entity Framework
                        // To get the UserID using Email from Parent Table
                        Parent parent = _context.Parents.Where(e => e.Email == data.user_email).FirstOrDefault();
                        string userId = parent.UserId.ToString();
                        // Object           // Variable           // New Object
                        ParentNotification parentNotification = new ParentNotification();
                        parentNotification.UserId = userId;
                        parentNotification.Description = "The guidance office received your report.";
                        parentNotification.NotificationStatusId = 3;
                        parentNotification.CreatedAt = DateTime.Now;
                        parentNotification.Title = "Report Submitted";
                        parentNotification.Link = "/user-student-parent-space/report-records-view?id=" + report;
                        SendEmailReport(data.user_email, report, "Parent");
                        _context.ParentNotifications.Add(parentNotification);
                        _context.SaveChanges();
                    }
                    else if (data.Role == "Professional")
                    {
                        // Entity Framework
                        // To get the UserID using Email from Professional Table
                        Professional professional = _context.Professionals.Where(e => e.Email == data.user_email).FirstOrDefault();
                        string userId = professional.UserId.ToString();
                        // Object           // Variable           // New Object
                        ProfessionalNotification professionalNotification = new ProfessionalNotification();
                        professionalNotification.UserId = userId;
                        professionalNotification.Description = "The guidance office received your report.";
                        professionalNotification.NotificationStatusId = 3;
                        professionalNotification.CreatedAt = DateTime.Now;
                        professionalNotification.Title = "Report Submitted";
                        professionalNotification.Link = "/user-student-parent-space/report-records-view?id=" + report;
                        SendEmailReport(data.user_email, report, "Professional");
                        _context.ProfessionalNotifications.Add(professionalNotification);
                        _context.SaveChanges();
                    }
                    else if (data.Role == "Admin")
                    {
                        // Entity Framework
                        // To get the UserID using Email from Professional Table
                        Admin admin = _context.Admins.Where(e => e.Email == data.user_email).FirstOrDefault();
                        string userId = admin.UserId.ToString();
                        // Object           // Variable           // New Object
                        AdminNotification adminNotification = new AdminNotification();
                        adminNotification.UserId = userId;
                        adminNotification.Description = "The guidance office received your report.";
                        adminNotification.NotificationStatusId = 3;
                        adminNotification.CreatedAt = DateTime.Now;
                        adminNotification.Title = "Report Submitted";
                        adminNotification.Link = "/user-student-parent-space/report-records-view?id=" + report;
                        SendEmailReport(data.user_email, report, "Admin");
                        _context.AdminNotifications.Add(adminNotification);
                        _context.SaveChanges();
                    }


                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }


                return Ok(dt);
            }

            else
            {
                return BadRequest();
            }



        }

        //======================Get/Fetching==========================================
        //Getting Reports
        [HttpPost("GetReportDetails")]//Endpoint
        public IActionResult GetReportDetails([FromForm] GetReportRecordDetails data)
        {
            // Check if the model stasfies the conditions.
            try
            {
                var parameters = new
                {
                    id = SharedClass.Decrypt(data.id.ToString())
                };

                DataTable dt = SharedClass.GetTable("GetReportDetails", true, parameters);

                if (dt.Rows.Count > 0)
                {
                    List<GetReportRecordDetailsModel> getReportRecordDetailsModel = new List<GetReportRecordDetailsModel>();

                    foreach (DataRow row in dt.Rows)
                    {
                        getReportRecordDetailsModel.Add(new GetReportRecordDetailsModel()
                        {
                            student_name = row["student_name"].ToString(),
                            student_email = row["student_email"].ToString(),
                            student_dob = row["student_dob"].ToString(),
                            sex = row["sex"].ToString(),
                            picture = row["picture"].ToString(),
                            ReferenceNumber = row["ReferenceNumber"].ToString(),
                            report_detail = row["report_detail"].ToString(),
                            Type_of_Report = row["Type_of_Report"].ToString(),
                            Type_of_Concern = row["Type_of_Concern"].ToString(),
                            Contact_Person = row["Contact_Person"].ToString(),
                            Relationship = row["Relationship"].ToString(),
                            Email = row["Email"].ToString(),
                            isFeedbackChecked = row["isFeedbackChecked"].ToString()
                        });
                    }
                    return Ok(getReportRecordDetailsModel);
                    //return Ok(new
                    //{
                    //    success = true,
                    //    reports = getReportRecordDetailsModel
                    //});
                }
                else
                {
                    return Ok("No records found.");
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

        //================Get Report Records=====================
        [HttpPost("GetReportRecords")]
        public IActionResult GetReport([FromForm] GetReportRecordsModel data)
        {
            // Check if the model stasfies the conditions.

            try
            {
                var parameters = new
                {
                    Email = data.Email
                };

                DataTable dt = SharedClass.GetTable("GetReport", true, parameters);

                if (dt.Rows.Count > 0)
                {
                    List<GetReportRecordsData> getReportRecordsData = new List<GetReportRecordsData>();

                    foreach (DataRow row in dt.Rows)
                    {
                        DateTime created_at = (DateTime)row["created_at"];

                        getReportRecordsData.Add(new GetReportRecordsData()
                        {
                            created_at = created_at.ToString("MMMM dd, yyyy"),
                            id = SharedClass.Encrypt(row["id"].ToString())
                        });
                    }
                    return Ok(getReportRecordsData);
                }
                else
                {
                    return Ok("No records found.");
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


        //================Get All Report Records [Admin Module]=====================
        [HttpPost("GetAllReportRecords")]
        public IActionResult GetAllReportRecords()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles2, authorizationHeader))
            {
                DataTable dt = SharedClass.GetTable("GetReportAll", true);
                if (dt.Rows.Count > 0)
                {
                    // Convert the DataTable to a list of Students
                    List<ReportSummary> reports = new List<ReportSummary>();

                    foreach (DataRow row in dt.Rows)
                    {
                        string name = "";
                        string picture = "";
                        string userId = "";
                        if (row["role"].ToString() == "Student")
                        {
                            var temp_user = _context.Students.FirstOrDefault(e => e.Email == row["user_email"].ToString());
                            name = temp_user.Givenname + " " + temp_user.Familyname;
                            picture = temp_user.Picture;
                            userId = temp_user.UserId;
                        }
                        else if (row["role"].ToString() == "Parent")
                        {
                            var temp_user = _context.Parents.FirstOrDefault(e => e.Email == row["user_email"].ToString());
                            name = temp_user.Givenname + " " + temp_user.Familyname;
                            picture = temp_user.Picture;
                            userId = temp_user.UserId;
                        }

                        reports.Add(new ReportSummary
                        {
                            id = SharedClass.Encrypt(row["id"].ToString()),
                            user_id = userId,
                            name = name,
                            picture = picture,
                            user_email = row["user_email"].ToString(),
                            role = row["role"].ToString(),
                            status = row["status"].ToString(),
                            Type_of_Concern = row["Type_of_Concern"].ToString(),
                            Type_of_Report = row["Type_of_Report"].ToString(),
                            created_at = row["created_at"].ToString(),
                        });
                    }
                    return Ok(new
                    {
                        success = true,
                        users = reports
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

        //================Get All Report Categories and Concerns=====================
        [HttpGet("GetAllReportRecordsCatCon")]
        public IActionResult GetAllReportRecordsCatCon()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles1, authorizationHeader))
            {
                DataTable dt = SharedClass.GetTable("GetAllReportRecordsCatCon", true);
                if (dt.Rows.Count > 0)
                {
                    // Convert the DataTable to a list of Students
                    List<ReportCatConModel> catcon = new List<ReportCatConModel>();

                    foreach (DataRow row in dt.Rows)
                    {
                        catcon.Add(new ReportCatConModel
                        {
                            Category = row["Category"].ToString(),
                            Concern = row["Concern"].ToString()
                        });
                    }
                    return Ok(catcon);
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

        [HttpPost("GetRecordsCatCon")]
        public IActionResult GetRecordsCatCon()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles2, authorizationHeader))
            {
                DataTable dt = SharedClass.GetTable("GetCatCon", true);
                if (dt.Rows.Count > 0)
                {
                    // Convert the DataTable to a list
                    Dictionary<string, ReportCatModel> categoriesDict = new Dictionary<string, ReportCatModel>();
                    List<ReportConModel> concerns = new List<ReportConModel>();

                    foreach (DataRow row in dt.Rows)
                    {
                        var catId = row["catId"].ToString();
                        var category = row["category"].ToString();

                        if (!categoriesDict.ContainsKey(catId))
                        {
                            categoriesDict.Add(catId, new ReportCatModel
                            {
                                id = catId,
                                category = category,
                            });
                        }

                        concerns.Add(new ReportConModel
                        {
                            id = row["concernId"].ToString(),
                            catId = catId,
                            concern = row["concern"].ToString(),
                        });
                    }

                    return Ok(new
                    {
                        categories = categoriesDict.Values.ToList(),
                        concerns = concerns
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


        [HttpPost("UpdateRecordsCatCon")]
        public IActionResult UpdateRecordsCatCon([FromForm] UpdateReportCatConModel data)
        {
            // Check if the model stasfies the conditions.
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

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles2, authorizationHeader))
            {
                try
                {
                    string prof_userId = _context.Professionals.Where(e => e.Email == data.prof_userId).Select(e => e.UserId).FirstOrDefault().ToString();

                    //var parameters = new
                    //{
                    //    category_ids = data.category_ids.ToString(),
                    //    category_str = data.category_str.ToString(),
                    //    concern_ids = data.concern_ids.ToString(),
                    //    concern_categoryId_str = data.concern_categoryId_str.ToString(),
                    //    concern_str = data.concern_str.ToString(),
                    //    prof_userId = prof_userId.ToString(),
                    //};


                    //Query for saving the answers per questions
                    string query =
                        "DECLARE @category_ids NVARCHAR(MAX) = " + data.category_ids +
                        " DECLARE @category_str NVARCHAR(MAX) = " + data.category_str +
                        " DECLARE @concern_ids NVARCHAR(MAX) = " + data.concern_ids +
                        " DECLARE @concern_categoryId_str NVARCHAR(MAX) = " + data.concern_categoryId_str +
                        " DECLARE @concern_str NVARCHAR(MAX) = " + data.concern_str +
                        " DECLARE @prof_userId VARCHAR(MAX) = '" + prof_userId + "'" +
                        " EXEC [dbo].[UpdateRecordsCatCon] @category_ids, @category_str, @concern_ids, @concern_categoryId_str, @concern_str, @prof_userId;";
                    string res = SharedClass.Execute_Query(query, false);

                    //Saving all the results in the database
                    //string res = SharedClass.Execute_Query("UpdateRecordsCatCon", true, parameters);
                    if (res == "Succes")
                    {
                        return Ok(new
                        {
                            success = true
                        });
                    }
                    else
                    {
                        return Ok(new
                        {
                            success = false
                        });
                    }
                }
                catch (Exception ex)
                {
                    return Ok(new
                    {
                        success = false,
                        mess = ex.Message.ToString()
                    }); ;
                }
            }
            else
            {
                return BadRequest("Unauthorized User");
            }
        }

        // Function for sending email for Report Student
        private void SendEmailReport(string stud_email, string latestId, string userType)
        {
            // Send an email
            Student student = _context.Students.FirstOrDefault(e => e.Email == stud_email);

            SamWonEmailModel email = new SamWonEmailModel();
            email.To = stud_email;
            email.Subject = "Report (no-reply)";
            email.Body = _emailContent.UserReportSpace(
                _configuration.GetSection("clientURL").Value.ToString(),
                stud_email,
                SharedClass.Encrypt(latestId),
                userType);

            _emailService.SendEmail(email);
        }
    }
}

public class SaveReportModel()
{
    [Required]
    public string user_email { get; set; }

    public string? report_detail { get; set; }

    [Required]
    public string Type_of_Report { get; set; }

    [Required]
    public string Type_of_Concern { get; set; }

    [Required]
    public string Contact_Person { get; set; }

    [Required]
    public string Relationship { get; set; }

    public string? Email { get; set; }

    [Required]
    public string Role { get; set; }

    [Required]
    public string IsFeedbackChecked { get; set; }
}

public class GetReportRecordsModel
{
    public string Email { get; set; }
}

public class GetReportRecordsData
{
    public string created_at { get; set; }

    public string id { get; set; }
}

public class GetReportRecordDetails
{
    public string id { get; set; }
}

public class GetReportRecordDetailsModel
{
    public string student_name { get; set; }

    public string student_email { get; set; }

    public string student_dob { get; internal set; }
    public string picture { get; internal set; }

    public string sex { get; internal set; }

    public string ReferenceNumber { get; set; }

    public string report_detail { get; set; }

    public string Type_of_Report { get; set; }

    public string Type_of_Concern { get; set; }

    public string Contact_Person { get; set; }

    public string Relationship { get; set; }

    public string Email { get; set; }
    public string isFeedbackChecked { get; set; }
}

public class ReportSummary
{
    public string id { get; set; }
    public string user_id { get; set; }
    public string user_email { get; set; }
    public string name { get; set; }
    public string picture { get; set; }
    public string role { get; set; }
    public string status { get; set; }
    public string Type_of_Report { get; set; }
    public string Type_of_Concern { get; set; }
    public string created_at { get; set; }
}

public class ReportCatConModel
{
    public string Category { get; set; }
    public string Concern { get; set; }
}

public class ReportCatModel
{
    public string id { get; set; }
    public string category { get; set; }
}

public class ReportConModel
{
    public string id { get; set; }
    public string catId { get; set; }
    public string concern { get; set; }
}

public class UpdateReportCatConModel
{
    public string category_ids { get; set; }
    public string category_str { get; set; }
    public string concern_ids { get; set; }
    public string concern_categoryId_str { get; set; }
    public string concern_str { get; set; }
    public string prof_userId { get; set; }
}