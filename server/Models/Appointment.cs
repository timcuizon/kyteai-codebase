using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Appointment")]
public partial class Appointment
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("professional_userId")]
    [StringLength(50)]
    public string? ProfessionalUserId { get; set; }

    [Column("client_id")]
    [Unicode(false)]
    public string ClientId { get; set; } = null!;

    [Column("client_affiliate")]
    [Unicode(false)]
    public string? ClientAffiliate { get; set; }

    [Column("appointment_schedule", TypeName = "datetime")]
    public DateTime AppointmentSchedule { get; set; }

    [Column("appointment_schedule_end", TypeName = "datetime")]
    public DateTime? AppointmentScheduleEnd { get; set; }

    [Column("professional_notes")]
    [StringLength(50)]
    [Unicode(false)]
    public string? ProfessionalNotes { get; set; }

    [Column("client_notes")]
    [Unicode(false)]
    public string? ClientNotes { get; set; }

    [Column("appointment_status_id")]
    public int AppointmentStatusId { get; set; }

    [Column("modality")]
    [StringLength(50)]
    [Unicode(false)]
    public string Modality { get; set; } = null!;

    [Column("concern_id")]
    public int ConcernId { get; set; }

    [Column("created_at", TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }

    [Column("created_by")]
    [Unicode(false)]
    public string CreatedBy { get; set; } = null!;

    [Column("updated_at", TypeName = "datetime")]
    public DateTime UpdatedAt { get; set; }

    [Column("updated_by")]
    [Unicode(false)]
    public string UpdatedBy { get; set; } = null!;

    [ForeignKey("AppointmentStatusId")]
    [InverseProperty("Appointments")]
    public virtual AppointmentStatus AppointmentStatus { get; set; } = null!;

    [ForeignKey("ConcernId")]
    [InverseProperty("Appointments")]
    public virtual AppointmentConcern Concern { get; set; } = null!;

    [ForeignKey("ProfessionalUserId")]
    [InverseProperty("Appointments")]
    public virtual Professional? ProfessionalUser { get; set; }
}
