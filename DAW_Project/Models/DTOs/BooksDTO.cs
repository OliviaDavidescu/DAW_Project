namespace DAW_Project.Models.DTOs
{
    public class BookDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public string PublishingHouse { get; set; }
        public string Section { get; set; }
    }
}
