using DAW_Project.Data;
using DAW_Project.Models.DTOs;
using DAW_Project.Models;
using Microsoft.AspNetCore.Mvc;
using DAW_Project.Models.Enums;
using DAW_Project.Helpers.Attributes;
using Microsoft.EntityFrameworkCore;

namespace DAW_Project.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksControllers : ControllerBase
    {
        private readonly AppDBContext _appContext;

        public BooksControllers(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        [Authorize(Role.Admin, Role.User)]
        [HttpGet("books")]
        public async Task<IActionResult> GetBooks()
        {
            return Ok(await _appContext.Books.ToListAsync());
        }

        // CREATE
        [Authorize(Role.Admin)]
        [HttpPost("book")]
        public async Task<IActionResult> Create(BookDTO bookDTO)
        {
            var newBook = new Books
            {
                Id = Guid.NewGuid(),
                Name = bookDTO.Name,
                Author = bookDTO.Author,
                PublishingHouse = bookDTO.PublishingHouse
            };

            await _appContext.AddAsync(newBook);
            await _appContext.SaveChangesAsync();

            return Ok(newBook);
        }

        // UPDATE
        [Authorize(Role.Admin)]
        [HttpPost("updatebook")]
        public async Task<IActionResult> Update(BookDTO bookDTO)
        {
            Books bookById = await _appContext.Books.FirstOrDefaultAsync(x => x.Id == bookDTO.Id);
            if (bookById == null)
            {
                return BadRequest("Aceasta carte nu exista");
            }

            bookById.Name = bookDTO.Name;
            bookById.Author = bookDTO.Author;
            bookById.PublishingHouse = bookDTO.PublishingHouse;
            _appContext.Update(bookById);
            await _appContext.SaveChangesAsync();

            return Ok(bookById);
        }

        // DELETE
        [Authorize(Role.Admin)]
        [HttpPost("deletebook")]
        public async Task<IActionResult> DeleteConfirmed(BookDTO bookDTO)
        {
            Books bookById = await _appContext.Books.FirstOrDefaultAsync(x => x.Id == bookDTO.Id);
            if (bookById == null)
            {
                return BadRequest("Aceasta carte nu exista");
            }
            _appContext.Books.Remove(bookById);
            await _appContext.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

    }
}
