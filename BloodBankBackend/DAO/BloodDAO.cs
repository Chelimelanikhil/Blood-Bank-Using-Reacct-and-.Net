using BloodBankkkk.DTO;
using Dapper;
using System;
using System.Data;
using System.Data.SqlClient;

namespace BloodBankkkk.DAO
{
    public class BloodDAO
    {
        private readonly IConfiguration _configuration;
        static string connectionString = ConnectionString.DefaultConnection;
        private IDbConnection _connection = new SqlConnection(connectionString);

        public BloodDAO(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void InsertBloodDonation(BloodDonation donation)
        {
            try
            {
                using IDbConnection connection = _connection;
                {
                    string sqlQuery = @"
                        INSERT INTO BloodDonation (user_id, donor_name, donor_age, blood_group, unit, date, status)
                        VALUES (@UserId, @DonorName, @DonorAge, @BloodGroup, @Unit, @DonationDate, @Status);
                    ";

                    connection.Execute(sqlQuery, new
                    {
                        UserId = donation.user_id,
                        DonorName = donation.donor_name,
                        DonorAge = donation.donor_age,
                        BloodGroup = donation.blood_group,
                        Unit = donation.Unit,
                        DonationDate = donation.date,
                        Status = donation.status
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                // Handle the exception as needed
            }
        }

        public void InsertBloodRequest(BloodRequest request)
        {
            try
            {
                using IDbConnection connection = _connection;
                {
                    string sqlQuery = @"
                        INSERT INTO BloodRequest (user_id, patient_name, patient_age, reason, blood_group, unit, date, status)
                        VALUES (@UserId, @PatientName, @PatientAge, @Reason, @BloodGroup, @Unit, @RequestDate, 'Pending');
                    ";

                    connection.Execute(sqlQuery, new
                    {
                        UserId = request.user_id,
                        PatientName = request.patient_name,
                        PatientAge = request.patient_age,
                        Reason = request.reason,
                        BloodGroup = request.blood_group,
                        Unit = request.Unit,
                        RequestDate = request.date,
                        Status = request.status
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                // Handle the exception as needed
            }
        }



        public List<BloodDonation> GetDonationsByUserId(int userId)
        {
            List<BloodDonation> donations = new List<BloodDonation>();
            try
            {
                using IDbConnection connection = _connection;
                {
                    string sqlQuery = @"
                        SELECT * FROM BloodDonation WHERE user_id = @UserId;
                    ";

                    donations = connection.Query<BloodDonation>(sqlQuery, new { UserId = userId }).ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                // Handle the exception as needed
            }
            return donations;
        }



        public List<BloodRequest> GetRequestsByUserId(int userId)
        {
            List<BloodRequest> requests = new List<BloodRequest>();
            try
            {
                using IDbConnection connection = _connection;
                {
                    string sqlQuery = @"
                        SELECT * FROM BloodRequest WHERE user_id = @UserId;
                    ";

                    requests = connection.Query<BloodRequest>(sqlQuery, new { UserId = userId }).ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                // Handle the exception as needed
            }
            return requests;
        }
    }
}
