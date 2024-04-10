using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Student_Contact")]
public partial class StudentContact
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("student_id")]
    [StringLength(50)]
    public string StudentId { get; set; } = null!;

    [Column("parent_id")]
    [StringLength(50)]
    public string ParentId { get; set; } = null!;

    [Column("relationship")]
    [StringLength(250)]
    [Unicode(false)]
    public string Relationship { get; set; } = null!;

    [Column("updated_at", TypeName = "datetime")]
    public DateTime UpdatedAt { get; set; }

    [Column("updated_by")]
    [StringLength(50)]
    public string UpdatedBy { get; set; } = null!;

    [ForeignKey("ParentId")]
    [InverseProperty("StudentContacts")]
    public virtual Parent Parent { get; set; } = null!;

    [ForeignKey("StudentId")]
    [InverseProperty("StudentContacts")]
    public virtual Student Student { get; set; } = null!;
}
