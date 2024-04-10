using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Student")]
[Index("Email", Name = "UQ__Student__AB6E6164D7C1285F", IsUnique = true)]
public partial class Student
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
    [InverseProperty("Students")]
    public virtual AccountStatus AccountStatus { get; set; } = null!;

    [InverseProperty("StudentUser")]
    public virtual ICollection<Drawing> Drawings { get; set; } = new List<Drawing>();

    [InverseProperty("User")]
    public virtual ICollection<StudentActivityLog> StudentActivityLogs { get; set; } = new List<StudentActivityLog>();

    [InverseProperty("Student")]
    public virtual ICollection<StudentContact> StudentContacts { get; set; } = new List<StudentContact>();

    [InverseProperty("User")]
    public virtual ICollection<StudentNotification> StudentNotifications { get; set; } = new List<StudentNotification>();
}
