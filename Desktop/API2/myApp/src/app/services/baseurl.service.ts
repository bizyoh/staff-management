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
        return this.url+"staff";
    }
    CreateTask(){
        return this.url+"staff";
    }
    EditTask(id:number){
        return this.url+"staff/"+id;
    }
    DeleteTask(id:number){
        return this.url+"staff/"+id;
    }
}