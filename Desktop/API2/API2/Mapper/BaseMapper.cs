using API2.Models;
using API2.Models.Dto.Staff;
using API2.Models.Dto.Task;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API2.Mapper
{
    public class BaseMapper : Profile
    {
        public BaseMapper()
        {
            #region Staff
            CreateMap<CreateStaffDto, Staff>();
            CreateMap<DetailStaffDto, Staff>();
            #endregion
            #region Task
            CreateMap<CreateTaskDto, Task>();
            CreateMap<DetailTaskDto, Task>();
            #endregion
        }
    }
}