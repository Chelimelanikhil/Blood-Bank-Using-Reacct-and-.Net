
using BloodBankkkk.DTO;
using BloodBankkkk.Manager;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BloodBankkkk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Register")]
        public IActionResult RegisterUser([FromBody] Users newUser)
        {
            if (newUser == null)
            {
                return BadRequest(new { Message = "Invalid data provided for user registration." });
            }

            try
            {
                var userManager = new UsersMgr(_configuration);
                userManager.InsertUser(newUser);
                return Ok(new { Message = "User registered successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while registering the user: {ex.Message}" });
            }
        }

           [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                var userManager = new UsersMgr(_configuration);
                var user = userManager.Login(loginRequest);
                if (user != null)
                {
                    return Ok(new { Message = "Login successful.", User = user });
                }
                else
                {
                    return Ok(new { Message = "Invalid username or password." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while processing the login request: {ex.Message}" });
            }
        }



        [HttpGet]
        [Route("Users")]
        public IActionResult AllUser()
        {

            try
            {
                var userManager = new UsersMgr(_configuration);
                var allusers = userManager.GetUsers();
                return Ok(new { AllUsers = allusers });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"An error occurred while registering the user: {ex.Message}" });
            }
        }
    }
}
