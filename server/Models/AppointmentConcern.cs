using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Appointment_Concern")]
public partial class AppointmentConcern
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("concern")]
    [StringLength(50)]
    [Unicode(false)]
    public string Concern { get; set; } = null!;

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

    [InverseProperty("Concern")]
    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    [ForeignKey("CreatedBy")]
    [InverseProperty("AppointmentConcernCreatedByNavigations")]
    public virtual Admin CreatedByNavigation { get; set; } = null!;

    [ForeignKey("UpdatedBy")]
    [InverseProperty("AppointmentConcernUpdatedByNavigations")]
    public virtual Admin UpdatedByNavigation { get; set; } = null!;
}
