import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(private http: HttpClient) { }

  findLessons(
    courseId:number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3):  Observable<any[]> {

      if(filter !== ''){
        return(of([{seqNo: 1, description: "asd", duration: 3}, {seqNo: 2, description: "test", duration: 5}].filter(data => data.description.includes(filter))))
      }

      //simulate
      if(sortOrder == "desc"){
        return of([{seqNo: 2, description: "test", duration: 5},{seqNo: 1, description: "asd", duration: 3}])
      }
      return of([{seqNo: 1, description: "asd", duration: 3}, {seqNo: 2, description: "test", duration: 5}])

    // return this.http.get('/api/lessons', {
    //     params: new HttpParams()
    //         .set('courseId', courseId.toString())
    //         .set('filter', filter)
    //         .set('sortOrder', sortOrder)
    //         .set('pageNumber', pageNumber.toString())
    //         .set('pageSize', pageSize.toString())
    // }).pipe(
    //     map(res =>  res["payload"])
    // );
  }  
}