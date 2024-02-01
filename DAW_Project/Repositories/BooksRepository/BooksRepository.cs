using DAW_Project.Data;
using DAW_Project.Models;
using DAW_Project.Repositories.GenericRepository;
using System.Linq;

namespace DAW_Project.Repositories.BooksRepository
{
    public class BooksRepository : GenericRepository<Books>, IBooksRepository
    {
        public BooksRepository(AppDBContext appContext) : base(appContext) { }

        public List<Books> booksAuthorOrdered(string name)
        {
            var booksAuthorOrdered = from s in _table
                                     orderby s.Author
                                     select s;

            return booksAuthorOrdered.ToList();
        }

        public Books Where(string name)
        {
            var result1 = _table.Where(x => x.Name == name).FirstOrDefault();

            return result1!;
        }

        public void GroupBy()
        {
            var groupedBooks = _table.GroupBy(x => x.PublishingHouse);

            foreach (var book in groupedBooks)
            {
                Console.WriteLine("Editura: " + book.Key);

                foreach (var b in book)
                {
                    Console.WriteLine(b.Author + " " + b.Name);
                }
            }
        }

        //public List<dynamic> GetAllWithJoin()
        //{
        //    var result = _appContext.Books.Join(_appContext.CheckOuts, books => books.Id, checkOuts => checkOuts.BookId,
        //        (books, checkOuts) => new { books, checkOuts }).Select(ob => ob.checkOuts);

        //    foreach (var book in result)
        //    {
        //        Console.WriteLine(book);

        //    }

        //    return null;
        //}
    }
}
