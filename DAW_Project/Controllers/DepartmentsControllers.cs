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
    public class DepartmentsControllers : ControllerBase
    {
        private readonly AppDBContext _appContext;

        public DepartmentsControllers(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        
        // GET
        [Authorize(Role.Admin)]
        [HttpGet("departments")]
        public async Task<IActionResult> GetDepartments()
        {
            return Ok(await _appContext.Departments.ToListAsync());
        }


        // CREATE
        [Authorize(Role.Admin)]
        [HttpPost("department")]
        public async Task<IActionResult> Create(DepartmentsDTO departmentsDTO)
        {
            var newDepartment = new Departments
            {
                Id = Guid.NewGuid(),
                Name = departmentsDTO.Name
            };

            await _appContext.AddAsync(newDepartment);
            await _appContext.SaveChangesAsync();

            return Ok(newDepartment);
        }

        // UPDATE
        [Authorize(Role.User)]
        [HttpPost("updatedepartment")]
        public async Task<IActionResult> Update(DepartmentsDTO departmentsDTO)
        {
            Departments departmentById = await _appContext.Departments.FirstOrDefaultAsync(x => x.Id == departmentsDTO.Id);
            if (departmentById == null)
            {
                return BadRequest("Acest bibliotecar nu are profil");
            }

            departmentById.Name = departmentsDTO.Name;
            _appContext.Update(departmentById);
            await _appContext.SaveChangesAsync();

            return Ok(departmentById);
        }

        // DELETE
        [Authorize(Role.Admin)]
        [HttpPost("deletedepartment")]
        public async Task<IActionResult> DeleteConfirmed(DepartmentsDTO departmentsDTO)
        {
            Departments departmentById = await _appContext.Departments.FirstOrDefaultAsync(x => x.Id == departmentsDTO.Id);
            if (departmentById == null)
            {
                return BadRequest("Acest bibliotecar nu are profil");
            }
            _appContext.Departments.Remove(departmentById);
            await _appContext.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

    }
}
