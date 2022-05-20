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
  selector: 'app-transcation',
  templateUrl: './transcation.component.html',
  styleUrls: ['./transcation.component.css']
})
export class TranscationComponent implements OnInit {
  bidid:any
  displayedColumns: string[] = [
    'approved',
    'bidId',
    'biddingPrice',
    'productId',
    'productName',
    
    'username',
    
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
    this.bidid = this.route.snapshot.params['bidId'];
   
    console.log(this.bidid)
    this.biddingService.postApproval(this.bidid,{}).subscribe({
      next: (response: any) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response.data);
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
  onClear() {
    sessionStorage.removeItem('authUser');
  }
  }

  // bidid:any
  // displayedColumns: string[] = [
  //   'approved',
  //   'bidId',
  //   'biddingPrice',
  //   'productId',
  //   'productName',
  //   'userId',
  //   'username',
    
  // ];
  // dataSource!: MatTableDataSource<any>;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  // constructor( private route: ActivatedRoute,private router: Router,
  //   public dialog: MatDialog,private biddingService: BiddingService) { }

  // ngOnInit(): void {
    // this.bidid = this.route.snapshot.params['bidId'];
   
    // console.log(this.bidid)
    // this.biddingService.postApproval(this.bidid,{}).subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //     this.dataSource = new MatTableDataSource(response);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //     alert('Successful to get');
    //   },
    // });
  // }
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  // onClear() {
  //   sessionStorage.removeItem('authUser');
  // }
  // }

