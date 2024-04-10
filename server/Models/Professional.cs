using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Professional")]
[Index("Email", Name = "UQ__Professi__AB6E6164A8CCA377", IsUnique = true)]
public partial class Professional
{
    [Key]
    [Column("userId")]
    [StringLength(50)]
    public string UserId { get; set; } = null!;

    [Column("email")]
    [StringLength(50)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("givenname")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Givenname { get; set; }

    [Column("familyname")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Familyname { get; set; }

    [Column("dob", TypeName = "date")]
    public DateTime? Dob { get; set; }

    [Column("sex")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Sex { get; set; }

    [Column("picture")]
    public string? Picture { get; set; }

    [Column("position")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Position { get; set; }

    [Column("isEligible")]
    public int? IsEligible { get; set; }

    [Column("account_status_id")]
    public int AccountStatusId { get; set; }

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

    [ForeignKey("AccountStatusId")]
    [InverseProperty("Professionals")]
    public virtual AccountStatus AccountStatus { get; set; } = null!;

    [InverseProperty("ProfessionalUser")]
    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    [ForeignKey("CreatedBy")]
    [InverseProperty("ProfessionalCreatedByNavigations")]
    public virtual Admin CreatedByNavigation { get; set; } = null!;

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<Drawing> DrawingCreatedByNavigations { get; set; } = new List<Drawing>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<DrawingInterpretation> DrawingInterpretationCreatedByNavigations { get; set; } = new List<DrawingInterpretation>();

    [InverseProperty("ProfessionalUser")]
    public virtual ICollection<DrawingInterpretation> DrawingInterpretationProfessionalUsers { get; set; } = new List<DrawingInterpretation>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<DrawingInterpretation> DrawingInterpretationUpdatedByNavigations { get; set; } = new List<DrawingInterpretation>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<DrawingObjectQuestionnaireAnswer> DrawingObjectQuestionnaireAnswers { get; set; } = new List<DrawingObjectQuestionnaireAnswer>();

    [InverseProperty("CreatedByNavigation")]
    public virtual ICollection<DrawingObjectQuestionnaire> DrawingObjectQuestionnaireCreatedByNavigations { get; set; } = new List<DrawingObjectQuestionnaire>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<DrawingObjectQuestionnaire> DrawingObjectQuestionnaireUpdatedByNavigations { get; set; } = new List<DrawingObjectQuestionnaire>();

    [InverseProperty("UpdatedByNavigation")]
    public virtual ICollection<Drawing> DrawingUpdatedByNavigations { get; set; } = new List<Drawing>();

    [InverseProperty("User")]
    public virtual ICollection<ProfessionalActivityLog> ProfessionalActivityLogs { get; set; } = new List<ProfessionalActivityLog>();

    [InverseProperty("User")]
    public virtual ICollection<ProfessionalNotification> ProfessionalNotifications { get; set; } = new List<ProfessionalNotification>();

    [ForeignKey("UpdatedBy")]
    [InverseProperty("ProfessionalUpdatedByNavigations")]
    public virtual Admin UpdatedByNavigation { get; set; } = null!;
}
