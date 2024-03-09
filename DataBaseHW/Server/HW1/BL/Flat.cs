namespace HW1.BN
{
    public class Flat
    {
        int id;
        string city;
        string address;
        double price;
        int numbers_of_rooms;
        static List<Flat> FlatsList = new List<Flat>();

        public Flat(int id, string city, string address, double price, int numbers_of_rooms)
        {
            Id = -1; //get id from database
            City = city;
            Address = address;
            Price = price;
            Numbers_of_rooms = numbers_of_rooms;
        }

        public int Id { get => id; set => id = value; }
        public string City { get => city; set => city = value; }
        public string Address { get => address; set => address = value; }
        public int Numbers_of_rooms { get => numbers_of_rooms; set => numbers_of_rooms = value; }
        public double Price
        {
            get { return price; }
            set { price = Discount(value); }
        }

        public Flat() { }

        public double Discount(double value)
        {
            double UpdatedPrice;
            if (Numbers_of_rooms > 1 && value > 100)
            {
                UpdatedPrice = value * 0.9;
            }
            else
            {
                UpdatedPrice = value;
            }
            return UpdatedPrice;
        }

        public int Insert()
        {
            DBservices dbs= new DBservices();

            return dbs.Insert(this);

        }

        public static List<Flat> Read() {
            DBservices dbs= new DBservices();

            return dbs.ReadFlats();
        }

        public List<Flat> GetFlatByCityAndPrice(string city, double price)
        {
            List<Flat> selectedList = new List<Flat>();
            foreach (Flat f in FlatsList)
            {
                if (f.city == city && f.price < price)
                    selectedList.Add(f);
            }
            return selectedList;
        }

    }
}
