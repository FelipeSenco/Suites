using System.ComponentModel.DataAnnotations;


namespace Suites.Models
{
    public class Property
    {
        [Key]
        Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(255)]
        public string Address { get; set; }

        [MaxLength(50)]
        public int Rooms { get; set; }

        public virtual ICollection<Tenant> Tenants { get; set; }
    }
}
