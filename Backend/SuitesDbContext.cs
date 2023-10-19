using Microsoft.EntityFrameworkCore;
using Suites.Models;

namespace Suites
{
    public class SuitesDbContext : DbContext
    {
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Property> Properties { get; set; }

        public SuitesDbContext(DbContextOptions<SuitesDbContext> options) : base(options)
        {
        }
    }
}
