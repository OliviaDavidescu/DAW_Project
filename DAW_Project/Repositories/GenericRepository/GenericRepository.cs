using DAW_Project.Data;
using DAW_Project.Models.Base;
using Microsoft.EntityFrameworkCore;

namespace DAW_Project.Repositories.GenericRepository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly AppDBContext _appContext;
        protected readonly DbSet<TEntity> _table;

        public GenericRepository(AppDBContext appContext)
        {
            _appContext = appContext;
            _table = _appContext.Set<TEntity>();
        }


        // GET
        public async Task<List<TEntity>> GetAll()
        {
            return await _table.AsNoTracking().ToListAsync();
        }


        // CREATE
        public void Create(TEntity entity)
        {
            _table.Add(entity);
        }

        public async Task CreateAsync(TEntity entity)
        {
            await _table.AddAsync(entity);
        }

        public void CreateRange(IEnumerable<TEntity> entities)
        {
            _table.AddRange(entities);
        }

        public async Task CreateRangeAsync(IEnumerable<TEntity> entities)
        {
            await _table.AddRangeAsync(entities);
        }


        // UPDATE
        public void Update(TEntity entity)
        {
            _table.Update(entity);
        }

        public void UpdateRange(IEnumerable<TEntity> entities)
        {
            _table.UpdateRange(entities);
        }


        // DELETE
        public void Delete(TEntity entity)
        {
            _table.Remove(entity);
        }

        public void DeleteRange(IEnumerable<TEntity> entities)
        {
            _table.RemoveRange(entities);
        }


        // FIND
        public TEntity FindById(Guid id)
        {
            return _table.Find(id);
        }

        public async Task<TEntity> FindByIdAsync(Guid id)
        {
            return await _table.FindAsync(id);
        }


        // SAVE
        public bool Save()
        {
            return _appContext.SaveChanges() > 0;
        }

        public async Task<bool> SaveAsync()
        {
            return await _appContext.SaveChangesAsync() > 0;
        }
    }
}
