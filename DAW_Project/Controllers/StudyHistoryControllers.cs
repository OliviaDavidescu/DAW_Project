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
    public class StudyHistoryController : ControllerBase
    {
        private readonly AppDBContext _appContext;

        public StudyHistoryController(AppDBContext appContext)
        {
            _appContext = appContext;
        }

        // CREATE
        [Authorize(Role.User)]
        [HttpPost("history")]
        public async Task<IActionResult> Create(StudyHistoryDTO studyHistoryDTO)
        {
            var newHistory = new StudyHistory
            {
                Id = Guid.NewGuid(),
                Faculty = studyHistoryDTO.Faculty,
                Year = studyHistoryDTO.Year
            };

            await _appContext.AddAsync(newHistory);
            await _appContext.SaveChangesAsync();

            return Ok(newHistory);
        }

        // UPDATE
        [Authorize(Role.User)]
        [HttpPost("updatehistory")]
        public async Task<IActionResult> Update(StudyHistoryDTO studyHistoryDTO)
        {
            StudyHistory historyById = await _appContext.StudyHistory.FirstOrDefaultAsync(x => x.Id == studyHistoryDTO.Id);
            if (historyById == null)
            {
                return BadRequest("Eroare");
            }

            historyById.Faculty = studyHistoryDTO.Faculty;
            historyById.Year = studyHistoryDTO.Year;
            _appContext.Update(historyById);
            await _appContext.SaveChangesAsync();

            return Ok(historyById);
        }

        // DELETE
        [Authorize(Role.User)]
        [HttpPost("deletehistory")]
        public async Task<IActionResult> DeleteConfirmed(StudyHistoryDTO studyHistoryDTO)
        {
            StudyHistory historyById = await _appContext.StudyHistory.FirstOrDefaultAsync(x => x.Id == studyHistoryDTO.Id);
            if (historyById == null)
            {
                return BadRequest("Eroare");
            }
            _appContext.StudyHistory.Remove(historyById);
            await _appContext.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

    }
}
