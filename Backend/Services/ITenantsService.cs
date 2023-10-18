namespace Suites.Services
{
    public interface ITenantsService
    {
        public Task<List<Tenant>> GetTenants();
    }
}