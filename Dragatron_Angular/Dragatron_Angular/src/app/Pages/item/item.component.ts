import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from 'src/app/item.service';
import Swal from 'sweetalert2';
declare const $: any;
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  cols: any;
  ItemsArr: any = [];
  ItemIds: any = [];
  ItemsList: any;
  AddForm: FormGroup;
  AddFormOpen: boolean = false;
    ButtonText: string;
    Image: string;
  urls: any = [];
    id: any;
  date: any;
  selectedCities: string[] = [];
  constructor(public formBuilder: FormBuilder, public ItemService: ItemService) {

    this.AddForm = this.formBuilder.group({
      Itemname: ['', Validators.required],
      Price: ['', Validators.required],
      Description: ['', Validators.required],
      //Date: ['', Validators.required],
      image: [''],
    })

    this.cols = [
      { field: 'Itemname', header: 'Itemname', width: '180px' },
      { field: 'image', header: 'Image', width: '100px' },
      { field: 'Price', header: 'Price', width: '180px' },
      { field: 'Date', header: 'Date', width: '180px' },
      { field: 'Description', header: 'Description', width: '180px' },
      { field: 'ImageThumbNail', header: 'ThumbNail', width: '100px' },
    ]

   

  }

  ngOnInit(): void {
    debugger
    this.GetItems();
  }

  
  GetItems() {
    debugger;
    this.ItemService.GetItems().subscribe((data: any) => {
      debugger;
      this.ItemsList = data;
    });
  }


  confirmDelete(RowData) {
    debugger
    Swal.fire({
      title: 'Are you sure to delete ?',
      text: "You won't be able to revert this and respective data will be deleted",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.DeleteItem(RowData.id);
      }
    })
  }
  validatepri(e: any) {
    debugger
    let input;
    input = String.fromCharCode(e.which);
    return !!/[0-9]/.test(input);
  }



  DeleteItem(id) {
    debugger;
    this.ItemService.DeleteItem(id).subscribe((data: any) => {
      debugger;
      this.GetItems();
      this.ItemService.ShowAlert('SUCCESS', 'Item Deleted Successfully.', 'success')
    });
  }

  CancelForm() {
    debugger
    this.AddFormOpen = false;
  }


  OpenAddForm() {
    debugger
    this.AddForm.reset();
    this.AddFormOpen = true;
    this.ButtonText='Add Item'
  }
  
  OpenEditForm(value) {
    debugger
    this.AddFormOpen = true;
    this.ButtonText = 'Update Item'
    this.AddForm.controls['Itemname'].setValue(value.Itemname);
    this.AddForm.controls['Price'].setValue(value.Price);
    this.AddForm.controls['Description'].setValue(value.Description);
    this.Image = value.image;
    this.id = value.id;
    this.date = value.Date;
  }




  AddItem(value) {
    debugger
    if (this.ButtonText == 'Add Item') {
      value.Date = new Date();
      value.image = this.urls[0];
      value.ImageThumbNail = this.urls[0];
      this.ItemService.CreateItem(value).subscribe((data: any) => {
        debugger;
        var a = data;
        this.AddFormOpen = false;
        this.ItemService.ShowAlert('SUCCESS', 'Item Added Successfully.', 'success')
        this.GetItems();
      });
    }
    else if (this.ButtonText == 'Update Item') {
      value.id = this.id;
      value.Date = this.date;
      value.image = this.Image;
      value.ImageThumbNail = this.Image;
      this.ItemService.UpdateItem(value).subscribe((data: any) => {
        debugger;
        var a = data;
        this.AddFormOpen = false;
        this.ItemService.ShowAlert('SUCCESS', 'Item Updated Successfully.', 'success')
        this.GetItems();
      });
    }
    
  }
  ShowImage(Image: string) {
    debugger
    this.Image = "";
    this.Image = Image;
    $('#myModal21').modal('show');
  }
  onImagePicked(event) {
    debugger
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          debugger
          this.urls.push(e.target.result);
          this.Image = this.urls[0];
          debugger
        }
        reader.readAsDataURL(file);
      }
      this.fileChange(event);
    }
  }
  fileChange(event) {
    debugger
    let fileList = event.target.files;
    this.Image = fileList[0];
    
  }
  SelectedItems(e, rowData) {
    debugger;
    if (e.checked == true) {
      this.ItemIds.push({ id: rowData.id })
    }
    else {
      var index = this.ItemIds.findIndex(a => a.id == rowData.id);
      this.ItemIds.splice(index, 1);
    }
  }

  BulkDelete() {
    debugger
    if (this.ItemIds.length!=0) {
      for (var i = 0; i < this.ItemIds.length; i++) {
        this.ItemService.DeleteItem(this.ItemIds[i].id).subscribe((data: any) => {
          debugger;
        });
      }
      this.GetItems();
      this.ItemService.ShowAlert('SUCCESS', 'Items Deleted Successfully.', 'success')
    }
    
  }

}
