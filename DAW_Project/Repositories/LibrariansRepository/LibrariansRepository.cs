using DAW_Project.Data;
using DAW_Project.Models;
using DAW_Project.Repositories.GenericRepository;
using DAW_Project.Repositories.StudentsRepository;
using System;

namespace DAW_Project.Repositories.LibrariansRepository
{
    public class LibrariansRepository : GenericRepository<Librarians>, ILibrariansRepository
    {
        public LibrariansRepository(AppDBContext appContext) : base(appContext) { }

        public List<Librarians> AlphabeticalOrder(string fname, string lname)
        {
            var librariansOrdered = from s in _table
                                  orderby s.FirstName, s.LastName
                                  select s;

            return librariansOrdered.ToList();
        }
    }
}
