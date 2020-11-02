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
  apiChannels: Channel[];
  firebaseChannels: Channel[];

  constructor(
    private channelService: ChannelService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getAPIChannels();
    this.getFirestoreChannels();
  }

  private getAPIChannels(): void {
    this.channelService.getChannels()
      .subscribe(channels => this.apiChannels = channels);
  }

  private getFirestoreChannels(): void {
    this.firestore
      .collection<Channel>('channels')
      .valueChanges({ idField: 'id' })
      .subscribe(channels => this.firebaseChannels = channels);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    this.channelService.addChannel({name} as Channel)
      .subscribe(channel => this.apiChannels.push(channel));
  }
}
