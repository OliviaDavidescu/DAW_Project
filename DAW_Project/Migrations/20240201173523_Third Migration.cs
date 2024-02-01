using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAW_Project.Migrations
{
    /// <inheritdoc />
    public partial class ThirdMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                table: "CheckOuts",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateModified",
                table: "CheckOuts",
                type: "datetime(6)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "CheckOuts",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "CheckOuts",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCreated",
                table: "CheckOuts");

            migrationBuilder.DropColumn(
                name: "DateModified",
                table: "CheckOuts");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CheckOuts");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "CheckOuts");
        }
    }
}
