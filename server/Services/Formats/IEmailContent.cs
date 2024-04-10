using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using SamWonAPI.Models;

namespace SamWonAPI.Services.Formats
{
    public interface IEmailContent
    {
        string VSETAnalysisDone(string drawing_object, string stud_givenname, string stud_familyname, string clientUrl, string stud_email, string latestId);

        string AppointmentEmail(string status, string stud_fullnane, string clientUrl, string stud_email, string latestId, string ref_Number, string appointment_Date, string appointment_Time, string appointment_Message, string short_Message, string appointment_Modality, string note);

        string UserReportSpace(string clientUrl, string stud_email, string latestId, string userType);
    }
}
