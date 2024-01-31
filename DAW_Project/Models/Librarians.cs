using DAW_Project.Models.Base;

namespace DAW_Project.Models
{
    public class Librarians : BaseEntity
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        // relatie de tip One-to-Many cu tabelul Departments
        public Departments Department { get; set; }
        public Guid DepartmentId { get; set; }
    }
}
