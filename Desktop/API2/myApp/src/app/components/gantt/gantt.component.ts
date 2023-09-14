import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { gantt } from 'dhtmlx-gantt';
import { Task } from 'src/app/entity/Task';
import { TaskChart } from 'src/app/entity/TaskChart';
import { TaskService } from 'src/app/services/task.service';
import { DatePipe } from '@angular/common';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'gantt',
  styleUrls: ['./gantt.component.css'],
  template: `<div #gantt_here class='gantt-chart'></div>`,
})

export class GanttComponent implements OnInit {
  taskChart:TaskChart[];
  linkChart:[];
  @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;
  constructor(
    private taskService: TaskService,
    private datePipe: DatePipe
    ) { }
  tasks1 = {
    data: [
      {
        id: "10",
        text: "Project #1",
        start_date: "01-04-2025",
        duration: 3,
        order: 10,
        progress: 0.4,
        open: true,
      },
      {
        id: "1",
        text: "Task #1",
        start_date: "01-04-2025",
        duration: 1,
        order: 10,
        progress: 0.6,
        parent: "10",
      },
      {
        id: "2",
        text: "Task #2",
        start_date: "02-04-2025",
        duration: 2,
        order: 20,
        progress: 0.6,
        parent: "10",
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }],
  };
  ngOnInit() {
    this.taskChart = [];
    gantt.config.date_format = '%Y-%m-%d %H:%i';
    gantt.init(this.ganttContainer.nativeElement);
    if(!(gantt as any).$_initOnce){
      (gantt as any).$_initOnce = true;

      const dp = gantt.createDataProcessor({
          task: {
              update: ( data: TaskChart) => this.taskService.editChart(data),
              create: (data: TaskChart) => this.taskService.createChart(data),
              delete: (id: any) => this.taskService.delete(id),
          },
          // link: {
          //     update: (data: Link) => this.linkService.update(data),
          //     create: (data: Link) => this.linkService.insert(data),
          //     delete: (id: any) => this.linkService.remove(id),
          // }
      });
  }
    Promise.all([this.taskService.getAll()])
      .then(([data]) => {
        let model =data as Task[]
        console.log(model)
        model.forEach(x=>{
          let temp: TaskChart={
            id : x.Id,
            start_date: this.datePipe.transform(x.StartDate, 'yyyy-MM-dd')?.toString(),
            text: x.Name,
            progress: x.Progress,
            duration: x.Duration,
            parent: x.ParentId
          };
          console.log('temp: ' +temp)
          this.taskChart.push(temp);
        })
        console.log(this.taskChart);
        var tasks = this.taskChart
        gantt.parse({ tasks});
      });
    gantt.init(this.ganttContainer.nativeElement);
  }

 
}
