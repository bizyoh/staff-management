import { Component,Input,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { Staff } from 'src/app/entity/Staff';
import { StaffService } from 'src/app/services/staff.service';
import { EditModalComponent } from '../Edit-Modal/edit-modal-staff.component';
import { Router } from '@angular/router';

@Component({
    selector: 'detail-staff-item',
    templateUrl: './detail-staff.component.html',
    styleUrls: ['./detail-staff.component.css'],
  })
  export class DetailStaffComponent implements OnInit{
    @Input()  staff: Staff;
   
    editStaffForm : FormGroup
    constructor(
     private readonly staffService : StaffService,
     private formBuilder: FormBuilder,
     private modalCtrl: ModalController,
     private alertController: AlertController,
     private router : Router,
     ){}
     ngOnInit(){
       
      }
      async presentAlert() {
        const alert = await this.alertController.create({
          header: 'Are you sure to delete staff?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
              },
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => {
                    this.staffService.delete(this.staff.Id).then(
                        res=>{
                            var rs = res as boolean;
                            console.log(rs);
                            if(rs){
                                // this.router.navigate(['/staff']);
                                window.location.reload();
                            }
                        }
                    )
              },
            },
          ],
        });
        await alert.present();
        const { role } = await alert.onDidDismiss();
      }
      async openModalEdit() {
        const modal = await this.modalCtrl.create({
          component: EditModalComponent,
          componentProps:{staff:this.staff} 
          
        });
        modal.onDidDismiss().then(rs=>{
          if(rs.role ==='confirm' && rs.data){
            this.staff = rs.data as Staff;
          }
        })
        modal.present();
        const { data, role } = await modal.onWillDismiss();
      }
  }

