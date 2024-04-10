using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("Admin_Activity_Logs")]
public partial class AdminActivityLog
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("userId")]
    [StringLength(50)]
    public string UserId { get; set; } = null!;

    [Column("activity")]
    [StringLength(250)]
    [Unicode(false)]
    public string Activity { get; set; } = null!;

    [Column("created_at", TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }

    [ForeignKey("UserId")]
    [InverseProperty("AdminActivityLogs")]
    public virtual Admin User { get; set; } = null!;
}
