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
    public class JoinRoomController : BaseController
    {
        public JoinRoomController(OsmContext context) :
            base(context)
        { }

        // GET: api/joinroom
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/joinroom/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return null;
        }

        //[HttpGet("{name}")]
        //public IObservable<Member> Get(string name)
        //{
        //    var room = _context.Rooms.SingleOrDefault(r => r.RoomName.Equals(name));
        //    if (room != null)
        //    {
        //        return Observable.Create<Member>(observer => Scheduler.Default.Schedule(async () =>
        //        {
        //            var result = await _context.Members.Where(m => m.RoomId == room.Id).ToListAsync();
        //            foreach (var member in result)
        //            {
        //                observer.OnNext(member);
        //            }
        //            observer.OnCompleted();
        //        }));
        //        //return _context.Members.Where(m => m.RoomId == room.Id).ToObservable();
        //    }

        //    return null;
        //}

        // POST api/joinroom
        [HttpPost("{id}")]
        public int Post(int id, [FromBody]Room model)
        {
            if (id > 0 && model != null)
            {
                var member = _context.Members.Find(id);

                var room = _context.Rooms.SingleOrDefault(r => r.RoomName.Equals(model.RoomName) &&
                (string.IsNullOrWhiteSpace(r.Passphrase) ? true : r.Passphrase == model.Passphrase));
                if (room != null)
                {
                    model.Id = member.RoomId = room.Id;
                    room.Passphrase = model.Passphrase;
                    room.RoomName = model.RoomName;
                    _context.SaveChanges();
                }
            }

            return model.Id;
        }

        // PUT api/joinroom/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/joinroom/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
