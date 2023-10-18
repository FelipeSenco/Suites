
using System.ComponentModel.DataAnnotations;

public class Tenant
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(255)]
    public string Name { get; set; }

    [Required]
    [MaxLength(255)]
    public string LastName { get; set; }

    [Required]
    [MaxLength(255)]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MaxLength(20)]
    public string CellPhone { get; set; }
}
