import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchPhrase: BehaviorSubject<string> = new BehaviorSubject('');
  searchCategory: BehaviorSubject<string> = new BehaviorSubject('');

  currentSearchPhrase = this.searchPhrase.asObservable();
  currentSearchCategory = this.searchCategory.asObservable();

  constructor() {}

  updateSearchPhrase(phrase: string) {
    this.searchPhrase.next(phrase);
  }

  updateCategoryPhrase(category: string) {
    this.searchCategory.next(category);
  }

  get phrase(): BehaviorSubject<string> {
    return this.searchPhrase;
  }

  get category(): BehaviorSubject<string> {
    return this.searchCategory;
  }
}
