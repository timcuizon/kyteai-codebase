using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SamWonAPI.Models;

[Keyless]
[Table("RecordKeeping")]
public partial class RecordKeeping
{
    [Column("id")]
    public int Id { get; set; }

    [Column("type")]
    [StringLength(50)]
    [Unicode(false)]
    public string Type { get; set; } = null!;

    [Column("record_id")]
    [StringLength(50)]
    [Unicode(false)]
    public string RecordId { get; set; } = null!;
}
