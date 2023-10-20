using Suites.Models;
using Suites.Repositories;

namespace Suites.Services
{
    public class PropertiesService : IPropertiesService
    {
        private readonly IPropertiesRepository _repository;
        public PropertiesService(IPropertiesRepository propertiesRepository) 
        {
            _repository = propertiesRepository;
        }

        public async Task<List<PropertyProjection>> GetProperties()
        {
            var result = new List<PropertyProjection>();
            var dbProperties = await _repository.GetProperties();
            foreach ( var dbProperty in dbProperties)
            {
                int numberOfRooms = dbProperty.Rooms;
                int tenantCount = dbProperty.Tenants.Count;
                result.Add(new PropertyProjection 
                {
                    Id = dbProperty.Id,
                    Name = dbProperty.Name,
                    Address = dbProperty.Address,
                    Rooms = numberOfRooms,
                    NumberOfTenants = tenantCount,
                    Vacancies = numberOfRooms - tenantCount
                });
            }
            return result;
        }
    }
}
