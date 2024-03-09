using System.Net;
using System.Runtime.CompilerServices;

namespace HW1.BL
{
    public class User
    {
        string firstName;
        string familyName;
        string email;
        string password;
        bool isAdmin;
        bool isActive;
        static List<User> users = new List<User>();

        public User() { }

        public User(string firstName, string familyName, string email, string password, bool isAdmin, bool isActive)
        {
            FirstName = firstName;
            FamilyName = familyName;
            Email = email;
            Password = password;
            IsAdmin = isAdmin;
            IsActive = isActive;
        }

        public string FirstName { get => firstName; set => firstName = value; }
        public string FamilyName { get => familyName; set => familyName = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public bool IsAdmin { get => isAdmin; set => isAdmin = value; }
        public bool IsActive { get => isActive; set => isActive = value; }

        public int Insert()
        {
            DBservices dbs = new DBservices();
            List<User> AllUsers = dbs.ReadUsers();
            //prevent case-insensitive when comparing strings
            string lowerCaseEmail = this.email.ToLower();
            if (AllUsers.Exists(user=>user.email == lowerCaseEmail)) //to check that a user is not sign with the same email
            {
                return -1;
            }
            return dbs.Insert(this);
        }

        public List<User> Read()
        {
            DBservices dbs = new DBservices();
            return dbs.ReadUsers();
        }

        public User UserLogin() {

            List<User> AllUsers = Read();
            User FindUserInList = AllUsers.Find(user => user.Email == this.Email && user.Password==this.Password);
            return FindUserInList;

        }

        public int UpdateUser()
        {
            DBservices dbs = new DBservices();
            return dbs.UpdateUser(this);

        }
    }

    
}
