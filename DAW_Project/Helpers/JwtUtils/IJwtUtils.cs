using DAW_Project.Models;

namespace DAW_Project.Helpers.JwtUtil
{
    public interface IJwtUtils
    {
        public string GenerateJwtToken(User user);
        public Guid? GetUserId(string? token);
    }
}
