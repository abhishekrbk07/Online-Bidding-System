import { Component, OnInit } from '@angular/core';
import { BiddingService } from 'src/app/services/biddingservices/bidding.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css'],
})
export class UserlistingComponent implements OnInit {
  displayedColumns: string[] = [
    'productId',
    'productName',
    'description',
    'startingBid',
    'biddingPrice',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private biddingService: BiddingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const authUserString = sessionStorage.getItem('authUser');

    console.log(authUserString);

    if (authUserString) {
      const authUser = JSON.parse(authUserString);

      const userid = authUser.id;

      console.log(userid);

      this.biddingService.getAllbidsId(userid).subscribe({
        next: (response: any) => {
          console.log(response);
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          alert('Successful to get');
        },
      });
    }
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
