using BloodBankkkk.DAO;
using BloodBankkkk.DTO;
using System.Data;
using System.Data.SqlClient;

namespace BloodBankkkk.Manager
{
    public class BloodMgr
    {
        private readonly IConfiguration _configuration;
        static string connectionString = ConnectionString.DefaultConnection;
        private IDbConnection _connection = new SqlConnection(connectionString);

        public BloodMgr(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void InsertBloodDonation(BloodDonation donation)
        {
            BloodDAO bloodDAO = new BloodDAO(_configuration);
            bloodDAO.InsertBloodDonation(donation);
        }

        public void InsertBloodRequest(BloodRequest request)
        {
            BloodDAO bloodDAO = new BloodDAO(_configuration);
            bloodDAO.InsertBloodRequest(request);
        }

        public IEnumerable<BloodDonation> GetUserDonations(int userId)
        {
            BloodDAO bloodDAO = new BloodDAO(_configuration);
            return bloodDAO.GetDonationsByUserId(userId);
        }

        public IEnumerable<BloodRequest> GetUserRequests(int userId)
        {
            BloodDAO bloodDAO = new BloodDAO(_configuration);
            return bloodDAO.GetRequestsByUserId(userId);
        }
    }
}
