using BloodBankkkk.DTO;
using Dapper;
using System;
using System.Data;
using System.Data.SqlClient;

namespace BloodBankkkk.DAO
{
    public class AdminDAO
    {

        private readonly IConfiguration _configuration;
        static string connectionString = ConnectionString.DefaultConnection;
        private IDbConnection _connection = new SqlConnection(connectionString);

        public AdminDAO(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public List<BloodDonation> GetDonations()
        {
            List<BloodDonation> donations = new List<BloodDonation>();
            try
            {
                using IDbConnection connection = _connection;
                {
                    string sqlQuery = @"
                        SELECT * FROM BloodDonation;
                    ";

                    donations = connection.Query<BloodDonation>(sqlQuery).ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                // Handle the exception as needed
            }
            return donations;
        }



        public List<BloodGroups> GetAllBloodGroups()
        {
            List<BloodGroups> bloodrequests = new List<BloodGroups>();
            try
            {
                using IDbConnection connection = _connection;
                {
                    string sqlQuery = @"
                        SELECT * FROM BloodGroupUnits;
                    ";

                    bloodrequests = connection.Query<BloodGroups>(sqlQuery).ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                // Handle the exception as needed
            }
            return bloodrequests;
        }


        public List<BloodRequest> GetRequests()
        {
            List<BloodRequest> requests = new List<BloodRequest>();
            try
            {
                using IDbConnection connection = _connection;
                {
                    string sqlQuery = @"
                        SELECT * FROM BloodRequest;
                    ";

                    requests = connection.Query<BloodRequest>(sqlQuery).ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                // Handle the exception as needed
            }
            return requests;
        }


        //public void AdjustBloodUnits(string bloodGroup, int adjustment)
        //{
        //    try
        //    {
        //        using (IDbConnection connection = _connection)
        //        {
        //            string sqlQuery = @"
        //        UPDATE BloodGroupUnits 
        //        SET Units = Units + @Adjustment,
        //        last_updated = CURRENT_TIMESTAMP 
        //        WHERE BloodGroup = @BloodGroup;
        //    ";
        //            connection.Execute(sqlQuery, new { Adjustment = adjustment, BloodGroup = bloodGroup });
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Error: {ex.Message}");
        //        // Log the exception or handle it appropriately
        //    }
        //}
        public string AdjustBloodUnits(string bloodGroup, int adjustment)
        {
            try
            {
                using (IDbConnection connection = _connection)
                {
                    // Fetch current units for the blood group
                    string selectQuery = @"
                SELECT Units
                FROM BloodGroupUnits
                WHERE BloodGroup = @BloodGroup;
            ";
                    int currentUnits = connection.ExecuteScalar<int>(selectQuery, new { BloodGroup = bloodGroup });

                    // Check if adjustment is valid (resulting units should not be negative)
                    if (currentUnits + adjustment >= 0)
                    {
                        string sqlQuery = @"
                    UPDATE BloodGroupUnits 
                    SET Units = Units + @Adjustment,
                    last_updated = CURRENT_TIMESTAMP 
                    WHERE BloodGroup = @BloodGroup;
                ";
                        connection.Execute(sqlQuery, new { Adjustment = adjustment, BloodGroup = bloodGroup });
                        return "Blood units adjusted successfully.";
                    }
                    else
                    {
                        return "Stock not available.";
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public void ApproveDonation(int id)
        {
            try
            {
                using (IDbConnection connection = _connection)
                {
                    string sqlQuery = @"
                update BloodDonation
set status='Approved'
where id=@Id;
            ";
                    connection.Execute(sqlQuery, new { Id=id });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                // Log the exception or handle it appropriately
            }
        }


        public void RejectDonation(int id)
        {
            try
            {
                using (IDbConnection connection = _connection)
                {
                    string sqlQuery = @"
                update BloodDonation
set status='Rejected'
where id=@Id;
            ";
                    connection.Execute(sqlQuery, new { Id = id });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                // Log the exception or handle it appropriately
            }
        }



        public void ApproveRequest(int id)
        {
            try
            {
                using (IDbConnection connection = _connection)
                {
                    string sqlQuery = @"
                update BloodRequest
set status='Approved'
where id=@Id;
            ";
                    connection.Execute(sqlQuery, new { Id = id });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                // Log the exception or handle it appropriately
            }
        }


        public void RejectRequest(int id)
        {
            try
            {
                using (IDbConnection connection = _connection)
                {
                    string sqlQuery = @"
                update BloodRequest
set status='Rejected'
where id=@Id;
            ";
                    connection.Execute(sqlQuery, new { Id = id });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                // Log the exception or handle it appropriately
            }
        }

    }
}
