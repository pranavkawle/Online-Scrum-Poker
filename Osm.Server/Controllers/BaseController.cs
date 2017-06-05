using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Osm.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Osm.Server.Controllers
{
    public class BaseController: Controller
    {
        protected readonly OsmContext _context;

        public BaseController(OsmContext context)
        {
            _context = context;

            if (_context.Cards.Count() == 0)
            {
                var id = 1;
                _context.Cards.Add(new Card { Id = id++, Value = "0", Complexity = 0 });
                _context.Cards.Add(new Card { Id = id++, Value = "&#189;", Complexity = 0.5m });
                _context.Cards.Add(new Card { Id = id++, Value = "1", Complexity = 1 });
                _context.Cards.Add(new Card { Id = id++, Value = "2", Complexity = 2 });
                _context.Cards.Add(new Card { Id = id++, Value = "3", Complexity = 3 });
                _context.Cards.Add(new Card { Id = id++, Value = "5", Complexity = 5 });
                _context.Cards.Add(new Card { Id = id++, Value = "8", Complexity = 8 });
                _context.Cards.Add(new Card { Id = id++, Value = "13", Complexity = 13 });
                _context.Cards.Add(new Card { Id = id++, Value = "20", Complexity = 20 });
                _context.Cards.Add(new Card { Id = id++, Value = "40", Complexity = 40 });
                _context.Cards.Add(new Card { Id = id++, Value = "100", Complexity = 100 });
                _context.Cards.Add(new Card { Id = id++, Value = "?", Complexity = -1 });
                _context.Cards.Add(new Card { Id = id++, Value = "&#8734;", Complexity = -2 });
                _context.SaveChanges();
            }
        }
    }
}
