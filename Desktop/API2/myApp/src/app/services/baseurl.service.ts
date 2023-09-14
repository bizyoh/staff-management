import { Injectable } from "@angular/core";

@Injectable()
export class BASE_URLService{
    private readonly url :string = "https://localhost:44383/api/";
    GetAllStaff(){
        return this.url+"staff";
    }
    CreateStaff(){
        return this.url+"staff";
    }
    EditStaff(id:number){
        return this.url+"staff/"+id;
    }
    DeleteStaff(id:number){
        return this.url+"staff/"+id;
    }
  
    GetAllTask(){
        return this.url+"task";
    }
    CreateTask(){
        return this.url+"task";
    }
    EditTask(id:number){
        return this.url+"task/"+id;
    }
    DeleteTask(id:number){
        return this.url+"task/"+id;
    }

    GetAllChartTask(){
        return this.url+"chart-task";
    }
    CreateChartTask(){
        return this.url+"chart-task";
    }
    EditChartTask(){
        return this.url+"chart-task";
    }
   
}