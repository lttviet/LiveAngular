import { Component, Input } from '@angular/core';

import { Channel } from '../channel';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css'],
})
export class ChannelsComponent {
  @Input() source: string;
  @Input() channels: Channel[];
}
