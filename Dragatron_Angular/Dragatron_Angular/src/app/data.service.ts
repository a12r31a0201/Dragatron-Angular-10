import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api'
@Injectable({
  providedIn: 'root'
})

 export class DataService implements InMemoryDbService {

  constructor() { }
  createDb() {

    let Items = [
      { id: 1, Itemname: 'PO1', Price: 1000, image: "../../../assets/20200527015848_IMG_8390.JPG", ImageThumbNail: "../../../assets/20200527015848_IMG_8390.JPG", Date: "2013-01-08", Description: 'Insurance policy number PO1' },
      { id: 2, Itemname: 'PO2', Price: 2000, image: "../../../assets/20200527015848_IMG_8390.JPG", ImageThumbNail: "../../../assets/20200527015848_IMG_8390.JPG", Date: "2013-01-08", Description: 'Insurance policy number PO2' },
      { id: 3, Itemname: 'PO3', Price: 3000, image: "../../../assets/20200527015848_IMG_8390.JPG", ImageThumbNail: "../../../assets/20200527015848_IMG_8390.JPG", Date: "2013-01-08", Description: 'Insurance policy number PO3' },
      { id: 4, Itemname: 'PO4', Price: 4000, image: "../../../assets/20200527015848_IMG_8390.JPG", ImageThumbNail: "../../../assets/20200527015848_IMG_8390.JPG", Date: "2013-01-08", Description: 'Insurance policy number PO4' }
    ];

    return { Items };

  }
}
