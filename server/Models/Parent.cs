using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Parent")]
[Index("Email", Name = "UQ__Parent__AB6E6164831FBBAB", IsUnique = true)]
public partial class Parent
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
    [InverseProperty("Parents")]
    public virtual AccountStatus AccountStatus { get; set; } = null!;

    [InverseProperty("User")]
    public virtual ICollection<ParentActivityLog> ParentActivityLogs { get; set; } = new List<ParentActivityLog>();

    [InverseProperty("User")]
    public virtual ICollection<ParentNotification> ParentNotifications { get; set; } = new List<ParentNotification>();

    [InverseProperty("Parent")]
    public virtual ICollection<StudentContact> StudentContacts { get; set; } = new List<StudentContact>();
}
