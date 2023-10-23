using Microsoft.EntityFrameworkCore;
using Suites.Repositories;
using System;

namespace Suites.Services
{
    public class TenantsService : ITenantsService
    {
        private readonly ITenantsRepository _tenantsRepository;

        public TenantsService(ITenantsRepository tenantsRepository)
        {
            _tenantsRepository = tenantsRepository;
        }

        public async Task<List<Tenant>> GetTenants()
        {
            var tenantList = await _tenantsRepository.GetTenants();
            return tenantList;
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
