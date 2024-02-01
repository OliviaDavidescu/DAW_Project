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
    public class LibrariansControllers : ControllerBase
    {
        private readonly AppDBContext _appContext;

        public LibrariansControllers(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        [Authorize(Role.Admin)]
        [HttpGet("librarians")]
        public async Task<IActionResult> GetLibrarians()
        {
            return Ok(await _appContext.Librarians.ToListAsync());
        }

        // CREATE
        [Authorize(Role.User)]
        [HttpPost("librarian")]
        public async Task<IActionResult> Create(LibrarianDTO librarianDTO)
        {
            var newLibrarian = new Librarians
            {
                Id = Guid.NewGuid(),
                FirstName = librarianDTO.FirstName,
                LastName = librarianDTO.LastName,
            };

            await _appContext.AddAsync(newLibrarian);
            await _appContext.SaveChangesAsync();

            return Ok(newLibrarian);
        }

        // UPDATE
        [Authorize(Role.User)]
        [HttpPost("updatelibrarian")]
        public async Task<IActionResult> Update(LibrarianDTO librarianDTO)
        {
            Librarians librarianById = await _appContext.Librarians.FirstOrDefaultAsync(x => x.Id == librarianDTO.Id);
            if (librarianById == null)
            {
                return BadRequest("Acest bibliotecar nu are profil");
            }

            librarianById.FirstName = librarianDTO.FirstName;
            librarianById.LastName = librarianDTO.LastName;
            _appContext.Update(librarianById);
            await _appContext.SaveChangesAsync();

            return Ok(librarianById);
        }

        // DELETE
        [Authorize(Role.User)]
        [HttpPost("deletelibrarian")]
        public async Task<IActionResult> DeleteConfirmed(LibrarianDTO librarianDTO)
        {
            Librarians librarianById = await _appContext.Librarians.FirstOrDefaultAsync(x => x.Id == librarianDTO.Id);
            if (librarianById == null)
            {
                return BadRequest("Acest bibliotecar nu are profil");
            }
            _appContext.Librarians.Remove(librarianById);
            await _appContext.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

    }
}
