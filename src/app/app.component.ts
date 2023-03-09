import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BackendServiceService } from './backend-service.service';
import { TableDataSource } from './table-data-source';
import {MatSort, Sort} from '@angular/material/sort';
import { Observable, map, of, merge, tap, fromEvent, debounceTime,distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, AfterViewInit {
  dataSource: TableDataSource;
  displayedColumns= ["seqNo", "description", "duration"];

  @ViewChild(MatSort) sort: MatSort;

  filter: any = {};

  constructor(private backendService: BackendServiceService) {}

  ngOnInit() {
    this.dataSource = new TableDataSource(this.backendService);
    this.dataSource.loadLessons(1);
}

addFilter(event: any, inputName: string){
  console.log(inputName)
  console.log(event.target.value)
  this.filter[inputName] = event.target.value
  console.log(this.filter)
  this.loadLessonsPage(event.target.value);
}

ngAfterViewInit() {
  
  // fromEvent(this.input.nativeElement,'keyup')
  //           .pipe(
  //               debounceTime(150),
  //               distinctUntilChanged(),
  //               tap(() => {
  //                 console.log(this.input.nativeElement.value)
  //                   this.loadLessonsPage();
  //               })
  //           )
  //           .subscribe();


  merge(this.sort.sortChange)
      .pipe(
          tap(() => this.loadLessonsPage())
      )
      .subscribe();
}

loadLessonsPage(value = '') {
  console.log(this.sort.direction)
  this.dataSource.loadLessons(
      1,  value,  this.sort.direction);
}

}
