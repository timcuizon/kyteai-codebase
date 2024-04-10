using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Appointment_Schedule")]
public partial class AppointmentSchedule
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("reference_number")]
    [StringLength(50)]
    [Unicode(false)]
    public string ReferenceNumber { get; set; } = null!;

    [Column("approved_by")]
    public int? ApprovedBy { get; set; }

    [Column("notes")]
    [Unicode(false)]
    public string? Notes { get; set; }

    [Column("givenName")]
    [StringLength(50)]
    [Unicode(false)]
    public string GivenName { get; set; } = null!;

    [Column("dob", TypeName = "date")]
    public DateTime Dob { get; set; }

    [Column("gender")]
    [StringLength(50)]
    [Unicode(false)]
    public string Gender { get; set; } = null!;

    [Column("email")]
    [StringLength(50)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("contact_number")]
    [StringLength(50)]
    [Unicode(false)]
    public string ContactNumber { get; set; } = null!;

    [Column("appointment_date", TypeName = "date")]
    public DateTime AppointmentDate { get; set; }

    [Column("appointment_time")]
    public TimeSpan AppointmentTime { get; set; }

    [Column("modality_type_id")]
    public int ModalityTypeId { get; set; }

    [Column("concern_type_id")]
    public int ConcernTypeId { get; set; }

    [Column("other_info")]
    [Unicode(false)]
    public string? OtherInfo { get; set; }

    [Column("appointment_status")]
    public int AppointmentStatus { get; set; }

    [Column("created_at", TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }

    [Column("created_by")]
    [StringLength(50)]
    public string CreatedBy { get; set; } = null!;

    [Column("created_by_email")]
    [StringLength(50)]
    [Unicode(false)]
    public string? CreatedByEmail { get; set; }

    [ForeignKey("AppointmentStatus")]
    [InverseProperty("AppointmentSchedules")]
    public virtual AppointmentStatus AppointmentStatusNavigation { get; set; } = null!;

    [ForeignKey("ModalityTypeId")]
    [InverseProperty("AppointmentSchedules")]
    public virtual AppointmentModality ModalityType { get; set; } = null!;
}
