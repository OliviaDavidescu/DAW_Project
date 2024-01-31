using DAW_Project.Models;
using Microsoft.EntityFrameworkCore;

namespace DAW_Project.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions options) : base(options) { }


        // One-to-One
        public DbSet<Students> Students { get; set; }
        public DbSet<StudyHistory> StudyHistory { get; set; }


        // One-to-Many
        public DbSet<Departments> Departments { get; set; }
        public DbSet<Librarians> Librarians { get; set; }


        // Many-to-Many
        public DbSet<Books> Books { get; set; }
        public DbSet<CheckOuts> CheckOuts { get; set; }


        // tabelul pentru utilizatori
        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // One-to-One
            modelBuilder.Entity<Students>()
                .HasOne(students => students.StudyHistory)
                .WithOne(history => history.Students)
                .HasForeignKey<StudyHistory>(history => history.StudentId);


            // One-to-Many
            modelBuilder.Entity<Departments>()
                        .HasMany(d => d.Librarians)
                        .WithOne(l => l.Department);


            // Many-to-Many
            modelBuilder.Entity<CheckOuts>().HasKey(mr => new { mr.StudentId, mr.BookId });

            modelBuilder.Entity<CheckOuts>()
                        .HasOne(mr => mr.Book)
                        .WithMany(m3 => m3.CheckOuts)
                        .HasForeignKey(mr => mr.BookId);

            modelBuilder.Entity<CheckOuts>()
                        .HasOne(mr => mr.Student)
                        .WithMany(m4 => m4.CheckOuts)
                        .HasForeignKey(mr => mr.StudentId);

            base.OnModelCreating(modelBuilder);

        }



    }
}
