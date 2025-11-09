using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GuessNumber.Migrations
{
    /// <inheritdoc />
    public partial class UpdateColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_GameStats_UserId",
                table: "GameStats");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Users",
                newName: "Password");

            migrationBuilder.AddColumn<int>(
                name: "BestScore",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GameStats_UserId",
                table: "GameStats",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_GameStats_UserId",
                table: "GameStats");

            migrationBuilder.DropColumn(
                name: "BestScore",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Users",
                newName: "PasswordHash");

            migrationBuilder.CreateIndex(
                name: "IX_GameStats_UserId",
                table: "GameStats",
                column: "UserId",
                unique: true);
        }
    }
}
