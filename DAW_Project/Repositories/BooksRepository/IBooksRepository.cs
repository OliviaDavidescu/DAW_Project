using DAW_Project.Models;
using DAW_Project.Repositories.GenericRepository;

namespace DAW_Project.Repositories.BooksRepository
{
    public interface IBooksRepository : IGenericRepository<Books>
    {
        List<Books> booksAuthorOrdered(string name);
        Books Where(string name);
        void GroupBy();
        //List<dynamic> GetAllWithJoin();
    }
}
