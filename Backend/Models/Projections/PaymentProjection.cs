using System;

public class PaymentProjection
{
    public string Id { get; set; }

    public string TenantId { get; set; }

    public string TenantName { get; set; }

    public string TenantLastName { get; set; }

    public string PropertyName { get; set; }

    public string RoomNumber { get; set; }

    public decimal Amount { get; set; }

    public DateTime DateOfPayment { get; set; }

    public int ReferenceMonth { get; set; }

    public string ReferenceYear { get; set; }

    public string Receipt { get; set; } 
}
