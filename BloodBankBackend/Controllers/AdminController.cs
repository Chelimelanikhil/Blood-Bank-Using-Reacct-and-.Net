using BloodBankkkk.DTO;
using BloodBankkkk.Manager;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BloodBankkkk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AdminController(IConfiguration configuration)
        {
            _configuration = configuration;
        }




        [HttpGet]
        [Route("GetAllRequests")]
        public IActionResult GetAllRequests()
        {
            try
            {
                var adminMgr = new AdminMgr(_configuration);
                var allRequests = adminMgr.GetAllRequests();
                return Ok(new { AllData = allRequests });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while retrieving all data: {ex.Message}" });
            }
        }


        [HttpGet]
        [Route("GetAllDonations")]
        public IActionResult GetAllDonations()
        {
            try
            {
                var adminMgr = new AdminMgr(_configuration);
                var allDonations = adminMgr.GetAllDonations();
                return Ok(new { AllData = allDonations });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while retrieving all data: {ex.Message}" });
            }
        }

        [HttpGet]
        [Route("GetAllBloodGroupUnits")]
        public IActionResult GetAllBloodGroupUnits()
        {
            try
            {
                var adminMgr = new AdminMgr(_configuration);
                var allBloodGroups = adminMgr.GetAllBloodGroups();
                return Ok(new { AllData = allBloodGroups });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while retrieving all data: {ex.Message}" });
            }
        }


        [HttpPost]
        [Route("AdjustBloodUnits")]
        public IActionResult AdjustBloodUnits(string bloodGroup, int adjustment)
        {
            try
            {
                var adminMgr = new AdminMgr(_configuration);
                string message = adminMgr.AdjustBloodUnits(bloodGroup, adjustment);
                if (message == "Blood units adjusted successfully.")
                {
                    return Ok(message);
                }
                else
                {
                    return BadRequest(new { Message = message });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while adjusting blood units: {ex.Message}" });
            }
        }





        [HttpPut]
        [Route("ApproveDonation")]
        public IActionResult ApproveDonation( int id)
        {
            try
            {
                var adminMgr = new AdminMgr(_configuration);
                adminMgr.ApproveDonation(id);
                return Ok("Donation Approved Succesfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while adjusting blood units: {ex.Message}" });
            }
        }



        [HttpPut]
        [Route("RejectDonation")]
        public IActionResult RejectDonation(int id)
        {
            try
            {
                var adminMgr = new AdminMgr(_configuration);
                adminMgr.RejectDonation(id);
                return Ok("Donation Rejected Succesfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while adjusting blood units: {ex.Message}" });
            }
        }



        [HttpPut]
        [Route("ApproveRequest")]
        public IActionResult ApproveRequest(int id)
        {
            try
            {
                var adminMgr = new AdminMgr(_configuration);
                adminMgr.ApproveRequest(id);
                return Ok("Request Approved Succesfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while adjusting blood units: {ex.Message}" });
            }
        }



        [HttpPut]
        [Route("RejectRequest")]
        public IActionResult RejectRequest(int id)
        {
            try
            {
                var adminMgr = new AdminMgr(_configuration);
                adminMgr.RejectRequest(id);
                return Ok("Request Rejected Succesfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while adjusting blood units: {ex.Message}" });
            }
        }
    }
}
