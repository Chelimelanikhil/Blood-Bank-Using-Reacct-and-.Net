using BloodBankkkk.DAO;
using BloodBankkkk.DTO;

using System.Data;
using System.Data.SqlClient;

namespace BloodBankkkk.Manager
{
    public class UsersMgr
    {

        private readonly IConfiguration _configuration;
        static string connectionString = ConnectionString.DefaultConnection;
        private IDbConnection _connection = new SqlConnection(connectionString);

        public UsersMgr(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void InsertUser(Users newUser)
        {
            UsersDAO usersDAO = new UsersDAO(_configuration);
            usersDAO.InsertUser(newUser);
        }


        public LoginRequest Login(LoginRequest newUser)
        {
            UsersDAO usersDAO = new UsersDAO(_configuration);
            return usersDAO.Login(newUser);
        }


        public IEnumerable<Users> GetUsers()
        {

            UsersDAO usersDAO = new UsersDAO(_configuration);
            return usersDAO.GetUsers();
        }


    }
}
