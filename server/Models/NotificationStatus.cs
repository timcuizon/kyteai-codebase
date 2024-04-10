using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Notification_Status")]
public partial class NotificationStatus
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("status")]
    [StringLength(50)]
    [Unicode(false)]
    public string Status { get; set; } = null!;

    [Column("created_at", TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }

    [InverseProperty("NotificationStatus")]
    public virtual ICollection<ParentNotification> ParentNotifications { get; set; } = new List<ParentNotification>();

    [InverseProperty("NotificationStatus")]
    public virtual ICollection<ProfessionalNotification> ProfessionalNotifications { get; set; } = new List<ProfessionalNotification>();

    [InverseProperty("NotificationStatus")]
    public virtual ICollection<StudentNotification> StudentNotifications { get; set; } = new List<StudentNotification>();
}
