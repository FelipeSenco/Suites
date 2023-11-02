using System.ComponentModel.DataAnnotations;


namespace Suites.Models
{
    public class PropertyProjection
    {
        public Guid Id { get; set; }
 
        public string Name { get; set; }
   
        public string Address { get; set; }
  
        public int Rooms { get; set; }
  
        public int NumberOfTenants { get; set; }
    
        public int Vacancies { get; set; }
    }
}
