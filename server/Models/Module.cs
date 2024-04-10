using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

public partial class Module
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("module")]
    [Unicode(false)]
    public string Module1 { get; set; } = null!;

    [Column("isActive")]
    public int IsActive { get; set; }

    [Column("created_by")]
    [StringLength(50)]
    public string CreatedBy { get; set; } = null!;

    [Column("created_at", TypeName = "datetime")]
    public DateTime CreatedAt { get; set; }

    [Column("roles")]
    public string? Roles { get; set; }

    [Column("modKey")]
    [Unicode(false)]
    public string? ModKey { get; set; }
}
