﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Osm.Server.Models
{
    public class Card
    {
        public int Id { get; set; }
        public string Value { get; set; }
        public decimal Complexity { get; set; }
    }
}
