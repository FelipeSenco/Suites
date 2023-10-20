
using System.ComponentModel.DataAnnotations;

public class AddTenant
{
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
    [Range(1, 50)]
    public int RoomNumber { get; set; }
}
