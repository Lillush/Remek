import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stream } from 'src/app/model/stream';
import { StreamService } from 'src/app/service/stream.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-stream-editor',
  templateUrl: './stream-editor.component.html',
  styleUrls: ['./stream-editor.component.scss'],
})
export class StreamEditorComponent {
  stream: Stream = new Stream();

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private streamService: StreamService
  ) {}

  ngOnInit(): void {
    this.ar.params.subscribe((params) => {
      this.streamService.get(params['id']).subscribe((stream: Stream) => {
        this.stream = stream;
      });
    });
  }

  onCreate(stream: Stream) {
    this.streamService
      .create(stream)
      .subscribe(() => this.router.navigate(['/schedule']));
  }
}
