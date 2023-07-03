import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  searchPhrase: string = '';
  searchCategory: string = '';

  // @Output() keyPhrase: EventEmitter<string> = new EventEmitter();
  // @Output() categorySelect: EventEmitter<string> = new EventEmitter();

  // onPhraseSearch(phrase: string) {
  //   this.searchPhrase = phrase;
  //   this.keyPhrase.emit(this.searchPhrase);
  // }

  // onCategorySelect(category: string) {
  //   this.searchCategory = category;
  //   this.categorySelect.emit(this.searchCategory);
  // }
}
