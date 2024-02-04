using DAW_Project.Helpers.JwtUtil;
using DAW_Project.Services.UserService;

namespace DAW_Project.Helpers
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IUserService userService, IJwtUtils jwtUtil)
        {
            // "Bearer sdsfkdkgkfgkflkgflgklfg"
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            var userId = jwtUtil.GetUserId(token);
            if (userId != null)
            {
                var user = userService.GetById(userId.Value);
                    if (user != null)
                    {
                        context.Items["User"] = user;
                    }           
            }

            await _next(context);
        }
    }
}
