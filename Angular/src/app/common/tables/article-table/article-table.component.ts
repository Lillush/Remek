import { Component, Input } from '@angular/core';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.scss'],
})
export class ArticleTableComponent {
  articleList: Article[] = [];

  phrase: string = '';

  constructor(
    private articleService: ArticleService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.articleService.getAll().subscribe((articles) => {
      this.articleList = articles;
    });
    this.searchService.searchPhrase.subscribe((phrase) => {
      this.phrase = phrase;
    });
  }

  onDelete(article: Article) {
    this.articleService.delete(article).subscribe(() => {
      this.articleService.getAll().subscribe((articles) => {
        this.articleList = articles;
      });
    });
  }
}
