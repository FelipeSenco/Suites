using Microsoft.EntityFrameworkCore;
using Suites.Models;

namespace Suites.Repositories
{
    public class PropertiesRepository : IPropertiesRepository
    {
        private readonly SuitesDbContext _context;

        public PropertiesRepository(SuitesDbContext context)
        {
            _context = context;
        }  

        public async Task<List<Property>> GetProperties()
        {
           return await _context.Properties.ToListAsync();
        }
    }
}
