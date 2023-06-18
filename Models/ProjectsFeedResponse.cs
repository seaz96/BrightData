using digital_portfolio.Data.Entities;

namespace digital_portfolio.Models;

public class ProjectsFeedResponse : BaseEntity
{
    public ICollection<ProjectInfoResponse> Projects { get; set; }
}
