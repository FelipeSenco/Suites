using Suites.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Tenant
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [Required]
    [MaxLength(100)]
    public string LastName { get; set; }

    [Required]
    [MaxLength(100)]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MaxLength(20)]
    public string CellPhone { get; set; }

    [Required]   
    public Guid PropertyId { get; set; }

    [Required]
    [MaxLength(50)]
    [MinLength(1)]
    public int RoomNumber { get; set; }

    [ForeignKey("PropertyId")]
    public virtual Property Property { get; set; }

    public virtual ICollection<Payment> Payments { get; set; }
}
