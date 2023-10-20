using Suites.Models;

namespace Suites.Services
{
    public interface IPropertiesService
    {
        public Task<List<PropertyProjection>> GetProperties();
    }
}
