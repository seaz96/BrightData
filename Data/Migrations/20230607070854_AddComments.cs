using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace digital_portfolio.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddComments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CommentsEntity",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    AuthorID = table.Column<string>(type: "text", nullable: false),
                    Comment = table.Column<string>(type: "text", nullable: false),
                    PublishedDate = table.Column<string>(type: "text", nullable: false),
                    ProjectEntityId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommentsEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommentsEntity_Projects_ProjectEntityId",
                        column: x => x.ProjectEntityId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CommentsEntity_ProjectEntityId",
                table: "CommentsEntity",
                column: "ProjectEntityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommentsEntity");
        }
    }
}
