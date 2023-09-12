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
    }
    public class TaskService : ITaskService
    {
        private readonly StaffManagementEntities _db;
        public TaskService()
        {
            _db = new StaffManagementEntities();
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
