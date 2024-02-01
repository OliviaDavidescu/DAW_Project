namespace DAW_Project.Models.DTOs
{
    public class CheckOutsDTO
    {
        public Guid Id { get; set; }
        public string StudentId { get; set; }
        public string BookId { get; set; }
        public DateOnly from { get; set; }
        public DateOnly to { get; set; }
    }
}
