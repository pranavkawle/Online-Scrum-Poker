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
                int complexity1 = 1;
                int complexity2 = 2;
                int maxComplexity = 100;
                int id = 1;

                while (complexity1 <= maxComplexity)
                {
                    _context.Cards.Add(new Card { Id = id++, Complexity = complexity1.ToString() });
                    var temp = complexity2;
                    complexity2 += complexity1;
                    complexity1 = temp;
                }
                _context.Cards.Add(new Card { Id = id++, Complexity = "?" });
                _context.SaveChanges();
            }
        }
    }
}
