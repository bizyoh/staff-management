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
            CreateMap<TaskChartDto, Task>().ForMember(x => x.StartDate, z => z.MapFrom(y => DateTime.Parse(y.start_date))).ForMember(x => x.ParentId, z => z.MapFrom(y => y.parent))
                .ForMember(x => x.Name, z => z.MapFrom(y => y.text)).ForMember(x => x.Progress, z => z.MapFrom(y => y.progress)).ForMember(x => x.Duration, z => z.MapFrom(y => y.duration))
                .ForMember(x => x.Type, z => z.MapFrom(y => y.type)).ForMember(x => x.IsUnscheduled, z => z.MapFrom(y => y.open)).ForMember(x => x.Id, z => z.MapFrom(y => y.id));

            CreateMap<Task,TaskChartDto>().ForMember(x=>x.id,z=>z.MapFrom(y=>y.Id)).ForMember(x => x.start_date, z => z.MapFrom(y => y.StartDate.ToString())).ForMember(x => x.parent, z => z.MapFrom(y => y.ParentId))
               .ForMember(x => x.text, z => z.MapFrom(y => y.Name)).ForMember(x => x.progress, z => z.MapFrom(y => y.Progress)).ForMember(x => x.duration, z => z.MapFrom(y => y.Duration))
               .ForMember(x => x.type, z => z.MapFrom(y => y.Type)).ForMember(x => x.open, z => z.MapFrom(y => y.IsUnscheduled));

            CreateMap<CreateTaskChartDto, Task>().ForMember(x => x.StartDate, z => z.MapFrom(y => DateTime.Parse(y.start_date))).ForMember(x => x.ParentId, z => z.MapFrom(y => y.parent))
              .ForMember(x => x.Name, z => z.MapFrom(y => y.text)).ForMember(x => x.Progress, z => z.MapFrom(y => y.progress)).ForMember(x => x.Duration, z => z.MapFrom(y => y.duration))
              .ForMember(x => x.Type, z => z.MapFrom(y => y.type)).ForMember(x => x.IsUnscheduled, z => z.MapFrom(y => y.open));

            CreateMap<Task,CreateTaskChartDto>().ForMember(x => x.start_date, z => z.MapFrom(y => y.StartDate.ToString())).ForMember(x => x.parent, z => z.MapFrom(y => y.ParentId))
              .ForMember(x => x.text, z => z.MapFrom(y => y.Name)).ForMember(x => x.progress, z => z.MapFrom(y => y.Progress)).ForMember(x => x.duration, z => z.MapFrom(y => y.Duration))
              .ForMember(x => x.type, z => z.MapFrom(y => y.Type)).ForMember(x => x.open, z => z.MapFrom(y => y.IsUnscheduled));

            CreateMap<DetailTaskChartDto, Task>().ForMember(x => x.StartDate, z => z.MapFrom(y => DateTime.Parse(y.start_date))).ForMember(x => x.ParentId, z => z.MapFrom(y => y.parent))
              .ForMember(x => x.Name, z => z.MapFrom(y => y.text)).ForMember(x => x.Progress, z => z.MapFrom(y => y.progress)).ForMember(x => x.Duration, z => z.MapFrom(y => y.duration))
              .ForMember(x => x.Type, z => z.MapFrom(y => y.type)).ForMember(x => x.IsUnscheduled, z => z.MapFrom(y => y.open));

            CreateMap<Task, DetailTaskChartDto>().ForMember(x => x.start_date, z => z.MapFrom(y => y.StartDate.ToString())).ForMember(x => x.parent, z => z.MapFrom(y => y.ParentId))
              .ForMember(x => x.text, z => z.MapFrom(y => y.Name)).ForMember(x => x.progress, z => z.MapFrom(y => y.Progress)).ForMember(x => x.duration, z => z.MapFrom(y => y.Duration))
              .ForMember(x => x.type, z => z.MapFrom(y => y.Type)).ForMember(x => x.open, z => z.MapFrom(y => y.IsUnscheduled));
            #endregion
        }
    }
}