using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Osm.Server.Models
{
    public class Member
    {
        public int Id { get; set; }
        public int RoomId { get; set; }
        public string Name { get; set; }
        public int CardId { get; set; }
    }
}
