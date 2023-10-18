namespace Suites.Repositories
{
    public interface ITenantsRepository
    {
        public Task<List<Tenant>> GetTenants();
        public Task AddTenant(Tenant tenant);
    }
}
