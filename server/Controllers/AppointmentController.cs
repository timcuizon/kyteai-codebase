using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SamWonAPI.Data;
using SamWonAPI.Models;
using SamWonAPI.Services.EmailService;
using SamWonAPI.Services.Formats;
using System;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Globalization;

namespace SamWonAPI.Controllers
{

    [ApiController]
    [Route("api/Appointment")]
    public class AppointmentController : Controller
    {
        private readonly SamwonDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly JwtValidationService _jwtValidationService;
        private readonly IEmailService _emailService;
        private readonly IEmailContent _emailContent;
        string[] allowedRoles;

        public AppointmentController(SamwonDbContext context, IConfiguration configuration, JwtValidationService jwtValidationService, IEmailService emailService, IEmailContent emailContent)
        {
            _context = context;
            _configuration = configuration;
            _jwtValidationService = jwtValidationService;
            _emailService = emailService;
            _emailContent = emailContent;
            allowedRoles = ["Student", "Parent", "Professional"];
        }

        [HttpPost]
        public IActionResult Get()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                //var students = _context.Students
                //        .Where(student => student.AccountStatusId == 1)
                //        .ToList();

                DataTable dt = SharedClass.GetTable("GetAllStudentsParents", true);
                if (dt.Rows.Count > 0)
                {
                    // Convert the DataTable to a list of Students
                    List<Users> students = new List<Users>();

                    foreach (DataRow row in dt.Rows)
                    {
                        students.Add(new Users
                        {
                            givenname = row["givenname"].ToString(),
                            familyname = row["familyname"].ToString(),
                            email = row["email"].ToString(),
                            picture = row["picture"].ToString(),
                            role = row["role"].ToString()
                        });
                    }
                    return Ok(students);
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return BadRequest("Unauthorized User");
            }
        }

        //Get All Appointments
        [AllowAnonymous]
        [HttpGet("GetAppointment")]
        public IActionResult GetAppointments()
        {
            DataTable dt = SharedClass.GetTable("GetAppointments", true);

            if (dt.Rows.Count > 0)
            {

                List<AppointmentDetail> appointment = new List<AppointmentDetail>();

                foreach (DataRow row in dt.Rows)
                {
                    appointment.Add(new AppointmentDetail
                    {
                        id = SharedClass.Encrypt(row["id"].ToString()),
                        referenceNumber = "RF#" + row["id"].ToString().PadLeft(6, '0'),
                        role = row["role"].ToString(),
                        picture = row["client_picture"].ToString(),
                        name = row["client"].ToString(),
                        email = row["client_email"].ToString(),
                        schedule = row["appointment_schedule"].ToString(),
                        scheduleEnd = row["appointment_schedule_end"].ToString(),
                        status = row["status"].ToString()
                    });
                }

                return Ok(appointment);
            }
            else
            {
                return NoContent();
            }
        }

        // Get all of the user appointments
        [AllowAnonymous]
        [HttpPost("GetUserAppointment")]
        public IActionResult GetUserAppointment([FromForm] EmailModel data)
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

            // Check if the model stasfies the conditions.
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                var parameters = new
                {
                    email = data.email
                };

                DataTable dt = SharedClass.GetTable("GetUserAppointments", true, parameters);

                if (dt.Rows.Count > 0)
                {

                    List<UserAppointmentDetail> appointment = new List<UserAppointmentDetail>();

                    foreach (DataRow row in dt.Rows)
                    {
                        appointment.Add(new UserAppointmentDetail
                        {
                            id = SharedClass.Encrypt(row["reference_number"].ToString()),
                            referenceNumber = "RF#" + row["reference_number"].ToString().PadLeft(6, '0'),
                            schedule = row["appointment_schedule"].ToString(),
                            scheduleEnd = row["appointment_schedule_end"].ToString(),
                            status = row["status"].ToString(),
                            modality = row["modality"].ToString()
                        });
                    }

                    return Ok(appointment);
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

        // Get all of the user appointments
        [AllowAnonymous]
        [HttpPost("GetProfessionalAppointment")]
        public IActionResult GetProfessionalAppointment([FromForm] EmailModel data)
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

            // Check if the model stasfies the conditions.
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                var parameters = new
                {
                    email = data.email
                };

                DataTable dt = SharedClass.GetTable("GetProfessinalAppointment", true, parameters);

                if (dt.Rows.Count > 0)
                {

                    List<AppointmentDetail> appointment = new List<AppointmentDetail>();

                    foreach (DataRow row in dt.Rows)
                    {
                        appointment.Add(new AppointmentDetail
                        {
                            id = SharedClass.Encrypt(row["id"].ToString()),
                            referenceNumber = "RF#" + row["id"].ToString().PadLeft(6, '0'),
                            role = row["role"].ToString(),
                            picture = row["client_picture"].ToString(),
                            name = row["client"].ToString(),
                            email = row["client_email"].ToString(),
                            schedule = row["appointment_schedule"].ToString(),
                            scheduleEnd = row["appointment_schedule_end"].ToString(),
                            status = row["status"].ToString()
                        });
                    }

                    return Ok(appointment);
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

        // Get the appointment Details
        [AllowAnonymous]
        [HttpPost("GetAppointmentDetails")]
        public IActionResult GetAppointmentDetails([FromForm] referenceModel data)
        {
            try
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

                // Check if the model stasfies the conditions.
                var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

                if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
                {
                    var parameters = new
                    {
                        id = SharedClass.Decrypt(data.referenceNumber)
                    };

                    DataTable dt = SharedClass.GetTable("GetAppointmentDetails", true, parameters);

                    if (dt.Rows.Count > 0)
                    {

                        List<AppointmentDetailsModel> appointment = new List<AppointmentDetailsModel>();

                        foreach (DataRow row in dt.Rows)
                        {
                            var affiliateAvailable = row["affiliate_name"].ToString() != "";

                            appointment.Add(new AppointmentDetailsModel
                            {
                                id = SharedClass.Encrypt(row["reference_number"].ToString()),
                                referenceNumber = row["reference_number"].ToString().PadLeft(6, '0'),
                                professional_email = row["professional_assigned"].ToString(),
                                professional_name = row["professional_name"].ToString(),
                                role = row["role"].ToString(),
                                picture = row["client_picture"].ToString(),
                                name = row["client"].ToString(),
                                email = row["client_email"].ToString(),
                                isThereAnAffiliate = affiliateAvailable,
                                affiliatePicture = row["affiliate_picture"].ToString(),
                                affiliateName = row["affiliate_name"].ToString(),
                                affiliateEmail = row["affiliate_email"].ToString(),
                                affiliateSex = row["affiliate_sex"].ToString(),
                                affiliateDOB = row["affiliate_dob"].ToString(),
                                dob = row["client_dob"].ToString(),
                                sex = row["client_sex"].ToString(),
                                clientNotes = row["client_notes"].ToString(),
                                professionalNotes = row["professional_notes"].ToString(),
                                modality = row["modality"].ToString(),
                                concern = row["concern"].ToString(),
                                schedule = row["appointment_schedule"].ToString(),
                                scheduleEnd = row["appointment_schedule_end"].ToString(),
                                status = row["status"].ToString(),
                            });
                        }

                        return Ok(appointment);
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
            catch (Exception ex)
            {
                // Log the exception for debugging and monitoring purposes
                // This could be using a logging framework like Serilog, NLog, or simply writing to a file or database
                // Example: _logger.LogError(ex, "An error occurred in GetProfile method.");

                // Return an appropriate error response
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        // Submit the appointment form
        [AllowAnonymous]
        [HttpPost("AssignProfessional")]
        public IActionResult AssignProfessional([FromForm] updateProfessionalModela data)
        {
            try
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

                if (_jwtValidationService.ValidateJWTClaims(["Professional"], authorizationHeader))
                {
                    var parameters = new
                    {
                        prof_email = data.profEmail,
                        appointment_id = SharedClass.Decrypt(data.id),
                        email = data.email
                    };

                    string dt = SharedClass.Execute_Query("UpdateAssignedProfessional", true, parameters);

                    if (dt == "Succes")
                    {
                        return Ok(dt);
                    }
                    else
                    {
                        return StatusCode(400, "An unexpected error occurred. Please contact an admin.");
                    }
                }
                else
                {
                    return BadRequest("Unauthorized User");
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

        // Submit the appointment form
        [AllowAnonymous]
        [HttpPost("SubmitSchedule")]
        public IActionResult SubmitSchedule([FromForm] AppointmentForm data)
        {
            try
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

                if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
                {

                    var parameters = new
                    {
                        email = data.email,
                        affiliate_email = data.affiliateEmail,
                        professional_email = data.profEmail,
                        schedule = data.schedule,
                        schedule_end = data.scheduleEnd,
                        status = data.status,
                        notes = data.notes,
                        modality = data.modality,
                        concern = data.concern
                    };

                    DataTable dt = SharedClass.GetTable("SaveAppointmentForm", true, parameters);

                    if (dt.Rows.Count > 0)
                    {
                        var refNum = "RF#" + dt.Rows[0]["reference_number"].ToString().PadLeft(6, '0');

                        string link = "/appointment-counseling/appointment-summary?id=" + SharedClass.Encrypt(dt.Rows[0]["reference_number"].ToString()); ;

                        var notifParam = new
                        {
                            userType = dt.Rows[0]["role"].ToString(),
                            userId = dt.Rows[0]["userId"].ToString(),
                            title = "Appointment Submitted",
                            link = link,
                            description = "Your appointment is now pending and is being reviewed"
                        };

                        var logParam = new
                        {
                            userType = dt.Rows[0]["role"].ToString(),
                            userId = dt.Rows[0]["userId"].ToString(),
                            activity = "You have scheduled an appointment with a reference number of \"" + refNum + "\"",
                        };

                        String dtSaveNotif = SharedClass.Execute_Query("SaveNotifications", true, notifParam);
                        String dtSaveLog = SharedClass.Execute_Query("SaveActivityLogs", true, logParam);

                        String subject = "Successfully submitted an appointment request (no-reply)";

                        String shortMsg = "Successfully submitted an appointment request";

                        String msg = "You have successfully submitted an appointment request";

                        String note = "Please note that this appointment is pending and you will receive another email if the counselor has confirmed your schedule.";

                        if (data.profEmail != "")
                        {
                            subject = "An appointment has been scheduled for you (no-reply)";
                            shortMsg = "An appointment has been scheduled for you";
                            msg = "A professional has scheduled an appointment for you";
                            note = "";
                        }

                        Boolean sendAppEmail = SendAppointmentEmailModel(
                                data.email,
                                subject,
                                data.schedule,
                                data.scheduleEnd,
                                dt.Rows[0]["status"].ToString(),
                                dt.Rows[0]["modality"].ToString(),
                                dt.Rows[0]["fullname"].ToString(),
                                dt.Rows[0]["reference_number"].ToString(),
                                shortMsg,
                                msg,
                                note
                            );
                        if (sendAppEmail)
                        {
                            return Ok(refNum);
                        }
                        else
                        {
                            return BadRequest();
                        }
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
            catch (Exception ex)
            {
                // Log the exception for debugging and monitoring purposes
                // This could be using a logging framework like Serilog, NLog, or simply writing to a file or database
                // Example: _logger.LogError(ex, "An error occurred in GetProfile method.");

                // Return an appropriate error response
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }

        }

        // Update the appointment Status
        [AllowAnonymous]
        [HttpPost("UpdateAppointmentStatus")]
        public IActionResult UpdateAppointmentStatus([FromForm] UpdateStatusModel data)
        {
            try
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

                if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
                {
                    var parameters = new
                    {
                        id = SharedClass.Decrypt(data.referenceNumber),
                        status = data.status_id
                    };

                    DataTable dt = SharedClass.GetTable("UpdateAppointmentStatus", true, parameters);

                    if (dt.Rows.Count > 0)
                    {
                        List<referenceModel> list = new List<referenceModel>();

                        foreach (DataRow row in dt.Rows)
                        {
                            list.Add(new referenceModel
                            {
                                referenceNumber = SharedClass.Encrypt(row["result"].ToString())
                            });
                        }

                        if (data.status_id == "2")
                        {

                            var refNum = "RF#" + dt.Rows[0]["result"].ToString().PadLeft(6, '0');

                            String subject = "Your appointment have been approved (no-reply)";

                            String shortMsg = "Your appointment have been approved";

                            String msg = "Your appointment have now been approved";

                            String note = "";

                            var createdAt = DateTime.ParseExact(dt.Rows[0]["created_at"].ToString(), "dd/MM/yyyy h:mm:ss tt", CultureInfo.InvariantCulture).ToString("MMMM dd, yyyy");

                            Boolean sendAppEmail = SendAppointmentEmailModel(
                                    dt.Rows[0]["email"].ToString(),
                                    subject,
                                    DateTime.ParseExact(dt.Rows[0]["appointment_schedule"].ToString(), "dd/MM/yyyy h:mm:ss tt", CultureInfo.InvariantCulture).ToString("yyyy-MM-dd HH:mm"),
                                    DateTime.ParseExact(dt.Rows[0]["appointment_schedule_end"].ToString(), "dd/MM/yyyy h:mm:ss tt", CultureInfo.InvariantCulture).ToString("yyyy-MM-dd HH:mm"),
                                    dt.Rows[0]["status"].ToString(),
                                    dt.Rows[0]["modality"].ToString(),
                                    dt.Rows[0]["fullname"].ToString(),
                                    dt.Rows[0]["result"].ToString(),
                                    shortMsg,
                                    msg,
                                    note
                                );
                        }

                        return Ok(list);
                    }
                    else return NoContent();
                }
                else
                {
                    return BadRequest("Unauthorized User");
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


        // Update the appointment Schedule
        [AllowAnonymous]
        [HttpPost("UpdateAppointmentSchedule")]
        public IActionResult UpdateAppointmentSchedule([FromForm] UpdateScheduleModel data)
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

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                var parameters = new
                {
                    refNum = data.referenceNumber,
                    newSchedule = data.newSched,
                    newEndSchedule = data.newSchedEnd
                };

                DataTable dt = SharedClass.GetTable("UpdateScheduleAppointment", true, parameters);

                if (dt.Rows.Count > 0)
                {
                    List<referenceModel> list = new List<referenceModel>();

                    string link = "/appointment-counseling/appointment-summary?id=" + SharedClass.Encrypt(dt.Rows[0]["result"].ToString()); ;

                    var refNum = "RF#" + dt.Rows[0]["result"].ToString().PadLeft(6, '0');

                    foreach (DataRow row in dt.Rows)
                    {
                        list.Add(new referenceModel
                        {
                            referenceNumber = SharedClass.Encrypt(row["result"].ToString())
                        });
                    }

                    var notifParam = new
                    {
                        userType = dt.Rows[0]["role"].ToString(),
                        userId = dt.Rows[0]["userId"].ToString(),
                        title = "Appointment Rescheduled",
                        link = link,
                        description = "Your appointment have been rescheduled is now pending and is being reviewed"
                    };

                    var logParam = new
                    {
                        userType = dt.Rows[0]["role"].ToString(),
                        userId = dt.Rows[0]["userId"].ToString(),
                        activity = "You have rescheduled an appointment with the reference number of \"" + refNum + "\"",
                    };

                    foreach (DataRow row in dt.Rows)
                    {
                        list.Add(new referenceModel
                        {
                            referenceNumber = SharedClass.Encrypt(row["result"].ToString())
                        });
                    }

                    // Barcos

                    String subject = "Successfully rescheduled an appointment (no-reply)";

                    String shortMsg = "Successfully rescheduled an appointment";

                    String msg = "You have successfully rescheduled the appointment with the reference number of " + refNum;

                    String note = "Please note that if there is a conflict regarding your schedule, the counselor can reschedule your appointment.";

                    Boolean sendAppEmail = SendAppointmentEmailModel(
                            dt.Rows[0]["email"].ToString(),
                            subject,
                            data.newSched,
                            data.newSchedEnd,
                            dt.Rows[0]["status"].ToString(),
                            dt.Rows[0]["modality"].ToString(),
                            dt.Rows[0]["fullname"].ToString(),
                            dt.Rows[0]["result"].ToString(),
                            shortMsg,
                            msg,
                            note
                        );

                    String dtSaveNotif = SharedClass.Execute_Query("SaveNotifications", true, notifParam);
                    String dtSaveLog = SharedClass.Execute_Query("SaveActivityLogs", true, logParam);

                    if (sendAppEmail)
                    {
                        return Ok(list);
                    }
                    else
                    {
                        return BadRequest();
                    }
                }

                else return NoContent();
            }
            else
            {
                return BadRequest("Unauthorized User");
            }

        }


        [AllowAnonymous]
        [HttpPost("GetStudentContact")]
        public IActionResult GetStudentContact([FromForm] EmailModel data)
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

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                var parameters = new
                {
                    email = data.email,
                };

                DataTable dt = SharedClass.GetTable("GetStudentContact", true, parameters);

                if (dt.Rows.Count > 0)
                {
                    List<AffiliateModel> list = new List<AffiliateModel>();

                    foreach (DataRow row in dt.Rows)
                    {
                        list.Add(new AffiliateModel
                        {
                            picture = row["picture"].ToString(),
                            studentName = row["student_name"].ToString(),
                            email = row["email"].ToString()

                        });
                    }

                    return Ok(list);
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

        private Boolean SendAppointmentEmailModel(String emailTo, String subject, String dateSched, String dateSchedEnd, String status, String modality, String name, String refNum, String appointmentShortMsg, String appointmentMsg, String note)
        {
            try
            {
                var date = DateTime.ParseExact(dateSched, "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture).ToString("dddd, MMMM dd, yyyy");

                var startTime = DateTime.ParseExact(dateSched, "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture).ToString("hh:mm tt");
                var endTime = DateTime.ParseExact(dateSchedEnd, "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture).ToString("hh:mm tt");

                //=== Send an email
                //Student student = _context.Students.FirstOrDefault(e => e.Email == data.email);

                var refNumTxt = "RF#" + refNum.PadLeft(6, '0');

                SamWonEmailModel email = new SamWonEmailModel();
                email.To = emailTo;
                email.Subject = subject;
                email.Body = _emailContent.AppointmentEmail(
                        status,
                        name,
                        _configuration.GetSection("clientURL").Value.ToString(),
                        emailTo,
                        SharedClass.Encrypt(refNum),
                        refNumTxt,
                        date,
                        startTime + "-" + endTime,
                        appointmentMsg,
                        appointmentShortMsg,
                        modality,
                        note
                    );

                _emailService.SendEmail(email);

                return true; // Return Ok if email is sent successfully
            }
            catch (Exception e)
            {
                return false; // Return BadRequest if an exception occurs
            }
        }


        [HttpGet("GetProfessionals")]
        public IActionResult GetProfessionals()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {

                DataTable dt = SharedClass.GetTable("GetProfessionals", true);

                if (dt.Rows.Count > 0)
                {
                    List<ProfessionalModel> list = new List<ProfessionalModel>();

                    foreach (DataRow row in dt.Rows)
                    {
                        list.Add(new ProfessionalModel
                        {
                            email = row["email"].ToString(),
                            name = row["givenname"].ToString() + " " + row["familyname"].ToString(),
                            sex = row["sex"].ToString(),
                            picture = row["picture"].ToString(),
                            position = row["position"].ToString()
                        });
                    }

                    return Ok(list);
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

        // Save all the Person Involved
        [HttpPost("SubmitPersonInvolved")]
        public IActionResult SubmitPersonInvolved([FromForm] PersonInvolvedModel data)
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

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                var parameters = new
                {
                    appointment_id = data.appointmentId,
                    role = data.role,
                    user_email = data.userEmail,
                    prof_email = data.profEmail,
                };

                string dt = SharedClass.Execute_Query("SavePersonInvolved", true, parameters);

                return Ok(dt);
            }
            else
            {
                return BadRequest("Unauthorized User");
            }
        }


        // Save all the Person Involved
        [HttpPost("GetPersonInvolved")]
        public IActionResult GetPersonInvolved([FromForm] referenceModel data)
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

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                var parameters = new
                {
                    appointment_id = SharedClass.Decrypt(data.referenceNumber)
                };

                DataTable dt = SharedClass.GetTable("GetAppointmentInvolved", true, parameters);


                if(dt.Rows.Count > 0)
                {
                    List<PersonInvolvedShowModel> list = new List<PersonInvolvedShowModel>();

                    foreach (DataRow row in dt.Rows)
                    {
                        list.Add(new PersonInvolvedShowModel
                        {
                            name = row["name"].ToString(),
                            role = row["role"].ToString(),
                            picture = row["picture"].ToString(),
                            email = row["email"].ToString(),
                        });
                    }

                    return Ok(list);
                } else
                {
                    return NoContent();
                }
            }
            else
            {
                return BadRequest("Unauthorized User");
            }
        }
    }

    internal class PersonInvolvedShowModel
    {
        public string? name { get; internal set; }
        public string? role { get; internal set; }
        public string? picture { get; internal set; }
        public string? email { get; internal set; }
    }
}

//[HttpPost("GetStatusData")]
// public IActionResult StatusData([FromForm] StatusModel data)
//  {


//      return Ok();
//  }


public class PersonInvolvedModel
{
    public string userEmail { get; set; }
    public string profEmail { get; set; }
    public string role { get; set; }
    public string appointmentId { get; set; }
}

internal class Users
{
    public string? givenname { get; internal set; }
    public string? familyname { get; internal set; }
    public string? email { get; internal set; }
    public string? picture { get; internal set; }
    public string? role { get; internal set; }
}

public class updateProfessionalModela
{
    public string profEmail { get; set; }
    public string id { get; set; }
    public string email { get; set; }
}
public class referenceModel
{
    public string referenceNumber { get; set; }
}

public class EmailModel
{
    public string email { get; set; }
}
public class UpdateStatusModel
{
    [Required]
    public string referenceNumber { get; set; }
    [Required]
    public string status_id { get; set; }
}

public class AffiliateModel
{
    public string studentName { get; set; }
    public string email { get; set; }
    public string? picture { get; internal set; }
}

public class UpdateScheduleModel
{
    [Required]
    public string referenceNumber { get; set; }
    [Required]
    public string newSched { get; set; }
    [Required]
    public string newSchedEnd { get; set; }
}

public class GivenNameTestModel
{
    public string TestGivenName { get; set; }
}

public class AvailabiltiyModel
{
    [Required]
    public string date { get; set; }
}

public class UserAppointmentDetail
{
    public string id { get; set; }
    public string referenceNumber { get; set; }
    public string schedule { get; set; }
    public string scheduleEnd { get; set; }
    public string status { get; set; }
    public string modality { get; set; }
}

public class AppointmentDetailsModel
{
    public string referenceNumber { get; set; }
    public string role { get; set; }
    public string name { get; set; }
    public string email { get; set; }
    public string clientNotes { get; set; }
    public string professionalNotes { get; set; }
    public string schedule { get; set; }
    public string scheduleEnd { get; set; }
    public string modality { get; set; }
    public string concern { get; set; }
    public string status { get; set; }
    public string picture { get; set; }
    public string? dob { get; internal set; }
    public string? sex { get; internal set; }
    public bool isThereAnAffiliate {  get; set; }
    public string? affiliateName { get; internal set; }
    public string? affiliateEmail { get; internal set; }
    public string? affiliatePicture { get; internal set; }
    public string? affiliateSex { get; internal set; }
    public string? affiliateDOB { get; internal set; }
    public string id { get; internal set; }
    public string? professional_email { get; internal set; }
    public string? professional_name { get; internal set; }
}

public class ProfessionalModel
{
    public string email { get; set; }
    public string name { get; set; }
    public string sex { get; set; }
    public string picture { get; set; }
    public string position { get; set; }
}

public class AppointmentDetail
{
    public string referenceNumber { get; set; }
    public string picture { get; set; }
    public string id { get; set; }
    public string role { get; set; }
    public string name { get; set; }
    public string email { get; set; }
    public string schedule { get; set; }
    public string scheduleEnd { get; set; }
    public string status { get; set; }
}
public class AppointmentForm
{
    [Required]
    public String email { get; set; }
    public String affiliateEmail { get; set; }
    public String profEmail { get; set; }

    [Required]
    public String schedule { get; set; }
    [Required]
    public String scheduleEnd { get; set; }

    [Required]
    public String status { get; set; }

    public String? notes { get; set; }

    [Required]
    public String modality { get; set; }

    [Required]
    public String concern { get; set; }
}
