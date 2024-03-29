﻿using DAW_Project.Data;
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
    public class BooksController : ControllerBase
    {
        private readonly AppDBContext _appContext;

        public BooksController(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        [AllowAnonymous]
        [HttpGet("books")]
        public async Task<IActionResult> GetBooks()
        {
            return Ok(await _appContext.Books.ToListAsync());
        }

        [HttpGet("book/{id}")]
        public async Task<IActionResult> GetBookById(Guid id)
        {
            try
            {
                var book = await _appContext.Books.FindAsync(id);

                if (book == null)
                {
                    return NotFound();
                }

                return Ok(new
                {
                    book.Name,
                    book.Author,
                    book.PublishingHouse,
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
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
            Books bookById = await _appContext.Books.FindAsync(bookDTO.Id);
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
