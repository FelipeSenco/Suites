using Suites.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class TenantProjection
{  
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public string CellPhone { get; set; }

    public Guid PropertyId { get; set; }    

    public string PropertyName { get;set; }
 
    public int RoomNumber { get; set; }
}
