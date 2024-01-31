using DAW_Project.Models.Base;

namespace DAW_Project.Models
{
    public class CheckOuts
    {
        public Guid StudentId { get; set; }
        public Students Student { get; set; }

        public Guid BookId { get; set; }
        public Books Book { get; set; }

        public DateOnly from { get; set; }
        public DateOnly to { get; set; }
    }
}
