using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("ReportCategory")]
public partial class ReportCategory
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("category")]
    [StringLength(100)]
    public string? Category { get; set; }

    [Column("created_by")]
    [StringLength(100)]
    public string? CreatedBy { get; set; }

    [Column("created_at", TypeName = "datetime")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_by")]
    [StringLength(100)]
    public string? UpdatedBy { get; set; }

    [Column("updated_at", TypeName = "datetime")]
    public DateTime? UpdatedAt { get; set; }
}
