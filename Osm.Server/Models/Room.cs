using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Osm.Server.Models
{
    public class Room
    {
        [Key]
        public int Id { get; set; }
        public string RoomName { get; set; }
        public string Passphrase { get; set; }
        public bool IsOpen {
            get
            {
                return string.IsNullOrWhiteSpace(Passphrase);
            }
        }
        public int MaximumComplexity { get; set; }
        public int OwnerId { get; set; }

        public ICollection<Member> Members { get; set; }
    }
}
