import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {UtilService} from '../../../services/util.service';
import {VIDEOS_APIS} from '../../../lookups/apis.lookups';

@Component({
  selector: 'app-videos-categories',
  templateUrl: './videos-categories.component.html',
  styleUrls: ['./videos-categories.component.css']
})
export class VideosCategoriesComponent implements OnInit {

  selectedItem: any;
  selectedItemIndex: any;

  loading;
  formGroup: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource([]);
  categories: any[] = [];

  constructor(private fb: FormBuilder, private  uti: UtilService) {
    if ( !this.uti.getUserInfo().admin){
      this.uti.navigate('../videos');
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
    this.uti.getRequest(VIDEOS_APIS.categories).subscribe(value => {
      this.categories = value;
      this.dataSource = new MatTableDataSource(value);
      this.loading = false;
    }, error => {
      this.uti.alert('Error getting Categories!', this);
    });
  }

  deleteItem(item, index): void{
    this.loading = true;
    this.uti.deleteResource(VIDEOS_APIS.categoriesDelete + item.id).subscribe(value => {
      this.categories.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.categories);
      this.uti.alert('Category Deleted successfully', this, 20000);
    }, error => {
      this.uti.alert('Error While delete Category', this);
    });
  }

  submit(): void{
    if ( this.formGroup.invalid) { return; }
    this.loading = true;
    if ( this.selectedItem){
      this.uti.putResource(VIDEOS_APIS.categories, this.formGroup.value).subscribe(value => {
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
      this.uti.postRequest(VIDEOS_APIS.categories, this.formGroup.value).subscribe(value => {
        this.categories.push(value);
        this.dataSource = new MatTableDataSource(this.categories);
        this.formGroup.reset();
        this.uti.alert('Category Saved successfully', this, 20000);
        this.loading = false;
      }, error => {
        this.uti.alert('Error While Saving Category', this);
      });
    }
  }

  editItem(item, index): void{
    this.selectedItem = item;
    this.selectedItemIndex = index;
    this.createForm(this.selectedItem);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
