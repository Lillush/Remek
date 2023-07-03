import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import { Article } from '../model/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends BaseService<Article> {
  constructor(public override http: HttpClient) {
    super(http);
    this.entity = 'articles';
  }
}
