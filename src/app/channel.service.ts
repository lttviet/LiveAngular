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

  addChannel(channel: Channel): Observable<Channel> {
    return this.http
      .post<Channel>(this.liveAPI, channel)
      .pipe(
        tap((newChannel: Channel) => console.log(`Added channel id=${newChannel.id}`)),
        catchError(this.handleError<Channel>('addChannel'))
      );
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
