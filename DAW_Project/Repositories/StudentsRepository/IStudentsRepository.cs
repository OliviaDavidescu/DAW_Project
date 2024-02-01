using DAW_Project.Models;
using DAW_Project.Repositories.GenericRepository;

namespace DAW_Project.Repositories.StudentsRepository
{
    public interface IStudentsRepository : IGenericRepository<Students>
    {
        List<Students> AlphabeticalOrder(string fname, string lname);
        List<Students> GetAllWithInclude();
    }
}
