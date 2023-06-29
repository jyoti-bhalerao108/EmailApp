import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private url = '';
  constructor(private http: HttpClient) {}
  SendEmail(input: any) {
    return this.http.post(this.url, input).pipe(
      map(
        (response) => {          
            return response;          
        },
        (error: any) => {
          if (error) {
            return error;
          }
        }
      )
    );
  }
}
