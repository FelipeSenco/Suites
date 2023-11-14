using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Suites.Models
{
    public class Payment
    {
        [Key]   
        public Guid Id { get; set; }

        [Required]
        public Guid TenantId { get; set; }      

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        [Column(TypeName = "date")]
        public DateTime DateOfPayment { get; set; }

        [Required]
        public int ReferenceMonth { get; set; }

        [Required]
        [StringLength(5)]
        public string ReferenceYear { get; set; }

        public string? Receipt { get; set; }  // This will store the base64 encoded image

        [ForeignKey("TenantId")]
        public virtual Tenant Tenant { get; set; }

    }
}
