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
    public class RefreshController : BaseController
    {
        public RefreshController(OsmContext context) :
            base(context)
        { }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{name}")]
        public RefreshModel Get(string name)
        {
            var room = _context.Rooms.SingleOrDefault(r => r.RoomName.Equals(name));
            if (room != null)
            {
                return new RefreshModel
                {
                    Members = _context.Members.Where(m => m.RoomId == room.Id),
                    IsRevealed = room.IsRevealed
                };
            }

            return null;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
