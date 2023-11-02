using Microsoft.EntityFrameworkCore;
using Suites.Repositories;
using System;

namespace Suites.Services
{
    public class TenantsService : ITenantsService
    {
        private readonly ITenantsRepository _tenantsRepository;
        private readonly IPropertiesRepository _propertiesRepository;

        public TenantsService(ITenantsRepository tenantsRepository, IPropertiesRepository propertiesRepository)
        {
            _tenantsRepository = tenantsRepository;
            _propertiesRepository = propertiesRepository;
        }

        public async Task<List<TenantProjection>> GetTenants()
        {
            var result = new List<TenantProjection>();
            var dbTenantList = await _tenantsRepository.GetTenants();
            var properties = await _propertiesRepository.GetProperties();
            foreach ( var dbTenant in dbTenantList )
            {
                result.Add( new TenantProjection()
                {
                    Id = dbTenant.Id,
                    Name = dbTenant.Name,
                    LastName = dbTenant.LastName,
                    Email = dbTenant.Email,
                    CellPhone = dbTenant.CellPhone,
                    PropertyId = dbTenant.PropertyId,
                    PropertyName = properties.FirstOrDefault(p => p.Id == dbTenant.PropertyId).Name,
                    RoomNumber = dbTenant.RoomNumber,
                });
            }
            return result;
        }

        public async Task<Guid> AddTenant(AddTenant tenant)
        {
            Guid newTenantGuid = Guid.NewGuid();
            var dbTenant = new Tenant() 
            {
                Id = newTenantGuid ,
                CellPhone = tenant.CellPhone,
                Email = tenant.Email,
                Name = tenant.Name,
                LastName = tenant.LastName,
                PropertyId = tenant.PropertyId,
                RoomNumber = tenant.RoomNumber,
            };
            await _tenantsRepository.AddTenant(dbTenant);
            return newTenantGuid;
        }            
        public async Task DeleteTenant(Guid tenantId)
        {
            await _tenantsRepository.DeleteTenant(tenantId);
        }

        public async Task EditTenant(EditTenant tenant)
        {          
            var dbTenant = new Tenant()
            {
                Id = tenant.Id,
                CellPhone = tenant.CellPhone,
                Email = tenant.Email,
                Name = tenant.Name,
                LastName = tenant.LastName,
                PropertyId = tenant.PropertyId,
                RoomNumber = tenant.RoomNumber,
            };
            await _tenantsRepository.EditTenant(dbTenant);
        }
    }
}
