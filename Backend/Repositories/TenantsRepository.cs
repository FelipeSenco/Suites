using Microsoft.EntityFrameworkCore;
using System.Web.Http.Results;

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
            var tenantList = await _context.Tenants.OrderBy(t=>t.Name).ToListAsync();
            return tenantList;
        }

        public async Task AddTenant(Tenant tenant)
        {         
            await _context.Tenants.AddAsync(tenant);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTenant(Guid tenantId)
        {
            var removeTenant = await _context.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId);
            if (removeTenant is null)
            {
                throw new Exception("No tenant found for the provided id.");
            }
             _context.Tenants.Remove(removeTenant);
            await _context.SaveChangesAsync();
        }

        public async Task EditTenant(Tenant tenant)
        {
            var currentTenant = await _context.Tenants.FirstOrDefaultAsync(t => t.Id == tenant.Id);
            if (currentTenant is null)
            {
                throw new Exception("No tenant found for the provided id.");
            }

            currentTenant.Id = tenant.Id;
            currentTenant.CellPhone = tenant.CellPhone;
            currentTenant.Email = tenant.Email;
            currentTenant.Name = tenant.Name;
            currentTenant.LastName = tenant.LastName;
            currentTenant.PropertyId = new Guid("6F9619FF-8B86-448A-BCFA-2C3C1F2693B9");
           
            await _context.SaveChangesAsync();
        }
     
    }
}
