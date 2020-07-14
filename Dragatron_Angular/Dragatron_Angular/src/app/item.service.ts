import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) { }


  ShowAlert(title, text, type) {
    Swal.fire({
      title: title,
      text: text,
      type: type,
      confirmButtonText: 'Ok'
    })
  }



  public GetItems() {
    return this.httpClient.get(this.SERVER_URL + 'Items');
  }

  public GetItemById(ItemId) {
    return this.httpClient.get(`${this.SERVER_URL + 'Items'}/${ItemId}`);
  }
  public CreateItem(Item: { id: any, Itemname: string, Price: number, image: string, Date: string, Description: string }) {
    return this.httpClient.post(`${this.SERVER_URL + 'Items'}`, Item)
  }

  public DeleteItem(ItemId) {
    debugger
    return this.httpClient.delete(`${this.SERVER_URL + 'Items'}/${ItemId}`)
  }
  public UpdateItem(Item: { id: any, Itemname: string, Price: number, image: string, Date: string, Description: string  }) {
    return this.httpClient.put(`${this.SERVER_URL + 'Items'}/${Item.id}`, Item)
  }


  //public getJSON(): Observable<any> {
  //  debugger
  //  return this.http.get("../assets/Data.json");
  //}
  //DeleteItem(id) {
  //  debugger
  //  return this.http.delete("../assets/Data.json/Delete/" + id);
  //}







}




