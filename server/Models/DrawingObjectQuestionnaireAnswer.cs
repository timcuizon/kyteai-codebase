using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Drawing_Object_Questionnaire_Answer")]
public partial class DrawingObjectQuestionnaireAnswer
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("drawing_id")]
    public int DrawingId { get; set; }

    [Column("drawing_object_questionnaire_id")]
    public int DrawingObjectQuestionnaireId { get; set; }

    [Column("answer")]
    [Unicode(false)]
    public string Answer { get; set; } = null!;

    [Column("updated_at", TypeName = "datetime")]
    public DateTime UpdatedAt { get; set; }

    [Column("updated_by")]
    [StringLength(50)]
    public string UpdatedBy { get; set; } = null!;

    [ForeignKey("DrawingId")]
    [InverseProperty("DrawingObjectQuestionnaireAnswers")]
    public virtual Drawing Drawing { get; set; } = null!;

    [ForeignKey("DrawingObjectQuestionnaireId")]
    [InverseProperty("DrawingObjectQuestionnaireAnswers")]
    public virtual DrawingObjectQuestionnaire DrawingObjectQuestionnaire { get; set; } = null!;

    [ForeignKey("UpdatedBy")]
    [InverseProperty("DrawingObjectQuestionnaireAnswers")]
    public virtual Professional UpdatedByNavigation { get; set; } = null!;
}
