using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Osm.Server.Models;
using System.Net.Http;
using System.Net;

namespace Osm.Server.Controllers
{
    [Route("api/[controller]")]
    public class MembersController : BaseController
    {
        public MembersController(OsmContext context) :
            base(context)
        { }

        // GET api/members/GetMembers/
        [HttpGet]
        public HttpResponseMessage Get()
        {
            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }

        // GET api/members/5
        [HttpGet("{id}")]
        public Member Get(int id)
        {
            return _context.Members.Find(id);
        }

        // POST api/members
        [HttpPost]
        public int Post([FromBody]Member member)
        {
            if (member != null)
            {
                _context.Members.Add(member);
                _context.SaveChanges();
            }

            return member.Id;
        }

        // PUT api/members/5
        [HttpPut("{roomName}")]
        public bool Put(string roomName, [FromBody]Member model)
        {
            if (!string.IsNullOrWhiteSpace(roomName) && model != null)
            {
                var room = _context.Rooms.SingleOrDefault(r => r.RoomName.Equals(roomName));
                var member = _context.Members.Find(model.Id);
                if (room != null && member != null)
                {
                    member.RoomId = model.RoomId;
                    member.CardId = model.CardId;
                    _context.SaveChanges();
                }                
            }

            return true;
        }

        // DELETE api/members/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            if (id > 0)
            {
                _context.Members.Remove(_context.Members.Find(id));
                _context.SaveChanges();
            }
        }
    }
}
