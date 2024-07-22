namespace BloodBankkkk.DTO
{
    public class BloodRequest
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public string patient_name { get; set; }
        public int patient_age { get; set; }
        public string blood_group { get; set; }
        public int Unit { get; set; }
        public string reason { get; set; }
        public DateTime date { get; set; }
        public string status { get; set; } = "Pending";
    }

}
