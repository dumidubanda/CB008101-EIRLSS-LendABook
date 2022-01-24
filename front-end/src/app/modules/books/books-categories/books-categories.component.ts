import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../../../services/util.service';
import {MatTableDataSource} from '@angular/material/table';
import {BOOKS_APIS} from '../../../lookups/apis.lookups';

@Component({
  selector: 'app-books-categories',
  templateUrl: './books-categories.component.html',
  styleUrls: ['./books-categories.component.css']
})
export class BooksCategoriesComponent implements OnInit {

  selectedItem: any;
  selectedItemIndex: any;

  loading;
  formGroup: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource([]);
  categories: any[] = [];

  constructor(private fb: FormBuilder, private  uti: UtilService) {
    if ( !this.uti.getUserInfo().admin){
      this.uti.navigate('../books');
    }
  }
  ngOnInit(): void {
    this.getData();
    this.createForm();
  }

  createForm(category?): void {
    category = category || {};
    this.formGroup = this.fb.group({
      id: [category.id, []],
      name: [category.name, [Validators.required]],
    });
  }

  getData(): void{
    this.loading = true;
    this.uti.getRequest(BOOKS_APIS.categories).subscribe(value => {
      this.categories = value;
      this.dataSource = new MatTableDataSource(value);
      this.loading = false;
    }, error => {
      this.uti.alert('Error getting Categories!', this);
    });
  }

  deleteItem(item, index): void{
    this.loading = true;
    this.uti.deleteResource(BOOKS_APIS.categoriesDelete + item.id).subscribe(value => {
      this.categories.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.categories);
      this.uti.alert('Category Deleted successfully', this, 20000);
    }, error => {
      this.uti.alert('Error While delete Category', this);
    });
  }

  editItem(item, index): void{
    this.selectedItem = item;
    this.selectedItemIndex = index;
    this.createForm(this.selectedItem);
  }

  submit(): void{
    if ( this.formGroup.invalid) { return; }
    this.loading = true;
    if ( this.selectedItem){
      this.uti.putResource(BOOKS_APIS.categories, this.formGroup.value).subscribe(value => {
        this.categories[this.selectedItemIndex] = value;
        this.dataSource = new MatTableDataSource(this.categories);
        this.formGroup.reset();
        this.uti.alert('Category Saved successfully', this, 20000);
        this.loading = false;
        this.selectedItem = null;
      }, error => {
        this.uti.alert('Error While Saving Category', this);
      });
    } else{
      this.uti.postRequest(BOOKS_APIS.categories, this.formGroup.value).subscribe(value => {
        this.categories.push(value);
        this.dataSource = new MatTableDataSource(this.categories);
        this.formGroup.reset();
        this.loading = false;
        this.uti.alert('Category Saved successfully', this, 20000);
      }, error => {
        this.uti.alert('Error While Saving Category', this);
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
