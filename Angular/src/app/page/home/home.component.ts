import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articleList: Article[] = [];
  phrase: string = '';
  leadArticle: Article = new Article();

  p: number = 1;
  collection: any[] = [];

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.articleService.getAll().subscribe({
      next: (articles) => {
        this.articleList = articles;
      },
      error: (err) => {
        if (err.status === 401) {
          console.log(err);
        }
      },
    });
    this.searchService.searchPhrase.subscribe((phrase) => {
      this.phrase = phrase;
    });
  }
}
