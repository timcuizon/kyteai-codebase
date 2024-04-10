using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Appointment_Modality")]
public partial class AppointmentModality
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("modality")]
    [StringLength(50)]
    [Unicode(false)]
    public string Modality { get; set; } = null!;

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

    [InverseProperty("ModalityType")]
    public virtual ICollection<AppointmentSchedule> AppointmentSchedules { get; set; } = new List<AppointmentSchedule>();

    [ForeignKey("CreatedBy")]
    [InverseProperty("AppointmentModalityCreatedByNavigations")]
    public virtual Admin CreatedByNavigation { get; set; } = null!;

    [ForeignKey("UpdatedBy")]
    [InverseProperty("AppointmentModalityUpdatedByNavigations")]
    public virtual Admin UpdatedByNavigation { get; set; } = null!;
}
