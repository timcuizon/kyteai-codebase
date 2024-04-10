using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Table("User_Login")]
public partial class UserLogin
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("email")]
    [StringLength(50)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    [Column("refresh_token")]
    [StringLength(250)]
    [Unicode(false)]
    public string RefreshToken { get; set; } = null!;

    [Column("refresh_token_expiration", TypeName = "datetime")]
    public DateTime RefreshTokenExpiration { get; set; }

    [Column("role")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Role { get; set; }

    [Column("last_login", TypeName = "datetime")]
    public DateTime? LastLogin { get; set; }
}
