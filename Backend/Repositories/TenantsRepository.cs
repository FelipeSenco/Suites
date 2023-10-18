using Microsoft.EntityFrameworkCore;

namespace Suites.Repositories
{
    public class TenantsRepository : ITenantsRepository
    {
        private readonly SuitesDbContext _context;

        public TenantsRepository(SuitesDbContext context)
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
