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
        [HttpGet("{id}")]
        public Room Get(int id)
        {
            return _context.Rooms.Find(id);
        }

        // POST api/values
        [HttpPost]
        public int Post([FromBody]Room room)
        {
            if (room != null)
            {
                _context.Rooms.Add(room);
                _context.SaveChanges();
            }

            return room.Id;
        }

        // POST api/rooms/joinroom/1/2
        [HttpPost("{roomId}/{memberId}")]
        public void JoinRoom(int roomId, int memberId)
        {
            if (roomId > 0 && memberId > 0)
            {
                var member = _context.Members.Find(memberId);
                member.RoomId = roomId;
                _context.SaveChanges();
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Room room)
        {
            throw new NotImplementedException();
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
                _context.Rooms.Remove(_context.Rooms.Find(id));
                _context.SaveChanges();
            }
        }
    }
}
