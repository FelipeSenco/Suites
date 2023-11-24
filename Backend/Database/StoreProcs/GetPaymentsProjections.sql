CREATE PROCEDURE GetPaymentsProjections
 @Page INT = 1,
 @PageSize INT = 15 
AS
BEGIN
  
    DECLARE @RowsToSkip INT = (@Page - 1) * @PageSize

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
    ORDER BY p.SysStartTime DESC
    OFFSET @RowsToSkip ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END