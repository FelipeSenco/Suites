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
    }
}
