using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Drawing_Status")]
public partial class DrawingStatus
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("status")]
    [StringLength(250)]
    [Unicode(false)]
    public string Status { get; set; } = null!;

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

    [ForeignKey("CreatedBy")]
    [InverseProperty("DrawingStatusCreatedByNavigations")]
    public virtual Admin CreatedByNavigation { get; set; } = null!;

    [InverseProperty("DrawingStatus")]
    public virtual ICollection<Drawing> Drawings { get; set; } = new List<Drawing>();

    [ForeignKey("UpdatedBy")]
    [InverseProperty("DrawingStatusUpdatedByNavigations")]
    public virtual Admin UpdatedByNavigation { get; set; } = null!;
}
