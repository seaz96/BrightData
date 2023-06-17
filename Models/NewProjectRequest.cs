using digital_portfolio.Data.Entities;

namespace digital_portfolio.Models;

public class NewProjectRequest
{
    public string Name { get; set; }

    public virtual ICollection<TechnologiesEntity> Technologies { get; set; }

    public string? GithubLink { get; set; }

    public string? Photo { get; set; }
}