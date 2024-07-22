namespace BloodBankkkk.DTO
{
    public class Users
    {
        public int Id { get; set; }
        public string user_Type { get; set; } // Possible values: Admin, Donor, Patient
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string full_name { get; set; }
        public int Age { get; set; }
        public string blood_group { get; set; } // A+, B-, etc.
        public string address { get; set; }
        public string mobile { get; set; }
        public string disease { get; set; }
        public string ProfilePic { get; set; }
        public DateTime created_at { get; set; }
    }

}
