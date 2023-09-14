using API2.Models.Dto.Staff;
using API2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography.X509Certificates;
using API2.Models.Dto.Task;
using System.Web.Http;
using System.Data.Entity;

namespace API2.Services
{
    public interface ITaskService
    {
        List<TaskViewModel> GetAllTask();
        Task GetTask(int id);
        int CreateTask(CreateTaskDto createTaskDto);
        bool EditTask(int id, DetailTaskDto detailTaskDto);
        bool DeleteTask(int id);
        // for chart
        List<TaskChartDto> GetAllChartTask();
        TaskChartDto GetChartTask(int id);
        int CreateChartTask(CreateTaskChartDto createTaskDto);
        bool EditChartTask( DetailTaskChartDto detailTaskDto);

    }
    public class TaskService : ITaskService
    {
        private readonly StaffManagementEntities _db;
        public TaskService()
        {
            _db = new StaffManagementEntities();
        }
        public List<TaskChartDto> GetAllChartTask()
        {
            var tasks = _db.Tasks.ToList();
            var rs = AutoMapper.Mapper.Map<List<Task>,List<TaskChartDto>>(tasks);
            return rs;
        }
        public TaskChartDto GetChartTask(int id)
        {
            var task = _db.Tasks.FirstOrDefault(x=>x.Id == id);
            var rs = AutoMapper.Mapper.Map<TaskChartDto>(task);
            return rs;
        }
        public int CreateChartTask(CreateTaskChartDto taskChartDto)
        {
            var model = AutoMapper.Mapper.Map<Task>(taskChartDto);
            _db.Tasks.Add(model);
            if(_db.SaveChanges() > 0)
            {
                return model.Id;
            }
            return 0;
        }
        public bool EditChartTask(DetailTaskChartDto detailTaskDto)
        {
            try
            {
                var model = _db.Tasks.AsNoTracking().FirstOrDefault(x => x.Id == detailTaskDto.id);
                if (model == null) throw new HttpResponseException(System.Net.HttpStatusCode.NotFound);
                model = AutoMapper.Mapper.Map<Task>(detailTaskDto);
                _db.Entry(model).State = EntityState.Modified;
                return _db.SaveChanges() > 0;
            }
            catch(Exception ex)
            {
                return false;
            }
          
        }
        public int CreateTask(CreateTaskDto createTaskDto)
        {
            using ( var trans = _db.Database.BeginTransaction())
            {
                var task = AutoMapper.Mapper.Map<Task>(createTaskDto);
                task.StaffInTasks = createTaskDto.StaffIds.Select(x => new StaffInTask { StaffId = x }).ToList();
                _db.Tasks.Add(task);
                if (_db.SaveChanges() > 0)
                {
                    trans.Commit();
                    return task.Id;
                }
                else
                {
                    return 0;
                }
            }
        }
        public bool DeleteTask(int Id)
        {
            var task = _db.Tasks.FirstOrDefault(x => x.Id == Id);
            if (task == null) throw new HttpResponseException(System.Net.HttpStatusCode.NotFound);
            _db.Tasks.Remove(task);
            return _db.SaveChanges() > 0;
        }

        public bool EditTask(int id, DetailTaskDto detailTaskDto)
        {
            var task = _db.Tasks.Include(x=>x.StaffInTasks).FirstOrDefault(x => x.Id == id);
            if (task == null)
            {
                return false;
            }
            else
            {
                AutoMapper.Mapper.Map(detailTaskDto, task);
                var staffInTasksToRemove = new List<StaffInTask>();

                foreach (var staffInTask in task.StaffInTasks)
                {
                    if (!detailTaskDto.StaffIds.Contains(staffInTask.StaffId))
                    {
                        staffInTasksToRemove.Add(staffInTask);
                   
                    }
                }

                foreach (var staffInTaskToRemove in staffInTasksToRemove)
                {
                    task.StaffInTasks.Remove(staffInTaskToRemove);
                    _db.StaffInTasks.Remove(staffInTaskToRemove);
                }
                
                foreach (var staffId in detailTaskDto?.StaffIds)
                {
                    var existingStaffInTask = task.StaffInTasks.FirstOrDefault(s => s.StaffId == staffId);

                    if (existingStaffInTask == null)
                    {
                        task.StaffInTasks.Add(new StaffInTask { StaffId = staffId });

                    }
                }
            }
            return _db.SaveChanges() > 0;
        }

        public List<TaskViewModel> GetAllTask()
        {
             var model =   _db.Tasks.Include(x=>x.StaffInTasks).ToList();
            var rs = AutoMapper.Mapper.Map<List<TaskViewModel>>(model);
            return rs;
        }

        public Task GetTask(int id)
        {
            var task = _db.Tasks.FirstOrDefault(x => x.Id == id);
            return task;
        }

    }

}
