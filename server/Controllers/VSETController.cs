using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Completions;
using SamWonAPI.Data;
using SamWonAPI.Models;
using SamWonAPI.Services.EmailService;
using SamWonAPI.Services.Formats;
using System.ComponentModel.DataAnnotations;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SamWonAPI.Controllers
{
    [Route("api/VSET")]
    [ApiController]
    public class VSETController : ControllerBase
    {
        private readonly SamwonDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly JwtValidationService _jwtValidationService;
        private readonly IEmailService _emailService;
        private readonly IEmailContent _emailContent;
        string[] allowedRoles;

        public VSETController(SamwonDbContext context, IConfiguration configuration, JwtValidationService jwtValidationService, IEmailService emailService, IEmailContent emailContent)
        {
            _context = context;
            _configuration = configuration;
            _jwtValidationService = jwtValidationService;
            _emailService = emailService;
            _emailContent = emailContent;
            allowedRoles = ["Admin", "Professional"];
        }

        //Getting all the records of the active students in the database
        [HttpPost]
        public IActionResult Get()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                //var students = _context.Students
                //        .Where(student => student.AccountStatusId == 1)
                //        .ToList();

                DataTable dt = SharedClass.GetTable("GetActiveStudentVSET", true);
                if (dt.Rows.Count > 0)
                {
                    // Convert the DataTable to a list of Students
                    List<Students> students = new List<Students>();

                    foreach (DataRow row in dt.Rows)
                    {
                        students.Add(new Students
                        {
                            givenname = row["givenname"].ToString(),
                            familyname = row["familyname"].ToString(),
                            email = row["email"].ToString(),
                            picture = row["picture"].ToString(),
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

        // Getting the VSET records of a certain user
        [HttpPost("Records")]
        public IActionResult fetchVSETRecords([FromForm] EmailRequestModel data)
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
                //Method to Check if user already exist
                var parameters = new
                {
                    email = data.Email,
                };
                DataTable dt = SharedClass.GetTable("GetVSETRecords", true, parameters);
                if (dt.Rows.Count > 0)
                {
                    // Convert the DataTable to a list of Students
                    List<VSETRecords> vsetRecords = new List<VSETRecords>();

                    foreach (DataRow row in dt.Rows)
                    {
                        vsetRecords.Add(new VSETRecords
                        {
                            id = row["id"].ToString(),
                            updated_at = ((DateTime)row["updated_at"]).ToString("MMM dd,yyyy HH:mm:ss"),
                            drawing_object = row["drawing_object"].ToString(),
                            professional = row["professional"].ToString(),
                            status = row["status"].ToString(),
                        });
                    }
                    return Ok(vsetRecords);
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

        // Getting the User Details
        [HttpPost("StudentDetails")]
        public IActionResult fetchStudentDetails([FromForm] EmailRequestModel data)
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
                //Method to Check if user already exist
                var parameters = new
                {
                    email = data.Email,
                };
                DataTable dt = SharedClass.GetTable("GetStudentDetailsVSET", true, parameters);
                if (dt.Rows.Count > 0)
                {
                    // Convert the DataTable to a list of Students
                    List<StudentDetails> vsetRecords = new List<StudentDetails>();

                    foreach (DataRow row in dt.Rows)
                    {
                        vsetRecords.Add(new StudentDetails
                        {
                            picture = row["picture"].ToString(),
                            name = row["name"].ToString(),
                            sex = row["sex"].ToString(),
                            dob = ((DateTime)row["dob"]).ToString("MMM dd,yyyy "),
                            age = row["age"].ToString(),
                            assessmentId = row["assessmentId"].ToString(),
                        });
                    }

                    //Checking if the professional is eligible to interpret
                    var isEligible = _context.Professionals
                            .Where(e => e.Email == data.Professional_Email)
                            .Select(e => e.IsEligible);


                    return Ok(new
                    {
                        vsetRecords = vsetRecords,
                        isEligible = isEligible
                    });
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

        // Saving the results of the model such as the original image, detected image, filtered image, detected filtered image, and the measurements
        //Fetching the object's questionnaires
        [HttpPost("SaveResults")]
        public async Task<IActionResult> SaveResults([FromForm] Results data)
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
                try
                {
                    var parameters = new
                    {
                        created_by = data.created_by,
                        stud_email = data.stud_email,
                        object_type = data.object_type,
                        original_image = data.original_image,
                        filtered_image = data.filtered_image,
                        detected_original_image = data.detected_original_image,
                        detected_filtered_image = data.detected_filtered_image,
                        confidence_detection = data.confidence_detection,
                        confidence_filteredDetection = data.confidence_filteredDetection,
                        measurements = data.measurements,
                    };

                    //Saving all the results in the database
                    string res = SharedClass.Execute_Query("SaveResultsVSET", true, parameters);
                    if (res == "Succes")
                    {
                        //Getting the latest ID
                        var latestId = _context.Drawings
                           .OrderByDescending(e => e.Id)
                           .Select(e => e.Id)
                           .FirstOrDefault();

                        // Call SendEmailVSETAnalysis
                        //SendEmailVSETAnalysis(data.stud_email, data.object_type, data.created_by, latestId.ToString());

                        //Getting all the object questionnaires
                        var drawingObjectQuestionnaires = _context.DrawingObjectQuestionnaires
                                .Where(e => e.DrawingObjectId == data.object_type)
                                .ToList();

                        var questionnaires = new Questionnaires
                        {
                            LatestId = latestId,
                            DrawingObjectQuestionnaires = drawingObjectQuestionnaires
                        };

                        return Ok(questionnaires);
                    }
                    else
                    {
                        return Ok(new
                        {
                            mess = res
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

        //Saving the answers from a questionnaires
        [HttpPost("SaveAnswers")]
        public IActionResult SaveAnswers([FromForm] Answers data)
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
                //Getting the professional user Id 
                var prof_id = _context.Professionals
                            .Where(e => e.Email == data.updated_by)
                            .FirstOrDefault();

                //Query for saving the answers per questions
                string query =
                    "DECLARE @drawing_id INT = " + data.drawing_id +
                    " DECLARE @drawing_object_questionnaire_ids NVARCHAR(MAX) = " + data.drawing_object_questionnaire_ids +
                    " DECLARE @answers NVARCHAR(MAX) = " + data.answers +
                    " DECLARE @updated_by VARCHAR(MAX) = '" + prof_id.UserId + "'" +
                    " EXEC [dbo].[SaveVSETAnswers] @drawing_id, @drawing_object_questionnaire_ids, @answers, @updated_by;";
                //Saving all the answers
                string res = SharedClass.Execute_Query(query, false);
                if (res == "Succes")
                {
                    //Query for saving the interpretation of an image
                    if (data.interpretation != null)
                    {
                        if ((data.interpretation.ToString() != "") && (data.interpretation.ToString() != "null"))
                        {
                            //if may value yung interpretation, execute query
                            var parameters = new
                            {
                                drawing_id = data.drawing_id,
                                interpretation = data.interpretation,
                                updated_by = prof_id.UserId
                            };

                            string res1 = SharedClass.Execute_Query("SaveVSETInterpretation", true, parameters);
                            if (res1 == "Succes")
                            {
                                return Ok(res);
                            }
                            else
                            {
                                return BadRequest();
                            }
                        }
                        else
                        {
                            //No Interpretation
                            return Ok(res);
                        }
                    }
                    else
                    {
                        //No Interpretation
                        return Ok(res);
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest("Unauthorized User");
            }

        }

        //Getting the drawing details for viewing
        [HttpPost("GetDrawingDetails")]
        public IActionResult GetDrawingDetails([FromForm] DrawingDetails data)
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

            List<Results> drawing_results = new List<Results>();
            List<GetAnswers> getAnswers = new List<GetAnswers>();
            int drawing_object_id;

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {
                //Method to Check if user already exist
                var parameters = new
                {
                    drawing_id = data.id,
                };

                //Fetching the drawing details
                DataTable dt = SharedClass.GetTable("GetVSETDrawingDetails", true, parameters);

                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow row in dt.Rows)
                    {
                        drawing_results.Add(new Results
                        {
                            id = data.id,
                            stud_email = row["email"].ToString(),
                            object_type = int.Parse(row["drawing_object_id"].ToString()),
                            original_image = (byte[])row["original_image_file"],
                            detected_original_image = (byte[])row["detected_image_file"],
                            filtered_image = (byte[])row["gaborFiltered_image_file"],
                            detected_filtered_image = (byte[])row["detected_gaborFiltered_image_file"],
                            measurements = row["measurements"].ToString(),
                            confidence_detection = Double.Parse(row["confidence_detection"].ToString()),
                            confidence_filteredDetection = Double.Parse(row["confidence_filteredDetection"].ToString()),
                            created_by = row["Professional"].ToString()
                        });
                    }
                }
                else
                {
                    return NoContent();
                }

                //Getting all the object questionnaires
                var drawingObjectQuestionnaires = _context.DrawingObjectQuestionnaires
                        .Where(e => e.DrawingObjectId == drawing_results[0].object_type)
                        .ToList();

                var questionnaires = new Questionnaires
                {
                    DrawingObjectQuestionnaires = drawingObjectQuestionnaires
                };

                //Fetching and answers
                DataTable dt1 = SharedClass.GetTable("GetVSETAnswers", true, parameters);

                if (dt1.Rows.Count > 0)
                {

                    foreach (DataRow row in dt1.Rows)
                    {
                        getAnswers.Add(new GetAnswers
                        {
                            id = int.Parse(row["id"].ToString()),
                            questionId = int.Parse(row["questionId"].ToString()),
                            answer = row["answer"].ToString(),
                            sequence = int.Parse(row["sequence"].ToString()),
                        });
                    }
                }
                else
                {
                    getAnswers = [];
                }

                // Fetching the interpretation
                var interpretation = _context.DrawingInterpretations
                    .FirstOrDefault(e => e.DrawingId == data.id);

                // Set interpretation to empty string if there is no result
                interpretation = interpretation ?? new DrawingInterpretation();

                return Ok(new
                {
                    Details = drawing_results,
                    Questions = drawingObjectQuestionnaires,
                    Answers = getAnswers,
                    Interpretation = interpretation.Interpretation
                });

            }
            else
            {
                return BadRequest("Unauthorized User");
            }
        }

        //Fetching all the information for VSET Report
        [HttpPost("GetVSETpdf")]
        public IActionResult GetVSETpdf([FromForm] DrawingDetails data)
        {
            //Convert the DataTable to a list of Results
            List<Results> drawing_results = new List<Results>();
            // Convert the DataTable to a list of Answers
            List<GetAnswers> getAnswers = new List<GetAnswers>();
            string stud_email = "";

            var parameters = new
            {
                drawing_id = data.id,
            };

            //Fetching the drawing details
            DataTable dt = SharedClass.GetTable("GetVSETDrawingDetails", true, parameters);
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow row in dt.Rows)
                {
                    stud_email = row["email"].ToString();
                    drawing_results.Add(new Results
                    {
                        id = data.id,
                        stud_email = row["email"].ToString(),
                        object_type = int.Parse(row["drawing_object_id"].ToString()),
                        original_image = (byte[])row["original_image_file"],
                        detected_original_image = (byte[])row["detected_image_file"],
                        filtered_image = (byte[])row["gaborFiltered_image_file"],
                        detected_filtered_image = (byte[])row["detected_gaborFiltered_image_file"],
                        measurements = row["measurements"].ToString(),
                        confidence_detection = Double.Parse(row["confidence_detection"].ToString()),
                        confidence_filteredDetection = Double.Parse(row["confidence_filteredDetection"].ToString()),
                        created_by = row["Professional"].ToString()
                    });
                }
            }

            //Fetching and answers
            DataTable dt1 = SharedClass.GetTable("GetVSETAnswers", true, parameters);

            if (dt1.Rows.Count > 0)
            {
                foreach (DataRow row in dt1.Rows)
                {
                    getAnswers.Add(new GetAnswers
                    {
                        id = int.Parse(row["id"].ToString()),
                        questionId = int.Parse(row["questionId"].ToString()),
                        question = row["question"].ToString(),
                        answer = row["answer"].ToString(),
                        sequence = int.Parse(row["sequence"].ToString()),
                    });
                }
            }

            //=== Formulate the GPT Prompt
            string prompt = "Generate a narrative summary using only simple terms about the following Q&A: ";
            var cnt = 1;
            foreach (GetAnswers answer in getAnswers)
            {
                prompt += cnt + ". " + answer.question + " - " + answer.answer + "  ";
                cnt++;
            }

            //=== Call ChatGPT API to summarize the questionnaire into narrative
            string APIKey = _configuration.GetSection("OpenAIKey").Value.ToString();
            string generated_answer = string.Empty;

            var openai = new OpenAIAPI(APIKey);
            CompletionRequest completion = new CompletionRequest();

            var result = openai.Chat.CreateChatCompletionAsync(new[]
                {
                    new ChatMessage
                    {
                        Role = ChatMessageRole.User,
                        TextContent = prompt
                    }
                });

            generated_answer = result.Result.ToString();

            //==Format the result
            /*
             * [ 
             *  "assessment_id": "123",
             *  "student_info":{
             *      name: "John Doe",
             *      email: "johndoe@gmail.com,
             *      dob: "May 10,1999"
             *  },
             *  "professional_info":{
             *      name: "John Doe",
             *      email: "johndoe@gmail.com,
             *  },
             *  "drawing_results": [],
             *  "other_drawing_info" : "LoremIpsum",
             *  "professional_feedback" : "LoremIpsum"
             * ] 
             */

            //Student Information
            var stud_info = _context.Students.Where(e => e.Email == stud_email)
                .Select(s => new
                {
                    name = s.Givenname + " " + s.Familyname,
                    s.Email,
                    dob = s.Dob.ToString()
                })
                .FirstOrDefault();

            // Fetching the interpretation
            var interpretation = _context.DrawingInterpretations
                .FirstOrDefault(e => e.DrawingId == data.id);

            // Set interpretation to empty string if there is no result
            interpretation = interpretation ?? new DrawingInterpretation();

            //professional Information
            var professional_info = _context.Professionals.Where(e => e.UserId == interpretation.ProfessionalUserId)
                .Select(s => new
                {
                    name = s.Givenname + " " + s.Familyname,
                    s.Email,
                })
                .FirstOrDefault();

            return Ok(new
            {
                assessment_id = data.id,
                student_info = stud_info,
                professional_info = professional_info,
                drawing_results = drawing_results,
                other_drawing_info = generated_answer,
                professional_feedback = interpretation.Interpretation,
            });
        }

        //Fetching all the object's questionnaires for editable questionnaires
        [HttpPost("GetObjectQuestionnaires")]
        public IActionResult GetObjectQuestionnaires()
        {
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (_jwtValidationService.ValidateJWTClaims(allowedRoles, authorizationHeader))
            {

                //Getting all the object questionnaires
                var drawingObjectQuestionnaires = _context.DrawingObjectQuestionnaires
                         .OrderBy(d => d.DrawingObjectId)
                         .ThenBy(d => d.Sequence)
                        .ToList();

                return Ok(new
                {
                    drawingObjectQuestionnaires
                }); ;

            }
            else
            {
                return BadRequest("Unauthorized User");
            }
        }

        //Fetching all the object's questionnaires for editable questionnaires
        [HttpPost("SaveObjectQuestionnaires")]
        public IActionResult SaveObjectQuestionnaires([FromForm] GetQuestions data)
        {
            //Check if the model stasfies the conditions.
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
                var professional = _context.Professionals.FirstOrDefault(e => e.Email == data.updated_by);
                string updatedBy = professional.UserId.ToString();


                //Query for saving the answers per questions
                string query =
                    "DECLARE @drawing_questionnaire_ids NVARCHAR(MAX) = " + data.id +
                    " DECLARE @drawing_object_questionnaire_ids NVARCHAR(MAX) = " + data.drawing_object_id +
                    " DECLARE @questions NVARCHAR(MAX) = " + data.question +
                    " DECLARE @options NVARCHAR(MAX) = " + data.options +
                    " DECLARE @sequence NVARCHAR(MAX) = " + data.sequence +
                    " DECLARE @updated_by VARCHAR(MAX) = '" + updatedBy + "'" +
                    " EXEC [dbo].[UpdateQuestionnaires] @drawing_questionnaire_ids, @drawing_object_questionnaire_ids, @questions, @options, @sequence, @updated_by;";
                string res = SharedClass.Execute_Query(query, false);

                return Ok(new
                {
                    success = true,
                    message = res,
                });

            }
            else
            {
                return BadRequest("Unauthorized User");
            }
        }

        //Deleting a specific question in the database
        [HttpPost("DeleteObjectQuestionnaires")]
        public IActionResult DeleteObjectQuestionnaires([FromForm] GetQuestions data)
        {
            //Check if the model stasfies the conditions.
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
                try
                {
                    var questionToDelete = _context.DrawingObjectQuestionnaires.FirstOrDefault(e => e.Id == int.Parse(data.id));
                    var question = questionToDelete.Question.ToString();

                    var user = _context.Professionals.FirstOrDefault(e => e.Email == data.updated_by);
                    var userId = user.UserId.ToString();

                    if (questionToDelete != null)
                    {
                        _context.DrawingObjectQuestionnaires.Remove(questionToDelete);
                        _context.SaveChanges();
                        //Add Notification
                        var parameters = new
                        {
                            userType = "Professional",
                            userId = userId,
                            title = "Question deleted.",
                            description = "The '" + question + "' has been deleted.",
                            link = "/pre-vset/questions",
                        };

                        //Saving new notification
                        string res = SharedClass.Execute_Query("SaveNotifications", true, parameters);
                        if (res == "Succes")
                        {
                            //Add Activity Logs
                            var parameters1 = new
                            {
                                userType = "Professional",
                                userId = userId,
                                activity = "The '" + question + "' has been deleted.",
                            };

                            //Saving new activity logs
                            string res1 = SharedClass.Execute_Query("SaveActivityLogs", true, parameters1);
                            if (res1 == "Succes")
                            {
                                //Add Activity Logs
                                return Ok(new
                                {
                                    success = true,
                                    //message = res,
                                });
                            }
                            else
                            {
                                return BadRequest();
                            }
                        }
                        else
                        {
                            return BadRequest();
                        }
                    }
                    else
                    {
                        return Ok(new
                        {
                            success = false,
                            message = "No record found",
                        });
                    }
                }
                catch (Exception e)
                {
                    return Ok(new
                    {
                        success = false,
                        message = "Error occured: " + e.Message.ToString(),
                    });
                }

            }
            else
            {
                return BadRequest("Unauthorized User");
            }
        }

        //Function for sending email for After VSET Analysis
        [HttpPost("SendEmailVSETAnalysis")]
        public IActionResult SendEmailVSETAnalysis([FromForm] SendEmailVSETAnalysisModel data)
        {
            try
            {
                //=== Send an email
                Student student = _context.Students.FirstOrDefault(e => e.Email == data.stud_email);
                string drawing_object = _context.DrawingObjects.FirstOrDefault(e => e.Id == data.object_type)?.DrawingObject1;

                SamWonEmailModel email = new SamWonEmailModel();
                email.To = data.created_by.ToString();
                email.Subject = "Available Drawing Analysis For " + student.Givenname + " " + student.Familyname;
                email.Body = _emailContent.VSETAnalysisDone(
                    drawing_object,
                    student.Givenname,
                    student.Familyname,
                    _configuration.GetSection("clientURL").Value.ToString(),
                    student.Email,
                    data.latestId);

                _emailService.SendEmail(email);

                return Ok(); // Return Ok if email is sent successfully
            }
            catch (Exception e)
            {
                return BadRequest(); // Return BadRequest if an exception occurs
            }
        }

        public class VSETReportModel
        {
            [Required]
            public int assesment_Id { get; set; }
            [Required]
            public string student_userId { get; set; }
            [Required]
            public string student_name { get; set; }
            [Required]
            public string student_email { get; set; }
            [Required]
            public string student_dob { get; set; }
            [Required]
            public string drawing_object_id { get; set; }
            [Required]
            public byte[] original_image_file { get; set; }
            [Required]
            public byte[] filtered_image { get; set; }
            [Required]
            public byte[] detected_original_image { get; set; }
            [Required]
            public byte[] detected_filtered_image { get; set; }
            [Required]
            public string measurements { get; set; }
            [Required]
            public Double confidence_detection { get; set; }
            [Required]
            public Double confidence_filteredDetection { get; set; }
            [Required]
            public string image_otherInformation { get; set; }
            [Required]
            public string image_interpretation { get; set; }
            [Required]
            public string professional_name { get; set; }
            [Required]
            public string professional_email { get; set; }
            [Required]
            public string professional_contactNumber { get; set; }
        }

        public class EmailRequestModel
        {
            [Required]
            public string Email { get; set; }
            public string? Professional_Email { get; set; }
        }
        public class Students
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

        }
        public class VSETRecords
        {
            [Required]
            public string id { get; set; }
            [Required]
            public string updated_at { get; set; }
            [Required]
            public string drawing_object { get; set; }
            [Required]
            public string professional { get; set; }
            [Required]
            public string status { get; set; }

        }
        public class StudentDetails
        {
            [Required]
            public string picture { get; set; }
            [Required]
            public string name { get; set; }
            [Required]
            public string sex { get; set; }
            [Required]
            public string dob { get; set; }
            [Required]
            public string age { get; set; }
            [Required]
            public string assessmentId { get; set; }

        }
        public class Results
        {
            public int? id { get; set; }

            [Required]
            [EmailAddress]
            public string stud_email { get; set; }
            [Required]
            public int object_type { get; set; }
            [Required]
            public byte[] original_image { get; set; }
            [Required]
            public byte[] filtered_image { get; set; }
            [Required]
            public byte[] detected_original_image { get; set; }
            [Required]
            public byte[] detected_filtered_image { get; set; }
            [Required]
            public string measurements { get; set; }
            [Required]
            public Double confidence_detection { get; set; }
            [Required]
            public Double confidence_filteredDetection { get; set; }
            [Required]
            public string created_by { get; set; }
        }
        public class Questionnaires
        {
            public int? LatestId { get; set; }
            public List<DrawingObjectQuestionnaire> DrawingObjectQuestionnaires { get; set; }
        }
        public class Answers
        {
            [Required]
            public int drawing_id { get; set; }
            [Required]
            public string drawing_object_questionnaire_ids { get; set; }
            [Required]
            public string answers { get; set; }
            public string? interpretation { get; set; }
            [Required]
            public string updated_by { get; set; }

        }
        public class GetAnswers
        {
            public int? id { get; set; }
            public int? questionId { get; set; }
            public string? question { get; set; }
            public string? answer { get; set; }
            public int? sequence { get; set; }
        }
        public class GetQuestions
        {
            public string id { get; set; }
            public string? drawing_object_id { get; set; }
            public string? question { get; set; }
            public string? options { get; set; }
            public string? sequence { get; set; }
            public string? updated_by { get; set; }
        }
        public class DrawingDetails
        {
            [Required]
            public int id { get; set; }
        }
        public class SendEmailVSETAnalysisModel
        {
            public string stud_email { get; set; }
            public int object_type { get; set; }
            public string created_by { get; set; }
            public string latestId { get; set; }
        }
    }
}
