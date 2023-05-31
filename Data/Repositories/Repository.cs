using digital_portfolio.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace digital_portfolio.Data.Repositories;

public class Repository<T> : IRepository<T> where T : BaseEntity
{
    private readonly DataContext _context;

    public Repository(DataContext context)
    {
        _context = context;
    }

    public ICollection<T> GetAll()
    {
        return _context.Set<T>().ToList();
    }

    public T GetById(string id)
    {
        var result = _context.Set<T>().FirstOrDefault(x => x.Id == id);

        return result ?? null;
    }

    public async Task<string> Add(T entity)
    {
        var result = await _context.Set<T>().AddAsync(entity);
        await _context.SaveChangesAsync();
        return result.Entity.Id;    
    }

    public async Task Delete(string id)
    {
        var entity = await _context.Set<T>().FirstOrDefaultAsync(x => x.Id == id);
        _context.Remove(entity);
        await _context.SaveChangesAsync();
        return;
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}
