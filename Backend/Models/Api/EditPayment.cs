using System.ComponentModel.DataAnnotations;

namespace Suites.Models.Api
{
    public class EditPayment
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid TenantId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public DateTime DateOfPayment { get; set; }

        [Required]
        public int ReferenceMonth { get; set; }

        [Required]
        [StringLength(5)]
        public string ReferenceYear { get; set; }

        public string Receipt { get; set; }
    }
}
