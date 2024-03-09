
namespace HW1.BL
{
    public class Vacation
    {
        int id;
        string userEmail;
        int flatId;
        DateTime startDate;
        DateTime endDate;
        static List<Vacation> vacationsList = new List<Vacation>();

        public int Id { get => id; set => id = value; }
        public string UserEmail { get => userEmail; set => userEmail = value; }
        public int FlatId { get => flatId; set => flatId = value; }
        public DateTime StartDate { get => startDate; set => startDate = value; }
        public DateTime EndDate { get => endDate; set => endDate = value; }

        public Vacation() { }

        public Vacation(int id, string userEmail, int flatId, DateTime startDate, DateTime endDate)
        {
            Id = -1;
            UserEmail = userEmail;
            FlatId = flatId;
            StartDate = startDate;
            EndDate = endDate;
        }

        public bool Insert()
        {
            DBservices dbs = new DBservices();
            List<Vacation> AllVacations = dbs.ReadVacations();
                foreach (Vacation V in AllVacations)
                {

                    if (V.FlatId == this.FlatId)
                    {
                        //V.startDate=26.12,V.endDate=30.12 | this_SD=27.12 , this_ED=30.12 --> should retrun true
                        if (V.StartDate <= this.EndDate && V.EndDate >= this.StartDate)
                        {
                            return false;
                        }
                    }
                }
                dbs.Insert(this);
                return true;
        }

        public static List<Vacation> Read()
        {
            DBservices dBservices = new DBservices();
            return dBservices.ReadVacations();
        }

        public List<Vacation> GetBystartDateAndendDateRuoting(DateTime StartD, DateTime EndD)
        {
            List<Vacation> selectedList = new List<Vacation>();
            foreach (Vacation v in vacationsList)
            {
                if (v.StartDate >= StartD && v.EndDate <= EndD)
                    selectedList.Add(v);
            }
            return selectedList;
        }
    }
}
