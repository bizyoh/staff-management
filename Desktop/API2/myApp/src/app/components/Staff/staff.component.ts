import { Component,Input,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonModal, ModalController } from '@ionic/angular';
import { Staff } from 'src/app/entity/Staff';
import { StaffService } from 'src/app/services/staff.service';
import { EditModalComponent } from './Edit-Modal/edit-modal-staff.component';
@Component({
    selector: 'staff-item',
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.css'],
  })
  export class StaffComponent implements OnInit{
     staffs : Staff[];
      staff: Staff;
      selectedStaff: number;
    createStaffForm : FormGroup
    constructor(
      private readonly staffService : StaffService,
      private formBuilder: FormBuilder,
      ){}

  ngOnInit(){
    this.createStaffForm = this.formBuilder.group({
      fullName: '',
      shortName: ''
    });
    this.getAllStaffs();
  }
  getAllStaffs(){
    this.staffService.getAll().then(
      res=>{
          this.staffs =  res as Staff[]
      }
    );
  }
  filterByTerm(term: string,item:any){
    term = term.toLocaleLowerCase();
    return item.FullName.toLocaleLowerCase().indexOf(term)>-1 ||  item.ShortName.toLocaleLowerCase().indexOf(term)>-1 ;
  }
  changeToSelectedStaff(){
    if(this.selectedStaff> 0 ){
      this.staffs=this.staffs.filter(x=>x.Id == this.selectedStaff);
    }
    else{
      this.getAllStaffs()
    }
    }
  onSubmit(): void {
    // Process checkout data here
    let staffModel : Staff ={
      FullName : this.createStaffForm.value.fullName,
      ShortName : this.createStaffForm.value.shortName
    };
    this.staffService.create(staffModel).then(
      res=>{
        let id :number  = res as number;
        if(id > 0 ){
          this.getAllStaffs();
        }
      }
      
    )
    this.createStaffForm.reset();
  }
}