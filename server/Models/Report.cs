using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Report")]
public partial class Report
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("user_email")]
    [Unicode(false)]
    public string UserEmail { get; set; } = null!;

    [Column("report_detail")]
    [Unicode(false)]
    public string? ReportDetail { get; set; }

    [Column("report_status_id")]
    public int ReportStatusId { get; set; }

    [Column("created_at", TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }

    [Column("created_by")]
    [Unicode(false)]
    public string CreatedBy { get; set; } = null!;

    [Column("updated_at", TypeName = "datetime")]
    public DateTime UpdatedAt { get; set; }

    [Column("updated_by")]
    [Unicode(false)]
    public string UpdatedBy { get; set; } = null!;

    [Column("Type_of_Report")]
    [StringLength(50)]
    [Unicode(false)]
    public string TypeOfReport { get; set; } = null!;

    [Column("Type_of_Concern")]
    [StringLength(50)]
    [Unicode(false)]
    public string TypeOfConcern { get; set; } = null!;

    [Column("Contact_Person")]
    [StringLength(50)]
    [Unicode(false)]
    public string ContactPerson { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string Relationship { get; set; } = null!;

    [StringLength(50)]
    [Unicode(false)]
    public string? Email { get; set; }

    [Column("isFeedbackChecked")]
    [StringLength(50)]
    public string? IsFeedbackChecked { get; set; }

    [ForeignKey("ReportStatusId")]
    [InverseProperty("Reports")]
    public virtual ReportStatus ReportStatus { get; set; } = null!;
}
