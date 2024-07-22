using BloodBankkkk.DTO;
using Dapper;

using System.Data;
using System.Data.SqlClient;

namespace BloodBankkkk.DAO
{
    public class UsersDAO
    {
        private readonly IConfiguration _configuration;
        static string connectionString = ConnectionString.DefaultConnection;
        private IDbConnection _connection = new SqlConnection(connectionString);

        public UsersDAO(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void InsertUser(Users user)
        {
            try
            {
                using IDbConnection connection = _connection;
                {
                    // Hash the password before insertion
                    string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);

                    string sqlQuery = @"
                        INSERT INTO Users (user_type, username, password, email, full_name, age, blood_group, address, mobile, disease, profile_pic, created_at)
                        VALUES (@user_Type, @Username, @Password, @Email, @FullName, @Age, @BloodGroup, @Address, @Mobile, @Disease, @ProfilePic, @CreatedAt);
                    ";

                    connection.Execute(sqlQuery, new
                    {
                        user_Type = user.user_Type,
                        Username = user.Username,
                        Password = hashedPassword,
                        Email = user.Email,
                        FullName = user.full_name,
                        Age = user.Age,
                        BloodGroup = user.blood_group,
                        Address = user.address,
                        Mobile = user.mobile,
                        Disease = user.disease,
                        ProfilePic = user.ProfilePic,
                        CreatedAt = DateTime.Now
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                // Handle the exception as needed
            }
        }

        public LoginRequest Login(LoginRequest loginRequest)
        {
            try
            {
                using IDbConnection connection = _connection;
                {
                    string sqlQuery = @"
                SELECT * FROM Users WHERE username = @Username;
            ";

                    var user = connection.QueryFirstOrDefault<LoginRequest>(sqlQuery, new { Username = loginRequest.Username });
                    if (user != null && BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
                    {
                        return user;
                    }
                    else
                    {
                        return null; // Invalid username or password
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return null; // Handle the exception as needed
            }
        }



        public List<Users> GetUsers()
        {
            List<Users> users = new List<Users>();
            try
            {
                using IDbConnection connection = _connection;
                {
                    string sqlQuery = @"
                        SELECT * FROM Users 
                    ";

                    users = connection.Query<Users>(sqlQuery).ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                // Handle the exception as needed
            }
            return users;
        }


    }
}
