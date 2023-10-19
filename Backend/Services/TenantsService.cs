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

        public async Task AddTenant(AddTenant tenant)
        {
            var dbTenant = new Tenant() { CellPhone = tenant.CellPhone, Email = tenant.Email, Name = tenant.Name, LastName = tenant.LastName };
            await _tenantsRepository.AddTenant(dbTenant);
        }            

        public async Task DeleteTenant(Guid tenantId)
        {
            await _tenantsRepository.DeleteTenant(tenantId);
        }

        public async Task EditTenant(Tenant tenant)
        {
            await _tenantsRepository.EditTenant(tenant);
        }
    }
}
