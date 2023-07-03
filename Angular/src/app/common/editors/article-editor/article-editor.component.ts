import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/model/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorComponent implements OnInit {
  article: Article = new Article();
  isUpdating: boolean = false;
  today: Date = new Date();

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.ar.params.subscribe((params) => {
      if (params['id'] !== '0') {
        this.articleService.get(params['id']).subscribe((article: Article) => {
          this.article = article;
          this.isUpdating = true;
        });
      } else {
        this.isUpdating = false;
      }
    });
  }

  onUpdate(article: Article) {
    if (this.isUpdating) {
      this.articleService
        .update(article)
        .subscribe(() => this.router.navigate(['/admin']));
    } else {
      this.articleService
        .create(article)
        .subscribe(() => this.router.navigate(['/admin']));
    }
  }
}
