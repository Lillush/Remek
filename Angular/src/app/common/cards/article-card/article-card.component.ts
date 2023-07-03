import { Component, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent {
  @Input() article: Article = new Article();
}
