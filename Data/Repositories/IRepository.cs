using digital_portfolio.Data.Entities;

namespace digital_portfolio.Data.Repositories;
public interface IRepository<T> where T : BaseEntity
{
    ICollection<T> GetAll();

    T GetById(string id);

    Task<string> Add(T entity);

    Task Delete(string id);

    Task<int> SaveChangesAsync();
}
