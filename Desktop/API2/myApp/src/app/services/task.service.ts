import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom} from "rxjs";

import { BASE_URLService } from "./baseurl.service";
import { Staff } from "../entity/Staff";
import { Task } from "../entity/Task";
@Injectable()
export class TaskService{
    constructor(
        private httpClient: HttpClient,
        private endpoint : BASE_URLService
    ) {}
    async getAll(){
        var value = this.httpClient.get(this.endpoint.GetAllTask());
        return await lastValueFrom(value);
    }
    async create(task:Task){
        var value = this.httpClient.post(this.endpoint.CreateTask(),task);
        return await lastValueFrom(value);
    }
    async edit(id:number,task:Task){
        var value = this.httpClient.put(this.endpoint.EditTask(id),task);
        return await lastValueFrom(value);
    }
    async delete(id:any){
        var value = this.httpClient.delete(this.endpoint.DeleteTask(id));
        return await lastValueFrom(value);
    }
}
