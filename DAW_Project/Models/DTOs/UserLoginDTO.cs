using System.ComponentModel.DataAnnotations;

namespace DAW_Project.Models.DTOs
{
    public class UserLoginDTO
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
