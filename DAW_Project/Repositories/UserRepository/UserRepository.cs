using DAW_Project.Data;
using DAW_Project.Models;
using DAW_Project.Helpers.Extensions;
using DAW_Project.Repositories.GenericRepository;
using Microsoft.EntityFrameworkCore;

namespace DAW_Project.Repositories.UserRepository
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(AppDBContext appContext) : base(appContext)
        {
        }

        public async Task<List<User>> FindAll()
        {
            return await _table.ToListAsync();
        }

        public async Task<List<User>> FindAllActive()
        {
            return await _table.GetActiveUser().ToListAsync();
        }

        public async Task<User?> FindByUsername(string username)
        {
            try
            {
                return await _table.FirstOrDefaultAsync(u => u.Username.Equals(username));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error finding user by username: {ex.Message}");
                return null;
            }
        }

        //public  async Task<User> FindByUsernameAndPassword(string username, string password)
        //{
        //    return (await _table.FirstOrDefaultAsync(u => u.Username.Equals(username) && u.Password.Equals(password)))!;
        //}
    }
}
