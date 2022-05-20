import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Route, Router } from '@angular/router';
import { BiddingService } from 'src/app/services/biddingservices/bidding.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-placebid',
  templateUrl: './placebid.component.html',
  styleUrls: ['./placebid.component.css'],
})
export class PlacebidComponent implements OnInit {
  productId: any;
  formValue!: FormGroup;
  user:any;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private biddingService: BiddingService,
    public dialog: MatDialog,
    private router:Router,
  ) {}
//params for id data
  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    // this.getOne();
    this.formValue = this.formBuilder.group({
      biddingPrice: ['', Validators.required],
     
    });
  }
  //id get from bidding data click
  // getOne() {
  //   this.biddingService.getlistingById(this.id).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: () => {
  //       alert('Unsuccesful to get');
  //     },
  //   });
  // }
//post place Bidding option
  placeBidding() {
    if (this.formValue.valid) {
      const authUserString = sessionStorage.getItem('authUser');
      
      console.log(authUserString);
   
      if (authUserString) {
        const authUser = JSON.parse(authUserString);
       
        this.user= (authUser.id)
        
        // console.log(this.user);
      //   const data = {
      //     ...this.formValue.value,
      //     userId
      
      // }
       
      //  console.log(this.formValue.value);
      // const userAsString = localStorage.getItem('authUser') || '{}';
      // const user = JSON.parse(userAsString);
      // const userId = user.id;
      // console.log(userId);
    

      this.biddingService
        .postbidding(this.formValue.value,this.productId,this.user)
        .subscribe({
          next: (res) => {
        // console.log(res)
            alert('Placed added successfully');
            this.router.navigate(['userlistings'])
            console.log(this.formValue.value);
            this.formValue.reset();
           
          },
          error: () => {
            alert('Bidding could not be added');
          },
        });
    }
  }
}
onClear()
{
  sessionStorage.removeItem('authUser');
}
}
