using DAW_Project.Models;
using DAW_Project.Repositories.GenericRepository;

namespace DAW_Project.Repositories.UserRepository
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User> FindByUsername(string username);
        //Task<User> FindByUsernameAndPassword(string username, string password);


        Task<List<User>> FindAll();

        Task<List<User>> FindAllActive();

    }
}
