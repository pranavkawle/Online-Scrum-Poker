using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Osm.Server.Models
{
    public class RefreshModel
    {
        public IEnumerable<Member> Members { get; set; }
        public bool IsRevealed { get; set; }
    }
}
