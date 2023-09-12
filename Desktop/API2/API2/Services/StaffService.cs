using API2.Models;
using API2.Models.Dto.Staff;
using API2.Models.Validation.Staff;
using Swashbuckle.Swagger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;

namespace API2.Services
{
    public interface IStaffService
    {
        List<Staff> GetAllStaff();
        Staff GetStaff(int id);
        int CreateStaff(CreateStaffDto createStaffDto);
        bool EditStaff(int id,DetailStaffDto detailStaffDto);
        bool DeleteStaff(int id);
    }
    public class StaffService : IStaffService
    {
        private  StaffManagementEntities _db;
        public StaffService()
        {
            _db = new StaffManagementEntities();
        }
        public int CreateStaff(CreateStaffDto createStaffDto)
        {
            var staff = AutoMapper.Mapper.Map<Staff>(createStaffDto);
            _db.Staffs.Add(staff);
            if (_db.SaveChanges() > 0)
            {
                return staff.Id;
            }
            else
            {
                return 0;
            }
        }

        public bool DeleteStaff(int id)
        {
            var staff = _db.Staffs.FirstOrDefault(x => x.Id == id);
            if(staff== null)
            {
                throw new HttpResponseException(System.Net.HttpStatusCode.NotFound);
            }
            _db.Staffs.Remove(staff);
            return _db.SaveChanges() > 0;
        }

        public bool EditStaff(int id,DetailStaffDto detailStaffDto)
        {
            //var staff = AutoMapper.Mapper.Map<DetailStaffDto>(detailStaffDto);
            var staff = _db.Staffs.FirstOrDefault(x => x.Id == id);
            if(staff == null)
            {
                return false;
            }
            else
            {
                 AutoMapper.Mapper.Map(detailStaffDto,staff);
            }
            return _db.SaveChanges() > 0;
        }

        public List<Staff> GetAllStaff()
        {
            return _db.Staffs.ToList();
        }

        public Staff GetStaff(int id)
        {
            var staff = _db.Staffs.FirstOrDefault(x => x.Id == id);
            return staff;
        }
    }
}
