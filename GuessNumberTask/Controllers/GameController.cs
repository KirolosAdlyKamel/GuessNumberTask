using GuessNumberTask.Data;
using GuessNumberTask.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GuessNumber.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GameController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GameController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("bestscore")]
        public IActionResult GetBestScore()
        {
            // احصل على اسم المستخدم من الـ JWT Claim
            var username = User.FindFirstValue(ClaimTypes.Name);
            if (string.IsNullOrEmpty(username))
                return Unauthorized("Invalid token: missing username claim.");

            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null)
                return NotFound("User not found.");

            return Ok(user.BestScore);
        }

        [HttpPost("bestscore")]
        public IActionResult SaveBestScore([FromBody] BestScoreDto dto)
        {
            if (dto == null)
                return BadRequest("Score is required.");

            var username = User.FindFirstValue(ClaimTypes.Name);
            if (string.IsNullOrEmpty(username))
                return Unauthorized("Invalid token: missing username claim.");

            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null)
                return NotFound("User not found.");

            if (user.BestScore == null || dto.Score < user.BestScore)
            {
                user.BestScore = dto.Score;
                _context.SaveChanges();
            }

            return Ok(user.BestScore);
        }
    }

    public class BestScoreDto
    {
        public int Score { get; set; }
    }
}
