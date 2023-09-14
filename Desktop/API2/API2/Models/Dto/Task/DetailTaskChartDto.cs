using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API2.Models.Dto.Task
{
    public class DetailTaskChartDto
    {
        public int id { get; set; }
        public string text { get; set; }
        public string start_date { get; set; }
        public int duration { get; set; }
        public decimal progress { get; set; }
        public int? parent { get; set; }
        public string type { get; set; }
        public bool open { get; set; }
    }
}