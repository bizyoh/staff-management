using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API2.Models.Dto.Task
{
    public class CreateTaskDto
    {
        public Nullable<int> ParentId { get; set; }
        public string Label { get; set; }
        public Nullable<int> Type { get; set; }
        public string Name { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<int> Duration { get; set; }
        public string Progress { get; set; }
        public Nullable<bool> IsUnscheduled { get; set; }

    }
}