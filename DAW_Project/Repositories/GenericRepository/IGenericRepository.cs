using DAW_Project.Models.Base;

namespace DAW_Project.Repositories.GenericRepository
{
    public interface IGenericRepository<TEntity> where TEntity : BaseEntity
    {
        // GET
        Task<List<TEntity>> GetAll();


        // CREATE
        void Create(TEntity entity);
        Task CreateAsync(TEntity entity);

        void CreateRange(IEnumerable<TEntity> entities);
        Task CreateRangeAsync(IEnumerable<TEntity> entities);


        // UPDATE
        void Update(TEntity entity);
        void UpdateRange(IEnumerable<TEntity> entities);


        // DELETE 
        void Delete(TEntity entity);
        void DeleteRange(IEnumerable<TEntity> entities);


        // FIND
        TEntity FindById(Guid id);
        Task<TEntity> FindByIdAsync(Guid id);


        // SAVE
        bool Save();
        Task<bool> SaveAsync();
    }
}
