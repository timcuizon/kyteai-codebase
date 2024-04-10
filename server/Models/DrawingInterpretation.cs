using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Drawing_Interpretation")]
public partial class DrawingInterpretation
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("drawing_id")]
    public int DrawingId { get; set; }

    [Column("professional_userId")]
    [StringLength(50)]
    public string ProfessionalUserId { get; set; } = null!;

    [Column("interpretation")]
    [Unicode(false)]
    public string Interpretation { get; set; } = null!;

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
    [InverseProperty("DrawingInterpretationCreatedByNavigations")]
    public virtual Professional CreatedByNavigation { get; set; } = null!;

    [ForeignKey("DrawingId")]
    [InverseProperty("DrawingInterpretations")]
    public virtual Drawing Drawing { get; set; } = null!;

    [ForeignKey("ProfessionalUserId")]
    [InverseProperty("DrawingInterpretationProfessionalUsers")]
    public virtual Professional ProfessionalUser { get; set; } = null!;

    [ForeignKey("UpdatedBy")]
    [InverseProperty("DrawingInterpretationUpdatedByNavigations")]
    public virtual Professional UpdatedByNavigation { get; set; } = null!;
}
