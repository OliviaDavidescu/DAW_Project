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
    public class StudentsController : ControllerBase
    {
        private readonly AppDBContext _appContext;

        public StudentsController(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        //[Authorize(Role.Admin)]
        [HttpGet("students")]
        public async Task<IActionResult> GetStudents()
        {
            return Ok(await _appContext.Students.ToListAsync());
        }

        // CREATE
        //[Authorize(Role.User)]
        [HttpPost("student")]
        public async Task<IActionResult> Create(StudentDTO studentDTO)
        {
            var newStudent = new Students
            {
                Id = Guid.NewGuid(),
                FirstName = studentDTO.FirstName,
                LastName = studentDTO.LastName,
                IdentityNumber = studentDTO.IdentityNumber
            };

            await _appContext.AddAsync(newStudent);
            await _appContext.SaveChangesAsync();

            return Ok(newStudent);
        }

        // UPDATE
        //[Authorize(Role.User)]
        [HttpPost("updatestudent")]
        public async Task<IActionResult> Update(StudentDTO studentDTO)
        {
            Students studentById = await _appContext.Students.FirstOrDefaultAsync(x => x.Id == studentDTO.Id);
            if (studentById == null)
            {
                return BadRequest("Acest student nu are profil");
            }

            studentById.FirstName = studentDTO.FirstName;
            studentById.LastName = studentDTO.LastName;
            studentById.IdentityNumber = studentDTO.IdentityNumber;
            _appContext.Update(studentById);
            await _appContext.SaveChangesAsync();

            return Ok(studentById);
        }

        // DELETE
        //[Authorize(Role.User)]
        [HttpPost("deletestudent")]
        public async Task<IActionResult> DeleteConfirmed(StudentDTO studentDTO)
        {
            Students studentById = await _appContext.Students.FirstOrDefaultAsync(x => x.Id == studentDTO.Id);
            if (studentById == null)
            {
                return BadRequest("Acest student nu are profil");
            }
            _appContext.Students.Remove(studentById);
            await _appContext.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

    }
}
