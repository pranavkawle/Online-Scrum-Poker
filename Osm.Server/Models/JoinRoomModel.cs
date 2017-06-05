using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Osm.Server.Models
{
    public class JoinRoomModel
    {
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public int MemberId { get; set; }
        public string Passphrase { get; set; }
    }
}
