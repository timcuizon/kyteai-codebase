using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using SamWonAPI.Models;

namespace SamWonAPI.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration configuration) 
        { 
            _config = configuration;
        }
        public void SendEmail(SamWonEmailModel request)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("Email:from").Value));
            email.To.Add(MailboxAddress.Parse(request.To));
            email.Subject = request.Subject;
            email.Body = new TextPart(TextFormat.Html) { Text = request.Body };

            using var smtp = new SmtpClient();
            smtp.Connect(_config.GetSection("Email:host").Value, int.Parse(_config.GetSection("Email:port").Value), SecureSocketOptions.StartTls);
            smtp.Authenticate(_config.GetSection("Email:username").Value, _config.GetSection("Email:password").Value);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
