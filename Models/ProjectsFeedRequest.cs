using System.ComponentModel.DataAnnotations;

namespace digital_portfolio.Models;

public class ProjectsFeedRequest
{
    [Required]
    public int Count { get; set; }
}
