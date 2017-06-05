using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Osm.Server.Models
{
    public class OsmContext: DbContext
    {
        public OsmContext(DbContextOptions<OsmContext> options)
            : base(options)
        { }

        public DbSet<Card> Cards { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Member> Members { get; set; }
    }
}
