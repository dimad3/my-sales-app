import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CategoryService } from './category.service';
import { ICategory } from './ICategory.dto';

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
  @ViewChild(MatTable) table!: MatTable<ICategory>;

  // ! = definite assertrion - we are telling TypeScript that the dataSource variable will be instantiated
  // at some point, and TypeScript doesn’t have to worry about it.
  dataSource!: MatTableDataSource<ICategory>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description'];

  // To call the api that is in the CategoryService, we must inject the CategoryService class
  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    // Call the getAll method. In the callback of this method, subscribe is executed, and the
    // data is returned to the `categories` variable.
    // With the `categories` variable, you can assign the data source to the Mat Table,
    // and configure the paginator and the source, linking them to the DataSource
    this.categoryService.getAll().subscribe(
      categories => {
        this.dataSource = new MatTableDataSource(categories);
        this.table.dataSource = this.dataSource;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }
}
