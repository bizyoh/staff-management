using API2.Models.Dto.Staff;
using API2.Models.Validation.Staff;
using API2.Services;
using FluentValidation;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;

namespace API2.Controllers
{
    public class StaffController : BaseController
    {
        private readonly IStaffService _staffService;
        public StaffController()
        {
            _staffService = new StaffService();
        }


        [HttpGet]

        public IHttpActionResult Staff()
        {
            var staffs = _staffService.GetAllStaff();
            return Ok(staffs);
        }
        [HttpPost]   
        
        public IHttpActionResult Staff(CreateStaffDto createStaffDto)
        {
            CreateStaffDtoValidation staffValidation = new CreateStaffDtoValidation();
            ValidationResult result = staffValidation.Validate(createStaffDto);
            int rs = _staffService.CreateStaff(createStaffDto);
            if (rs>0)
            {
                return Ok(rs);
            }
            else return BadRequest();

        }
        [HttpGet]

        public IHttpActionResult Staff(int Id)
        {
            if(Id<= 0)
            {
                return BadRequest();
            }
            var staff = _staffService.GetStaff(Id);
            if(staff == null)
            {
                return NotFound();
            }
            else return Ok(staff);

        }
        [HttpDelete]

        public IHttpActionResult DeleteStaff(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
           
            if (!_staffService.DeleteStaff(id))
            {
                return BadRequest();
            }
            else return Ok();

        }
        [HttpPut]

        public IHttpActionResult Staff(int id,DetailStaffDto detailStaffDto)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            var rs = _staffService.EditStaff(id,detailStaffDto);
            if (!rs)
            {
                return BadRequest();
            }
            else return Ok(rs);

        }
    }
}
