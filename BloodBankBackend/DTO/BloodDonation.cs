namespace BloodBankkkk.DTO
{
    public class BloodDonation
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public string donor_name { get; set; }
        public int donor_age { get; set; }
        public string blood_group { get; set; }
        public int Unit { get; set; }
        public DateTime date { get; set; }
        public string status { get; set; } = "Pending";
    }

}
