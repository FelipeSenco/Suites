using System;

public class PaymentProjection
{
    public Guid Id { get; set; }

    public Guid TenantId { get; set; }

    public string TenantName { get; set; }

    public string TenantLastName { get; set; }

    public string PropertyName { get; set; }

    public int RoomNumber { get; set; }

    public decimal Amount { get; set; }

    public DateTime DateOfPayment { get; set; }

    public int ReferenceMonth { get; set; }

    public string ReferenceYear { get; set; }

    public string Receipt { get; set; } 
}
