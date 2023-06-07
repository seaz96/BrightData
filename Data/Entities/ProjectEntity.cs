namespace digital_portfolio.Data.Entities;

public class ProjectEntity : BaseEntity
{
    public string AuthorID { get; set; }

    public string Name { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<TechnologiesEntity> Technologies { get; set; }

    public virtual ICollection<CommentsEntity> Comments { get; set; }

    public string? GithubLink { get; set; }

    public int Likes { get; set; }

    public string? Photo { get; set; }
}

public class TechnologiesEntity : BaseEntity
{
    public string Name { get; set; }
}

public class CommentsEntity : BaseEntity
{
    public string AuthorID { get; set; }

    public string Comment { get; set; }

    public string PublishedDate { get; set; }
}