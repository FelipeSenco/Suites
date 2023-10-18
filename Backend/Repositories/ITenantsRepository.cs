namespace Suites.Repositories
{
    public interface ITenantsRepository
    {
        public Task<List<Tenant>> GetTenants();
    }
}
