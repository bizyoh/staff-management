import { StaffInTasks } from "./StaffInTasks";

export interface Staff {
    Id?:number;
    FullName: string;
    ShortName: string;
    StaffInTasks?: StaffInTasks[]
  }