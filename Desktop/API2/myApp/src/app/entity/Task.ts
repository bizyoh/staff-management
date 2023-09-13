import { StaffInTasks } from "./StaffInTasks";

export interface Task {
    Id?:number;
    ParentId?:number;
    Label: string;
    Type: number;
    Name: string;
    StartDate:string;
    EndDate:string;
    Duration: number;
    Progress:string;
    IsUnscheduled:boolean;
  }