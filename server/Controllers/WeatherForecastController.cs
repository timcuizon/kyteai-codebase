using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SamWonAPI.Data;
using SamWonAPI.Models;
using SamWonAPI.Services.EmailService;
using SamWonAPI.Services.Formats;

namespace SamWonAPI.Controllers
{
    [ApiController]
    [Route("/api/WeatherForecast")]
    //do this when you want all of the api requires authorization
    //[Authorize]
    public class WeatherForecastController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IEmailService _emailService;
        private readonly IEmailContent _emailContent;
        private readonly IConfiguration _configuration;
        private readonly SamwonDbContext _context;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IEmailService emailService, SamwonDbContext samwonDbContext, IConfiguration configuration, IEmailContent emailContent)
        {
            _logger = logger;
            _emailService = emailService;
            _configuration = configuration;
            _context = samwonDbContext;
            _emailContent = emailContent;
        }

        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        //Use AllowAnonymous if you want to make this api accessible without authorization

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpPost("SendEmail")]
        public IActionResult SendEmail([FromForm] SamWonEmailModel data) {
            _emailService.SendEmail(data);
            return Ok();
        }

        [HttpPost("SendEmailFromFormats")]
        public IActionResult SendEmailFromFormats(string stud_email, int object_type, string created_by, string latestId)
        {
            SendEmailVSETAnalysis(stud_email, object_type, created_by, latestId.ToString());
            return Ok();
        }

        //Function for sending email for After VSET Analysis
        private async void SendEmailVSETAnalysis(string stud_email, int object_type, string created_by, string latestId)
        {
            //=== Send an email
            Student student = _context.Students.FirstOrDefault(e => e.Email == stud_email);
            string drawing_object = _context.DrawingObjects.FirstOrDefault(e => e.Id == object_type)?.DrawingObject1;

            SamWonEmailModel email = new SamWonEmailModel();
            email.To = created_by.ToString();
            email.Subject = "Available Drawing Analysis For " + student.Givenname + " " + student.Familyname;
            email.Body = _emailContent.VSETAnalysisDone(
                drawing_object,
            student.Givenname,
                student.Familyname,
                _configuration.GetSection("clientURL").Value.ToString(),
                student.Email,
                latestId);

            _emailService.SendEmail(email);
        }

        // Report Email Student
        [HttpPost("SendEmailReportFromFormatsStudent")]
        public IActionResult SendEmailReportFromFormatsStudent(string stud_email, string latestId, string created_by)
        {
            //Function
            SendEmailReportStudent(stud_email, latestId.ToString(), created_by);
            return Ok();
        }

         // Function for sending email for Report Student
        private void SendEmailReportStudent(string stud_email, string latestId, string created_by)
        {
            // Send an email
            Student student = _context.Students.FirstOrDefault(e => e.Email == stud_email);

            SamWonEmailModel email = new SamWonEmailModel();
            email.To = "kyteai.samwon@gmail.com";
            email.Subject = "Report (no-reply)";
            email.Body = _emailContent.UserReportSpace(
                _configuration.GetSection("clientURL").Value.ToString(),
                student.Email,
                SharedClass.Encrypt(latestId),
                "Student/Parent");

            _emailService.SendEmail(email);
        }

        // Report Email Parent
        [HttpPost("SendEmailReportFromFormatsParent")]
        public IActionResult SendEmailReportFromFormats(string stud_email, string latestId)
        {
            SendEmailReport(stud_email, latestId.ToString());
            return Ok();
        }

        // Function for sending email for Report Parent
        private void SendEmailReport(string stud_email, string latestId)
        {
            // Send an email
            Parent parent = _context.Parents.FirstOrDefault(e => e.Email == stud_email);

            SamWonEmailModel email = new SamWonEmailModel();
            email.To = "kyteai.samwon@gmail.com";
            email.Subject = "Report (no-reply)";
            email.Body = _emailContent.UserReportSpace(
                _configuration.GetSection("clientURL").Value.ToString(),
                parent.Email,
                SharedClass.Encrypt(latestId),
                "Student/Parent");

            _emailService.SendEmail(email);
        }
    }
}