import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Channel } from './channel';
import { ChannelService } from './channel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'LiveAngular';
  apiChannels: Observable<Channel[]>;
  firebaseChannels: Observable<Channel[]>;

  constructor(
    private channelService: ChannelService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getAPIChannels();
    this.getFirestoreChannels();
  }

  private getAPIChannels(): void {
    this.apiChannels = this.channelService.getChannels();
  }

  private getFirestoreChannels(): void {
    this.firebaseChannels = this.firestore
      .collection<Channel>('channels')
      .valueChanges({ idField: 'id' });
  }
}
