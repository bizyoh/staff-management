import { HttpClient } from '@angular/common/http';
import { Component,EventEmitter,Input,OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonModal, ModalController } from '@ionic/angular';
import { Staff } from 'src/app/entity/Staff';
import { StaffService } from 'src/app/services/staff.service';
@Component({
    selector: 'edit-modal',
    templateUrl: './edit-modal-staff.component.html',
    styleUrls: ['./edit-modal-staff.component.css'],
  })


  export class EditModalComponent implements OnInit{
    message = 'Edit staff';
    name: string;
     @Input()  staff: Staff;
     editStaffForm : FormGroup
     constructor(
      private readonly staffService : StaffService,
      private formBuilder: FormBuilder,
      private modalCtrl: ModalController
      ){}
     cancel() {
      this.modalCtrl.dismiss(null, 'cancel');
    }
    confirm() {
      this.modalCtrl.dismiss(this.name, 'confirm');
    }
   
   
  ngOnInit(){
    this.editStaffForm = this.formBuilder.group({
      fullName: this.staff.FullName,
      shortName: this.staff.ShortName,
      id:this.staff.Id
    });
  }
  onSubmit(): void {
    // Process checkout data here
    let staffModel : Staff ={
      Id : this.staff.Id,
      FullName : this.editStaffForm.value.fullName,
      ShortName : this.editStaffForm.value.shortName
    };
    if(this.editStaffForm.value.id>0){
      this.staffService.edit(this.editStaffForm.value.id, staffModel).then(
        res=>{
          let rs  = res as boolean;
          if(rs){
            this.modalCtrl.dismiss(staffModel);
          }
        } )
    }
  }
}