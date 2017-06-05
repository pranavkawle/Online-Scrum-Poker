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
        [HttpGet("{roomName}")]
        public IEnumerable<Card> Get(string roomName)
        {
            var room = _context.Rooms.SingleOrDefault(r => r.RoomName == roomName);
            if(room != null)
            {
                return _context.Cards.Where(c => c.Complexity <= room.MaximumComplexity);
            }

            return null;
        }

        // POST api/cards
        [HttpPost]
        public void Post([FromBody]Card card)
        {
            new NotImplementedException();
        }

        // PUT api/cards/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Card card)
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
