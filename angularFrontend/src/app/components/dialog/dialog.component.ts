import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BiddingService } from 'src/app/services/biddingservices/bidding.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  formValue!: FormGroup;
  list: any;
  message: boolean = false;
  user:any;
  actionBtn: string = 'submit';
  constructor(
    private formBuilder: FormBuilder,
    private biddingService: BiddingService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
    if (this.editData) {
      this.actionBtn = 'Update';
      this.formValue.controls['productName'].setValue(this.editData.productName);
      this.formValue.controls['price'].setValue(
        this.editData.price
      );
      this.formValue.controls['description'].setValue(
        this.editData.description
      );
    }
    const authUserString = sessionStorage.getItem('authUser');
      
    console.log(authUserString);
 
    if (authUserString) {
      const authUser = JSON.parse(authUserString);
      console.log(authUser)
      const id= authUser.id
      
      console.log(id);
       this.user=id;
  }
}
  //posting the bidding data
  addBidding() {
    if (!this.editData) {
      
      if (this.formValue.valid) {
        this.biddingService.postlistings(this.formValue.value,this.user).subscribe({
          next: (res) => {
            alert('Bidding added successfully');
            this.formValue.reset();
            this.dialogRef.close('submit');
          },
          error: () => {
            alert('Bidding could not be added');
          },
        });
      }
    } else {
      this.updateBidding();
    }
  }
  //put bidding data
  updateBidding() {
    this.biddingService
      .putlistings(this.formValue.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert('Data Updated Successfully');
          this.formValue.reset();
          this.dialogRef.close('Update');
        },
        error: (err) => {
          alert('error while Updating records');
        },
      });
  }
}
