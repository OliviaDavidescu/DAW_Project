using DAW_Project.Data;
using DAW_Project.Models;
using DAW_Project.Repositories.GenericRepository;
using Microsoft.EntityFrameworkCore;

namespace DAW_Project.Repositories.StudentsRepository
{
    public class StudentRepository : GenericRepository<Students>, IStudentsRepository
    {
        public StudentRepository(AppDBContext appContext) : base(appContext) { }

        public List<Students> AlphabeticalOrder(string fname, string lname)
        {
            var studentsOrdered = from s in _table
                                  orderby s.FirstName, s.LastName
                                  select s;

            return studentsOrdered.ToList();
        }

        public List<Students> GetAllWithInclude()
        {
            var result = _table.Include(s => s.StudyHistory).ThenInclude(m2 => m2.Students).ToList();
            return _table.Include(s => s.StudyHistory).ToList();

        }
    }
}
