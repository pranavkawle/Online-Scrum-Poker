using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Osm.Server.Models;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Osm.Server.Controllers
{
    [Route("api/[controller]")]
    public class RoomsController : BaseController
    {
        public RoomsController(OsmContext context) :
            base(context)
        { }

        // GET: api/rooms
        [HttpGet]
        public IEnumerable<Room> Get()
        {
            return _context.Rooms.ToList();
        }

        // GET api/rooms/5
        [HttpGet("{name}")]
        public Room Get(string name)
        {
            return _context.Rooms.SingleOrDefault(r => r.RoomName.Equals(name));
        }

        // POST api/rooms
        [HttpPost("{id}")]
        public JsonResult Post(int id, [FromBody]Room room)
        {
            if (id > 0 && room != null)
            {
                room.OwnerId = id;
                room.RoomName = RandomStringGenerator.Generate();
                _context.Rooms.Add(room);
                _context.SaveChanges();
                var member = _context.Members.Find(id);
                member.RoomId = room.Id;
                _context.SaveChanges();
            }

            return Json(room);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody]Room model)
        {
            if(id > 0 && model != null)
            {
                var room = _context.Rooms.Find(id);
                if(!model.IsRevealed)
                {
                    foreach (var member in _context.Members.Where(m => m.RoomId == id))
                    {
                        member.CardId = null;
                    }
                }

                room.IsRevealed = model.IsRevealed;
                _context.SaveChanges();

                return true;
            }

            return false;
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            if (id > 0)
            {
                //Remove all members from room
                var members = _context.Members.Where(m => m.RoomId == id);
                _context.Members.RemoveRange(members);

                //Then remove room
                var room = _context.Rooms.Find(id);
                if (room != null)
                {
                    _context.Rooms.Remove(room);
                    _context.SaveChanges(); 
                }
            }
        }
    }
}
