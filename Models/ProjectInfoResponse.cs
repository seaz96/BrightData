using digital_portfolio.Data.Entities;

namespace digital_portfolio.Models;
public class ProjectInfoResponse
{

    public string AuthorID { get; set; }

    public string Name { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<TechnologiesEntity> Technologies { get; set; }

    public virtual ICollection<CommentsEntity> Comments { get; set; }

    public string? GithubLink { get; set; }

    public int Likes { get; set; }

    public string? Photo { get; set; }

    public string Id { get; set; }

    public bool IsLiked { get; set; }

    public string? AuthorLogin { get; set; }

    public string? AuthorName { get; set; }
}
