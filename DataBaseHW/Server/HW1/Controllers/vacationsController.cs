using HW1.BL;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HW1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class vacationsController : ControllerBase
    {
        // GET: api/<vacationsController>
        [HttpGet]
        public IEnumerable<Vacation> Get()
        {
           
            return Vacation.Read();
        }

        // GET api/<vacationsController>/5
        [HttpGet("getByDates/startDate/endDate")]
        public IEnumerable<Vacation> GetBystartDateAndendDateRuoting(DateTime StartD, DateTime EndD)
        {
            Vacation vac = new Vacation();
            return vac.GetBystartDateAndendDateRuoting(StartD,EndD);

        }

        // GET api/<vacationsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<vacationsController>
        [HttpPost]
        public bool Post([FromBody] Vacation vacation)
        {
            return vacation.Insert();

        }

        // PUT api/<vacationsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        ////avgPricePerNightAndMonth
        [HttpGet("averagePrice")]
        public object GetAvgPriceByCityAndMonth(int month)
        {
            DBservices dbs = new DBservices();

            List<object> avgPrices = dbs.ReadAvgPricePerNight(month);

            return avgPrices;
        }

        // DELETE api/<vacationsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
