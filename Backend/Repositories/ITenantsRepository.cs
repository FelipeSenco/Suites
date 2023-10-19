namespace Suites.Repositories
{
    public interface ITenantsRepository
    {
        public Task<List<Tenant>> GetTenants();
        public Task AddTenant(Tenant tenant);

        public Task EditTenant(Tenant tenant);
        public Task DeleteTenant(Guid tenantId);
    }
}
