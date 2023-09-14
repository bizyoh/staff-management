import { Staff } from "./Staff";
import { StaffInTasks } from "./StaffInTasks";

export interface Task {
    Id?:number;
    ParentId?:number;
    Label: string;
    Type: string;
    Name: string;
    StartDate:string;
    EndDate:string;
    Duration: number;
    Progress:string;
    IsUnscheduled:boolean;
    StaffIds?:number[];
  }