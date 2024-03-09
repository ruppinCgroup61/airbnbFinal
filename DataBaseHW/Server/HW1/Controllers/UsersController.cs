using HW1.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HW1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET: api/<UsersController>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            User user = new User();
            return user.Read();
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UsersController>
        [HttpPost]
        public int Post([FromBody] User user)
        {
            int NumberOfInsert= user.Insert();
            return NumberOfInsert;
        }

        // POST api/<UsersController>
        [HttpPost]
        [Route("login")]
        public User Login([FromBody] User u)
        {
            return u.UserLogin();
        }

        // PUT api/<UsersController>/5
        [HttpPut("{email}")]
        public int Put([FromBody] User u)
        {
            return u.UpdateUser();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
