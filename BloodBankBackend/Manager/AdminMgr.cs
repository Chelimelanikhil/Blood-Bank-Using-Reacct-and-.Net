using BloodBankkkk.DAO;
using BloodBankkkk.DTO;
using System.Data;
using System.Data.SqlClient;

namespace BloodBankkkk.Manager
{
    public class AdminMgr
    {
        private readonly IConfiguration _configuration;
        static string connectionString = ConnectionString.DefaultConnection;
        private IDbConnection _connection = new SqlConnection(connectionString);
        public AdminMgr(IConfiguration configuration)
        {
            _configuration = configuration;
        }



        public IEnumerable<BloodRequest> GetAllRequests()
        {
            AdminDAO bloodDAO = new AdminDAO(_configuration);
            return bloodDAO.GetRequests();
        }

        public IEnumerable<BloodDonation> GetAllDonations()
        {
            AdminDAO bloodDAO = new AdminDAO(_configuration);
            return bloodDAO.GetDonations();
        }
        public IEnumerable<BloodGroups> GetAllBloodGroups()
        {
            AdminDAO bloodDAO = new AdminDAO(_configuration);
            return bloodDAO.GetAllBloodGroups();
        }
        public string AdjustBloodUnits(string bloodGroup, int adjustment)
        {
            AdminDAO bloodDAO = new AdminDAO(_configuration);
            return bloodDAO.AdjustBloodUnits(bloodGroup, adjustment);
        }

        public void ApproveDonation(int id)
        {
            AdminDAO bloodDAO = new AdminDAO(_configuration);
            bloodDAO.ApproveDonation(id);
        }
        public void RejectDonation(int id)
        {
            AdminDAO bloodDAO = new AdminDAO(_configuration);
            bloodDAO.RejectDonation(id);
        }

        public void ApproveRequest(int id)
        {
            AdminDAO bloodDAO = new AdminDAO(_configuration);
            bloodDAO.ApproveRequest(id);
        }
        public void RejectRequest(int id)
        {
            AdminDAO bloodDAO = new AdminDAO(_configuration);
            bloodDAO.RejectRequest(id);
        }
    }
}
