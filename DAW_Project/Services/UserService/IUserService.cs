using DAW_Project.Models.DTOs;
using DAW_Project.Models.Enums;
using DAW_Project.Models;

namespace DAW_Project.Services.UserService
{
    public interface IUserService
    {
        Task<UserLoginResponse> Login(UserLoginDTO user);
        User GetById(Guid id);

        Task<bool> Register(UserRegisterDTO userRegisterDto, Role userRole);
    }
}
