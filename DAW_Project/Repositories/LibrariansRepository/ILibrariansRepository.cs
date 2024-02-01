using DAW_Project.Models;
using DAW_Project.Repositories.GenericRepository;

namespace DAW_Project.Repositories.LibrariansRepository
{
    public interface ILibrariansRepository : IGenericRepository<Librarians>
    {
        List<Librarians> AlphabeticalOrder(string fname, string lname);
    }
}
