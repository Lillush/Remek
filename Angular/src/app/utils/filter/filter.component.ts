import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/service/search.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  phrase: string = '';

  constructor(private router: Router, private searchService: SearchService) {}

  ngOnInit() {}

  submit() {
    this.searchService.updateSearchPhrase(this.phrase);
  }
}
