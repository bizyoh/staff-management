import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom} from "rxjs";

import { BASE_URLService } from "./baseurl.service";
import { Staff } from "../entity/Staff";
@Injectable()
export class StaffService{
    constructor(
        private httpClient: HttpClient,
        private endpoint : BASE_URLService
    ) {}
    async getAll(){
        var value = this.httpClient.get(this.endpoint.GetAllStaff());
        return await lastValueFrom(value);
    }
    async create(staff:Staff){
        var value = this.httpClient.post(this.endpoint.CreateStaff(),staff);
        return await lastValueFrom(value);
    }
    async edit(id:number,staff:Staff){
        var value = this.httpClient.put(this.endpoint.EditStaff(id),staff);
        return await lastValueFrom(value);
    }
    async delete(id:any){
        var value = this.httpClient.delete(this.endpoint.DeleteStaff(id));
        return await lastValueFrom(value);
    }
}
