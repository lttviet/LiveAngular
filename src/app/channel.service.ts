import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Channel } from './channel';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private liveAPI = 'https://localhost:5001/api/channels';

  constructor(private http: HttpClient) {}

  getChannels(): Observable<Channel[]> {
    return this.http
      .get<Channel[]>(this.liveAPI)
      .pipe(catchError(this.handleError<Channel[]>('getChannels', [])));
  }

  getChannel(id: number): Observable<Channel> {
    const url = `${this.liveAPI}/${id}`;
    return this.http
      .get<Channel>(url)
      .pipe(catchError(this.handleError<Channel>('getChannel')));
  }

  private handleError<T>(
    operation = 'operation',
    result?: T
  ): (error: any) => Observable<T> {
    return (error) => {
      console.error(error);

      return of(result as T);
    };
  }
}
