CREATE PROCEDURE GetPaymentsProjections
AS
BEGIN
    SELECT
        p.Id,
        t.Id as TenantId,
        t.Name as TenantName,
        t.LastName as TenantLastName,
        prop.Name as PropertyName,
        prop.Id as PropertyId,
        t.RoomNumber as RoomNumber,        
        p.Amount,
        p.DateOfPayment,
        p.ReferenceMonth,
        p.ReferenceYear,
        CASE 
            WHEN LEN(p.Receipt) > 0 THEN 1 
            ELSE 0 
        END as HasReceipt
    FROM Payments p
    INNER JOIN Tenants t ON p.TenantId = t.Id
    INNER JOIN Properties prop ON t.PropertyId = prop.Id   
END