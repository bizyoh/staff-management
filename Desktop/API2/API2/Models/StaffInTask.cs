//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace API2.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class StaffInTask
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public int TaskId { get; set; }
    
        public virtual Staff Staff { get; set; }
        public virtual Task Task { get; set; }
    }
}