using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Drawing_Object")]
public partial class DrawingObject
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("drawing_object")]
    [StringLength(250)]
    [Unicode(false)]
    public string DrawingObject1 { get; set; } = null!;

    [Column("description")]
    [StringLength(250)]
    [Unicode(false)]
    public string Description { get; set; } = null!;

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
    [InverseProperty("DrawingObjectCreatedByNavigations")]
    public virtual Admin CreatedByNavigation { get; set; } = null!;

    [InverseProperty("DrawingObject")]
    public virtual ICollection<DrawingObjectQuestionnaire> DrawingObjectQuestionnaires { get; set; } = new List<DrawingObjectQuestionnaire>();

    [InverseProperty("DrawingObject")]
    public virtual ICollection<Drawing> Drawings { get; set; } = new List<Drawing>();

    [ForeignKey("UpdatedBy")]
    [InverseProperty("DrawingObjectUpdatedByNavigations")]
    public virtual Admin UpdatedByNavigation { get; set; } = null!;
}
