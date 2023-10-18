using Microsoft.EntityFrameworkCore;
using System;

namespace Suites
{
    public class SuitesDbContext : DbContext
    {
        public DbSet<Tenant> Tenants { get; set; }

        public SuitesDbContext(DbContextOptions<SuitesDbContext> options) : base(options)
        {
        }
    }
}
