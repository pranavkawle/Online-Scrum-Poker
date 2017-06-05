using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Osm.Server.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Osm.Server.Controllers
{
    [Route("api/[controller]")]
    public class CardsController : BaseController
    {
        public CardsController(OsmContext context):
            base(context)
        { }

        // GET: api/cards
        [HttpGet]
        public IEnumerable<Card> Get()
        {
            return _context.Cards;
        }

        // GET api/cards/5
        [HttpGet("{maxComplexity}")]
        public IEnumerable<Card> Get(short maxComplexity)
        {
            return _context.Cards.Where(c => Convert.ToInt16(c.Complexity) <= maxComplexity);
        }

        // POST api/cards
        [HttpPost]
        public void Post([FromBody]string value)
        {
            new NotImplementedException();
        }

        // PUT api/cards/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
            new NotImplementedException();
        }

        // DELETE api/cards/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            new NotImplementedException();
        }
    }
}
