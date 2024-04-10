using SamWonAPI.Models;

namespace SamWonAPI.Services.EmailService
{
    public interface IEmailService
    {
        void SendEmail(SamWonEmailModel request);
    }
}
