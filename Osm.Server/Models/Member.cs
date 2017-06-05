using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Osm.Server.Models
{
    public class Member
    {
        [Key]
        public int Id { get; set; }
        public int RoomId { get; set; }
        public string Name { get; set; }
        public int? CardId { get; set; }

        public Room Room { get; set; }
    }
}
