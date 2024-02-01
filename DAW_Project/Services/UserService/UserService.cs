using DAW_Project.Helpers.JwtUtil;
using DAW_Project.Models.DTOs;
using DAW_Project.Models.Enums;
using DAW_Project.Models;
using DAW_Project.Repositories.UserRepository;
using BCryptNet = BCrypt.Net.BCrypt;

namespace DAW_Project.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtUtils _jwtUtils;

        public UserService(IUserRepository userRepository, IJwtUtils jwtUtils)
        {
            _userRepository = userRepository;
            _jwtUtils = jwtUtils;
        }

        public User GetById(Guid id)
        {
            return _userRepository.FindById(id);
        }

        public async Task<UserLoginResponse> Login(UserLoginDTO userDTO)
        {
            var user = await _userRepository.FindByUsername(userDTO.UserName);

            if (user == null || !BCryptNet.Verify(userDTO.Password, user.Password))
            {
                return null; // or throw exception
            }
            if (user == null) return null;

            var token = _jwtUtils.GenerateJwtToken(user);
            return new UserLoginResponse(user, token);
        }

        public async Task<bool> Register(UserRegisterDTO userRegisterDTO, Role userRole)
        {
            var userToCreate = new User
            {
                Username = userRegisterDTO.UserName,
                FirstName = userRegisterDTO.FirstName,
                LastName = userRegisterDTO.LastName,
                Email = userRegisterDTO.Email,
                Role = userRole,
                Password = BCryptNet.HashPassword(userRegisterDTO.Password)
            };

            _userRepository.Create(userToCreate);
            return await _userRepository.SaveAsync();
        }
    }
}
