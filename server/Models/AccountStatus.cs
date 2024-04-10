using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Account_Status")]
public partial class AccountStatus
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("status")]
    [StringLength(50)]
    [Unicode(false)]
    public string Status { get; set; } = null!;

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

    [InverseProperty("AccountStatus")]
    public virtual ICollection<Admin> Admins { get; set; } = new List<Admin>();

    [InverseProperty("AccountStatus")]
    public virtual ICollection<Parent> Parents { get; set; } = new List<Parent>();

    [InverseProperty("AccountStatus")]
    public virtual ICollection<Professional> Professionals { get; set; } = new List<Professional>();

    [InverseProperty("AccountStatus")]
    public virtual ICollection<Student> Students { get; set; } = new List<Student>();
}
