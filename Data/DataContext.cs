using digital_portfolio.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace digital_portfolio.Data;
public class DataContext : DbContext
{
    public DbSet<UserEntity> Users { get; set; }
    public DbSet<ProjectEntity> Projects { get; set; }

    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public new async Task<int> SaveChanges()
    {
        return await base.SaveChangesAsync();
    }

    public DbSet<T> DbSet<T>() where T : class
    {
        return Set<T>();
    }
}
