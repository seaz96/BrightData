using digital_portfolio.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace digital_portfolio.Data;
public class DataContext : DbContext
{
    public DbSet<UserEntity> Users { get; set; }
    public DbSet<ProjectEntity> Projects { get; set; }

    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        Database.Migrate();
    }

    public async Task<int> SaveChanges() => await base.SaveChangesAsync();

    public DbSet<T> DbSet<T>() where T : class => Set<T>();
}
