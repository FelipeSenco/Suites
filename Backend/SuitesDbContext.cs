using Microsoft.EntityFrameworkCore;
using Suites.Models;

namespace Suites
{
    public class SuitesDbContext : DbContext
    {
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<Payment> Payments { get; set; }

        public SuitesDbContext(DbContextOptions<SuitesDbContext> options) : base(options)
        {
        }    

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tenant>()
                .HasOne(t => t.Property)
                .WithMany(p => p.Tenants)
                .HasForeignKey(t => t.PropertyId);

            modelBuilder.Entity<Property>()
                .HasMany(p => p.Tenants)
                .WithOne(t => t.Property);

            modelBuilder.Entity<Payment>()
                .HasOne(p => p.Tenant)
                .WithMany(t => t.Payments);
        }

    }
}
