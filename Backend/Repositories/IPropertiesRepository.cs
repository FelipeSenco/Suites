

using Suites.Models;

namespace Suites.Repositories
{
    public interface IPropertiesRepository
    {
        public Task<List<Property>> GetProperties();     
    }
}
