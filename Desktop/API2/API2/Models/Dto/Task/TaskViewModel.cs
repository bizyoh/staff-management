using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API2.Models.Dto.Task
{
    public class TaskViewModel
    {
        public int Id { get; set; }
        public Nullable<int> ParentId { get; set; }
        public string Label { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<int> Duration { get; set; }
        public Nullable<decimal> Progress { get; set; }
        public Nullable<bool> IsUnscheduled { get; set; }
        public List<int> StaffIds { get; set; }
    }
}
