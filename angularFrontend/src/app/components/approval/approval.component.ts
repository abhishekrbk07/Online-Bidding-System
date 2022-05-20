import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BiddingService } from 'src/app/services/biddingservices/bidding.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css'],
})
export class ApprovalComponent implements OnInit {
  id: any;
  bidid:any
  btnVal = 'Approval';
  clicked = false;
  displayedColumns: string[] = [
    'username',
    'userId',
    'productId',
     'bidId',
    'productName',
    'productDescription',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private biddingService: BiddingService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.bidid = this.route.snapshot.params['bidId'];
    console.log(this.id)
    console.log(this.bidid)
    this.biddingService. getBidsByProduct(this.id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        alert('Successful to get');
      },
    });
   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //button click function
  changeText() {
    this.btnVal = 'Approved';
    // this.biddingService.postApproval(this.bidid,{}).subscribe({
    //       next: (res) => {
    //         console.log(res);
    //       },
    //       error: () => {
    //         alert('Unsuccesful to get');
    //       },
    //     });
  }
  onClear() {
    sessionStorage.removeItem('authUser');
  }
}
