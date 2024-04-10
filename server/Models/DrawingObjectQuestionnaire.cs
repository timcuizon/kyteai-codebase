using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Drawing_Object_Questionnaire")]
public partial class DrawingObjectQuestionnaire
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("drawing_object_id")]
    public int DrawingObjectId { get; set; }

    [Column("question")]
    [Unicode(false)]
    public string Question { get; set; } = null!;

    [Column("options")]
    [Unicode(false)]
    public string Options { get; set; } = null!;

    [Column("sequence")]
    public int Sequence { get; set; }

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
    [InverseProperty("DrawingObjectQuestionnaireCreatedByNavigations")]
    public virtual Professional CreatedByNavigation { get; set; } = null!;

    [ForeignKey("DrawingObjectId")]
    [InverseProperty("DrawingObjectQuestionnaires")]
    public virtual DrawingObject DrawingObject { get; set; } = null!;

    [InverseProperty("DrawingObjectQuestionnaire")]
    public virtual ICollection<DrawingObjectQuestionnaireAnswer> DrawingObjectQuestionnaireAnswers { get; set; } = new List<DrawingObjectQuestionnaireAnswer>();

    [ForeignKey("UpdatedBy")]
    [InverseProperty("DrawingObjectQuestionnaireUpdatedByNavigations")]
    public virtual Professional UpdatedByNavigation { get; set; } = null!;
}
