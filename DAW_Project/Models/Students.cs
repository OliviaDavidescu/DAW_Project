using DAW_Project.Models.Base;

namespace DAW_Project.Models
{
    public class Students : BaseEntity
    {
        public string? FirstName { get; set; }
        public string? LasrName { get; set; }
        public string? IdentityNumber { get; set; }

        // relatie de tip One-to-One cu tabelul StudyHistory
        public StudyHistory StudyHistory { get; set; }

        // relatie de tip Many-to-Many cu tabelul Students => tabel asociatuv CheckOuts
        public ICollection<CheckOuts> CheckOuts { get; set; }
    }
}
