using Microsoft.EntityFrameworkCore;
using System;

namespace Suites.Services
{
    public class TenantsService : ITenantsService
    {
        private readonly SuitesDbContext _context;

        public TenantsService(SuitesDbContext context)
        {
            _context = context;
        }

        public async Task<List<Tenant>> GetTenants()
        {
            var tenantList = await _context.Tenants.ToListAsync();
            return tenantList;
        }
    }
}
