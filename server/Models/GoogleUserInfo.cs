using System.ComponentModel.DataAnnotations;

namespace SamWonAPI.Models
{
    public class GoogleUserInfo
    {
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string GivenName { get; set; }
        public string FamilyName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Role { get; set; }
        public string Picture { get; set; }
        public string Username { get; set; }
        public string DomainEmail { get; set; }
    }
}
