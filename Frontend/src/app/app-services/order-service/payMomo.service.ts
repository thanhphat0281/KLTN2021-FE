import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../aHost/Host.service';

@Injectable({
  providedIn: 'root'
})
export class payMomoService {
  selectedOrder: Order;
  order: Order[];

  constructor(private _http: HttpClient ,private _host:HostService) { }
  readonly baseURL = this._host.host()+':3000/paymentMomo';
  
  postPayMomo(order) {
    return this._http.post("https://payment-momo.herokuapp.com/paymentMoMo", order);
  }
  getNotifyUrl(orderId:string){
    return this._http.get("https://payment-momo.herokuapp.com/notifyResultPaymentMoMo",{params:{orderId:orderId}});
  }
}
