import { Component,Input,OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { Staff } from 'src/app/entity/Staff';
import { Task } from 'src/app/entity/Task';
import { StaffService } from 'src/app/services/staff.service';
import { TaskService } from 'src/app/services/task.service';
import { EditModelTaskComponent } from '../Edit-Modal/edit-modal-task.component';
import { format } from 'date-fns';

@Component({
    selector: 'task-detail',
    templateUrl: './detail-task.component.html',
    styleUrls: ['./detail-task.component.css'],
  })
  export class DetailTaskComponent{
    @Input() task:Task;
    startDateValue :any;
    endDateValue :any;
    constructor(
        private readonly taskService : TaskService,
        private formBuilder: FormBuilder,
        private modalCtrl: ModalController,
        private alertController: AlertController,
        private router : Router,
        ){}
    ngOnInit(){
      this.startDateValue = format(new Date(this.task.StartDate),'yyyy-MM-dd');
      this.endDateValue = format(new Date(this.task.EndDate),'yyyy-MM-dd');
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
                    this.taskService.delete(this.task.Id).then(
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
          component: EditModelTaskComponent,
          componentProps:{task:this.task} 
          
        });
        modal.onDidDismiss().then(rs=>{
            if(rs.role==='confirm' && rs.data){
                this.task = rs.data as Task;
            }
        })
        modal.present();
        const { data, role } = await modal.onWillDismiss();
      }
  }