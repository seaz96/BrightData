using digital_portfolio.Data.Entities;

namespace digital_portfolio.Models;

public class ProjectUpdateRequest
{
    public string Name { get; set; }

    public string? Description { get; set; }

    public List<TechnologiesEntity> Technologies { get; set; }

    public string? GithubLink { get; set; }

    public string? Photo { get; set; }
}
