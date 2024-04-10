using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Admin")]
public partial class Admin
{
    [Key]
    [Column("userId")]
    [StringLength(50)]
    public string UserId { get; set; } = null!;

    [Column("email")]
    [StringLength(50)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("givenname")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Givenname { get; set; }

    [Column("familyname")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Familyname { get; set; }

    [Column("dob", TypeName = "date")]
    public DateTime? Dob { get; set; }

    [Column("sex")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Sex { get; set; }

    [Column("picture")]
    public string? Picture { get; set; }

    [Column("account_status_id")]
    public int AccountStatusId { get; set; }

    [Column("created_at", TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }

    [Column("created_by")]
    [StringLength(50)]
    public string CreatedBy { get; set; } = null!;

    [Column("updated_at", TypeName = "datetime")]
    public DateTime UpdatedAt { get; set; }

    [Column("updated_by")]
    [StringLength(50)]
    public string UpdatedBy { get; set; } = null!;

    [ForeignKey("AccountStatusId")]
    [InverseProperty("Admins")]
    public virtual AccountStatus AccountStatus { get; set; } = null!;

    [InverseProperty("User")]
    public virtual ICollection<AdminActivityLog> AdminActivityLogs { get; set; } = new List<AdminActivityLog>();

    [InverseProperty("User")]
    public virtual ICollection<AdminNotification> AdminNotifications { get; set; } = new List<AdminNotification>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<AppointmentConcern> AppointmentConcernCreatedByNavigations { get; set; } = new List<AppointmentConcern>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<AppointmentConcern> AppointmentConcernUpdatedByNavigations { get; set; } = new List<AppointmentConcern>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<AppointmentStatus> AppointmentStatusCreatedByNavigations { get; set; } = new List<AppointmentStatus>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<AppointmentStatus> AppointmentStatusUpdatedByNavigations { get; set; } = new List<AppointmentStatus>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<DrawingObject> DrawingObjectCreatedByNavigations { get; set; } = new List<DrawingObject>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<DrawingObject> DrawingObjectUpdatedByNavigations { get; set; } = new List<DrawingObject>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<DrawingStatus> DrawingStatusCreatedByNavigations { get; set; } = new List<DrawingStatus>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<DrawingStatus> DrawingStatusUpdatedByNavigations { get; set; } = new List<DrawingStatus>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Professional> ProfessionalCreatedByNavigations { get; set; } = new List<Professional>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<Professional> ProfessionalUpdatedByNavigations { get; set; } = new List<Professional>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<ReportStatus> ReportStatusCreatedByNavigations { get; set; } = new List<ReportStatus>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<ReportStatus> ReportStatusUpdatedByNavigations { get; set; } = new List<ReportStatus>();
}
