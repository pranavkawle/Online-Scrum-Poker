using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Osm.Server.Models;

namespace Osm.Server.Controllers
{
    [Route("api/[controller]")]
    public class MembersController : BaseController
    {
        public MembersController(OsmContext context):
            base(context)
        {

        }
        // GET api/members/GetMembers/
        [HttpGet("{id}")]
        public IEnumerable<Member> GetMembers(int id)
        {
            return _context.Members.Where(m => m.RoomId == id);
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
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Member member)
        {
            if (id > 0 && member != null)
            {
                var oldMember = _context.Members.Find(id);
                oldMember.RoomId = member.RoomId;
                _context.SaveChanges(); 
            }
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
