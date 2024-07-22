using BloodBankkkk.DTO;
using BloodBankkkk.Manager;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BloodBankkkk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BloodController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public BloodController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Donate")]
        public IActionResult DonateBlood([FromBody] BloodDonation newDonation)
        {
            if (newDonation == null)
            {
                return BadRequest(new { Message = "Invalid data provided for blood donation." });
            }

            try
            {
                var bloodMgr = new BloodMgr(_configuration);
                bloodMgr.InsertBloodDonation(newDonation);
                return Ok(new { Message = "Blood donation recorded successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while recording the blood donation: {ex.Message}" });
            }
        }

        [HttpPost]
        [Route("Request")]
        public IActionResult RequestBlood([FromBody] BloodRequest newRequest)
        {
            if (newRequest == null)
            {
                return BadRequest(new { Message = "Invalid data provided for blood request." });
            }

            try
            {
                var bloodMgr = new BloodMgr(_configuration);
                bloodMgr.InsertBloodRequest(newRequest);
                return Ok(new { Message = "Blood request recorded successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while recording the blood request: {ex.Message}" });
            }
        }

        [HttpGet]
        [Route("UserDonations/{userId}")]
        public IActionResult GetUserDonations(int userId)
        {
            try
            {
                var bloodMgr = new BloodMgr(_configuration);
                var userDonations = bloodMgr.GetUserDonations(userId);
                return Ok(new { UserDonations = userDonations });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while retrieving user donations: {ex.Message}" });
            }
        }

        [HttpGet]
        [Route("UserRequests/{userId}")]
        public IActionResult GetUserRequests(int userId)
        {
            try
            {
                var bloodMgr = new BloodMgr(_configuration);
                var userRequests = bloodMgr.GetUserRequests(userId);
                return Ok(new { UserRequests = userRequests });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while retrieving user donations: {ex.Message}" });
            }
        }


    }
}
