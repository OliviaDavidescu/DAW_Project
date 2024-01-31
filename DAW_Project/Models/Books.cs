using DAW_Project.Models.Base;

namespace DAW_Project.Models
{
    public class Books : BaseEntity
    {
        public string? Name { get; set; }
        public string? Author { get; set; }
        public string? PublishingHouse { get; set; }

        // relatie de tip Many-to-Many cu tabelul Students => tabel asociatuv CheckOuts
        public ICollection<CheckOuts> CheckOuts { get; set; }

    }
}
