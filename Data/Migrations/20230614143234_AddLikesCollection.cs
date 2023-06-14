using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace digital_portfolio.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddLikesCollection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LikedProjectEntity",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ProjectId = table.Column<string>(type: "text", nullable: false),
                    UserEntityId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikedProjectEntity", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikedProjectEntity_Users_UserEntityId",
                        column: x => x.UserEntityId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_LikedProjectEntity_UserEntityId",
                table: "LikedProjectEntity",
                column: "UserEntityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LikedProjectEntity");
        }
    }
}
