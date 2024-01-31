using DAW_Project.Models.Base;

namespace DAW_Project.Models
{
    public class StudyHistory : BaseEntity
    {
        public string? Faculty { get; set; }
        public string? Year { get; set; }

        // relatie de tip One-to-One cu tabelul Students
        public Students Students { get; set; }
        public Guid StudentId { get; set; }
    }
}
