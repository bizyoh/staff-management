using API2.Models.Dto.Staff;
using API2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography.X509Certificates;
using API2.Models.Dto.Task;
using System.Web.Http;

namespace API2.Services
{
    public interface ITaskService
    {
        List<Task> GetAllTask();
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
                var model = _db.Tasks.FirstOrDefault(x => x.Id == detailTaskDto.id);
                if (model == null) throw new HttpResponseException(System.Net.HttpStatusCode.NotFound);
                model = AutoMapper.Mapper.Map<Task>(detailTaskDto);
                return _db.SaveChanges() > 0;
            }
            catch(Exception ex)
            {
                return false;
            }
          
        }
        public int CreateTask(CreateTaskDto createTaskDto)
        {
            var task = AutoMapper.Mapper.Map<Task>(createTaskDto);
            _db.Tasks.Add(task);
            if (_db.SaveChanges() > 0)
            {
                return task.Id;
            }
            else
            {
                return 0;
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
            var task = _db.Tasks.FirstOrDefault(x => x.Id == id);
            if (task == null)
            {
                return false;
            }
            else
            {
                AutoMapper.Mapper.Map(detailTaskDto, task);
            }
            return _db.SaveChanges() > 0;
        }

        public List<Task> GetAllTask()
        {
             return  _db.Tasks.ToList();
        }

        public Task GetTask(int id)
        {
            var task = _db.Tasks.FirstOrDefault(x => x.Id == id);
            return task;
        }

    }

}
