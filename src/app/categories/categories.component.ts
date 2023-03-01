import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CategoryService } from './category.service';
import { Category } from './category.dto';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: [`
    .full-width-table {
      width: 100%;
    }

  `]
})
export class CategoriesComponent implements OnInit {
  // @ViewChild  - Property decorator that configures a view query.
  // The change detector looks for the first element or the directive matching the selector in the view DOM.
  // If the view DOM changes, and a new child matches the selector, the property is updated.

  // Component to provide navigation between paged information.
  // Displays the size of the current page, user-selectable options to change that size,
  // what items are being shown, and navigational button to go to the previous or next page.
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // Container for MatSortables to manage the sort state and provide default sort parameters.
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Category>;

  // ! = definite assertrion - we are telling TypeScript that the dataSource variable will be instantiated
  // at some point, and TypeScript doesn’t have to worry about it.
  dataSource!: MatTableDataSource<Category>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description', 'actions'];

  // property which will define whether the form should be displayed or not
  showForm: boolean = false;

  // ! = definite assertrion - we are telling TypeScript that the dataSource variable will be instantiated
  // at some point, and TypeScript doesn’t have to worry about it.
  category!: Category;

  showLoading: Boolean = false;

  // To call the api that is in the CategoryService, we must inject the CategoryService class
  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.refreshData();
  }

  onNewCategoryClick() {
    this.category = {
      id: 0,
      name: '',
      description: ''
    }
    this.showForm = true;
  }

  onBackForm() {
    this.showForm = false;
    this.refreshData();
  }

  async refreshData() {
    // The refreshData method starts by setting this.showLoading=true, so loading will be shown on the screen
    this.showLoading = true;

    try {
      // await lastValueFrom....

      // The lastValueForm means: Converts an observable to a promise by subscribing to the
      // observable, waiting for it to complete, and resolving the returned promise with the last
      // value from the observed stream.
      const categories: Category[] = await lastValueFrom(this.categoryService.getAll());
      this.dataSource = new MatTableDataSource(categories);
      this.table.dataSource = this.dataSource;  // commented because dataSource is set at template (p.126 - 127)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      // dispatch erros....
      console.log('opsss!', error)
    } finally {
      // do this after lastValueFrom or error
      // Hide loading after querying the backend and getting the categories data
      this.showLoading = false;
    }

  }

onSave(category: Category): void {
  console.log('onSave in categories-component.ts: ', category)
    // subscribe() - https://javascript.plainenglish.io/angular-observables-for-complete-beginners-8dff19b37e97
    this.categoryService.save(category).subscribe(categorySaved => {
    console.log('Categories-component.ts says -> cat saved:', categorySaved);
    this.showForm = false;
    this.refreshData();
  })
}

onEditCategoryClick(category: Category) {
  console.log('Categories-component.ts says -> cat to be edited:', category)
  this.category = category;
  this.showForm = true;
}

onDeleteCategoryClick(category: Category) {
  console.log('Categories-component.ts says -> cat to be deleted:', category);
  if (confirm(`Do you want to delete "${category.name}"?`)) {
    this.categoryService.delete(category.id).subscribe(() => {
      // console.log('Categories-component.ts says -> cat deleted:', categoryDeleted);
      this.refreshData();
    })
  }
}

}
