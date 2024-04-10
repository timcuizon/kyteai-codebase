using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Keyless]
[Table("AppointmentInvolved")]
public partial class AppointmentInvolved
{
    [Column("id")]
    public int Id { get; set; }

    [Column("appointment_id")]
    public int? AppointmentId { get; set; }

    [Column("role")]
    [StringLength(100)]
    [Unicode(false)]
    public string? Role { get; set; }

    [Column("user_id")]
    [StringLength(50)]
    public string? UserId { get; set; }

    [Column("created_at", TypeName = "datetime")]
    public DateTime? CreatedAt { get; set; }

    [Column("created_by")]
    [StringLength(50)]
    public string? CreatedBy { get; set; }

    [Column("updated_at", TypeName = "datetime")]
    public DateTime? UpdatedAt { get; set; }

    [Column("updated_by")]
    [StringLength(50)]
    public string? UpdatedBy { get; set; }
}
