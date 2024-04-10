using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Drawing")]
public partial class Drawing
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("student_userId")]
    [StringLength(50)]
    public string StudentUserId { get; set; } = null!;

    [Column("drawing_object_id")]
    public int DrawingObjectId { get; set; }

    [Column("original_image_file")]
    public byte[]? OriginalImageFile { get; set; }

    [Column("detected_image_file")]
    public byte[]? DetectedImageFile { get; set; }

    [Column("gaborFiltered_image_file")]
    public byte[]? GaborFilteredImageFile { get; set; }

    [Column("measurements")]
    [Unicode(false)]
    public string? Measurements { get; set; }

    [Column("drawing_status_id")]
    public int DrawingStatusId { get; set; }

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

    [Column("detected_gaborFiltered_image_file")]
    public byte[]? DetectedGaborFilteredImageFile { get; set; }

    [Column("confidence_detection", TypeName = "decimal(11, 2)")]
    public decimal? ConfidenceDetection { get; set; }

    [Column("confidence_filteredDetection", TypeName = "decimal(11, 2)")]
    public decimal? ConfidenceFilteredDetection { get; set; }

    [ForeignKey("CreatedBy")]
    [InverseProperty("DrawingCreatedByNavigations")]
    public virtual Professional CreatedByNavigation { get; set; } = null!;

    [InverseProperty("Drawing")]
    public virtual ICollection<DrawingInterpretation> DrawingInterpretations { get; set; } = new List<DrawingInterpretation>();

    [ForeignKey("DrawingObjectId")]
    [InverseProperty("Drawings")]
    public virtual DrawingObject DrawingObject { get; set; } = null!;

    [InverseProperty("Drawing")]
    public virtual ICollection<DrawingObjectQuestionnaireAnswer> DrawingObjectQuestionnaireAnswers { get; set; } = new List<DrawingObjectQuestionnaireAnswer>();

    [ForeignKey("DrawingStatusId")]
    [InverseProperty("Drawings")]
    public virtual DrawingStatus DrawingStatus { get; set; } = null!;

    [ForeignKey("StudentUserId")]
    [InverseProperty("Drawings")]
    public virtual Student StudentUser { get; set; } = null!;

    [ForeignKey("UpdatedBy")]
    [InverseProperty("DrawingUpdatedByNavigations")]
    public virtual Professional UpdatedByNavigation { get; set; } = null!;
}
