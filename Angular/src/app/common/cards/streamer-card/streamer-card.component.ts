import { Component, Input } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-streamer-card',
  templateUrl: './streamer-card.component.html',
  styleUrls: ['./streamer-card.component.scss'],
})
export class StreamerCardComponent {
  @Input() user: User = new User();
}
