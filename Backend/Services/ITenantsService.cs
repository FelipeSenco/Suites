namespace Suites.Services
{
    public interface ITenantsService
    {
        public Task<List<Tenant>> GetTenants();
        public Task<Guid> AddTenant(AddTenant tenant);
        public Task EditTenant(EditTenant tenant);
        public Task DeleteTenant(Guid tenantId);
    }
}