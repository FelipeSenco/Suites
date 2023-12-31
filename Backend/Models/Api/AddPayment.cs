﻿using System.ComponentModel.DataAnnotations;

namespace Suites.Models.Api
{
    public class AddPayment
    {
        [Required]
        public Guid TenantId { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]   
        public DateTime DateOfPayment { get; set; }

        [Required]
        public int ReferenceMonth { get; set; }

        [Required]
        [StringLength(4)]
        public string ReferenceYear { get; set; }      
    }
}
