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
    public class CheckOutsControllers : ControllerBase
    {
        private readonly AppDBContext _appContext;

        public CheckOutsControllers(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        [Authorize(Role.Admin)]
        [HttpGet("checkouts")]
        public async Task<IActionResult> GetCheckOuts()
        {
            return Ok(await _appContext.CheckOuts.ToListAsync());
        }

        // CREATE
        [Authorize(Role.Admin)]
        [HttpPost("checkout")]
        public async Task<IActionResult> Create(CheckOutsDTO checkOutsDTO)
        {
            var newCheckOut = new CheckOuts
            {
                Id = Guid.NewGuid(),
                StudentId = Guid.Parse(checkOutsDTO.StudentId),
                BookId = Guid.Parse(checkOutsDTO.BookId),
                from = checkOutsDTO.from,
                to = checkOutsDTO.to
            };

            await _appContext.AddAsync(newCheckOut);
            await _appContext.SaveChangesAsync();

            return Ok(newCheckOut);
        }

        // UPDATE
        [Authorize(Role.Admin)]
        [HttpPost("updatecheckout")]
        public async Task<IActionResult> Update(CheckOutsDTO checkOutsDTO)
        {
            CheckOuts checkoutById = await _appContext.CheckOuts.FirstOrDefaultAsync(x => x.Id == checkOutsDTO.Id);
            if (checkoutById == null)
            {
                return BadRequest("Eroare");
            }

            checkoutById.StudentId = Guid.Parse(checkOutsDTO.StudentId);
            checkoutById.BookId = Guid.Parse(checkOutsDTO.BookId);
            checkoutById.from = checkOutsDTO.from;
            checkoutById.to = checkOutsDTO.to;
            _appContext.Update(checkoutById);
            await _appContext.SaveChangesAsync();

            return Ok(checkoutById);
        }

        // DELETE
        [Authorize(Role.Admin)]
        [HttpPost("deletecheckout")]
        public async Task<IActionResult> DeleteConfirmed(CheckOutsDTO checkOutsDTO)
        {
            CheckOuts checkoutById = await _appContext.CheckOuts.FirstOrDefaultAsync(x => x.Id == checkOutsDTO.Id);
            if (checkoutById == null)
            {
                return BadRequest("Eroare");
            }
            _appContext.CheckOuts.Remove(checkoutById);
            await _appContext.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

    }
}
