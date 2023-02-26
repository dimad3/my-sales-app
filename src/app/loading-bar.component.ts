import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-bar',
  template: `
    <div *ngIf="visibleChild" class="loading_bar">
      <mat-progress-spinner color="primary" mode="indeterminate"></mat-progress-spinner>
    </div>
  `,
styles: ['.loading_bar {display: flex; justify-content: center; align-items: center; background: white;}']
})
export class LoadingBarComponent {
  @Input() visibleChild: Boolean = false;
}
