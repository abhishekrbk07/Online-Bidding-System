import { HttpClient } from '@angular/common/http';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bidding } from '../../interface/bidding';

@Injectable({
  providedIn: 'root',
})
export class BiddingService {
  constructor(private http: HttpClient) {}
  //post bidding
  postlistings(data: any, userId: number) {
    return this.http.post<any>(
      'http://localhost:8080/api/add-product/' + userId,
      data
    );
  }
  //get bidding
  getlistings() {
    return this.http.get('http://localhost:8080/api/products');
  }
  //update bidding
  putlistings(data: any, id: number) {
    return this.http.put<any>(
      'http://localhost:8080/api/updateproduct/' + id,
      data
    );
  }
  //delete bidding
  deletelistings(id: number) {
    let backendURL3 = environment.backendURL3;
    return this.http.delete<any>(backendURL3 + id);
  }
  //get single bidding by id
  getlistingById(id: number) {
    let backendURL4 = environment.backendURL4;
    return this.http.get<any>(backendURL4 + id);
  }
  // post place bidding
  postPlaceBid(data: any, id: number) {
    let backendURL5 = environment.backendURL5;
    return this.http.post<any>(backendURL5 + id, data);
  }
  postbidding(data: any, productId: number, userId: number) {
    return this.http.post<any>('http://localhost:8080/api/add-bid', data, {
      params: {
        productId,
        userId,
      },
    });
  }
  getAllbids() {
    return this.http.get<any>('http://localhost:8080/api/bids/');
  }
  getAllbidsId(id: number) {
    return this.http.get<any>('http://localhost:8080/api/bidsbyuser/' + id);
  }
  getAlllistingsId(id:number) {
    return this.http.get<any>(
      'http://localhost:8080/api/productsbyuser/'+id);
  }
  getAllbidslistings(){
    return this.http.get<any>(
      'http://localhost:8080/api/products'
    );
  }
  postApproval(id: number,data:any) {
    return this.http.post<any>('http://localhost:8080/api/approvebid/'+id,data)
  }
  getNumberlisting(){
    return this.http.get<any>('http://localhost:8080/api/countallproducts/')
  }
  getNumberBidding(){
    return this.http.get<any>('http://localhost:8080/api/countallbids/')
  }
  getBidsByProduct(id:number){
    return this.http.get<any>('http://localhost:8080/api/allbidsbyproduct/'+id)
  }
}
