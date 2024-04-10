using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Professional_Notification")]
public partial class ProfessionalNotification
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("userId")]
    [StringLength(50)]
    public string UserId { get; set; } = null!;

    [Column("description")]
    [StringLength(250)]
    [Unicode(false)]
    public string Description { get; set; } = null!;

    [Column("notification_status_id")]
    public int NotificationStatusId { get; set; }

    [Column("created_at", TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }

    [Column("title")]
    [Unicode(false)]
    public string? Title { get; set; }

    [Column("link")]
    [Unicode(false)]
    public string? Link { get; set; }

    [ForeignKey("NotificationStatusId")]
    [InverseProperty("ProfessionalNotifications")]
    public virtual NotificationStatus NotificationStatus { get; set; } = null!;

    [ForeignKey("UserId")]
    [InverseProperty("ProfessionalNotifications")]
    public virtual Professional User { get; set; } = null!;
}
