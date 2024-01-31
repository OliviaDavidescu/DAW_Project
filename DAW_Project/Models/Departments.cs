using DAW_Project.Models.Base;

namespace DAW_Project.Models
{
    public class Departments : BaseEntity
    {
        public string? Name { get; set; }

        // relatie de tip One-to-Many cu tabelul Librarians
        public ICollection<Librarians> Librarians { get; set; }
    }
}
