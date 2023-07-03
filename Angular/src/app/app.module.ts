import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './page/home/home.component';
import { StreamersComponent } from './page/streamers/streamers.component';
import { NavComponent } from './common/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './page/calendar/calendar.component';
import { FooterComponent } from './common/footer/footer.component';
import { AdminComponent } from './page/admin/admin.component';
import { StreamerCardComponent } from './common/cards/streamer-card/streamer-card.component';
import { AsideComponent } from './common/aside/aside.component';
import { MiniCalendarComponent } from './common/mini-calendar/mini-calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticleService } from './service/article.service';
import { ArticleComponent } from './page/article/article.component';
import { ArticleCardComponent } from './common/cards/article-card/article-card.component';
import { UserTableComponent } from './common/tables/user-table/user-table.component';
import { ArticleTableComponent } from './common/tables/article-table/article-table.component';
import { EventTableComponent } from './common/tables/event-table/event-table.component';
import { LoginComponent } from './page/login/login.component';
import { ScheduleComponent } from './page/schedule/schedule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from 'src/interceptor/authentication.interceptor';
import { UserEditorComponent } from './common/editors/user-editor/user-editor.component';
import { RegisterComponent } from './common/register/register.component';
import { EventEditorComponent } from './common/editors/event-editor/event-editor.component';
import { ArticleEditorComponent } from './common/editors/article-editor/article-editor.component';
import { FilterComponent } from './utils/filter/filter.component';
import { FilterPipe } from './pipe/filter.pipe';
import { StreamEditorComponent } from './common/editors/stream-editor/stream-editor.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StreamersComponent,
    NavComponent,
    CalendarComponent,
    FooterComponent,
    AdminComponent,
    StreamerCardComponent,
    AsideComponent,
    MiniCalendarComponent,
    ArticleComponent,
    ArticleCardComponent,
    UserTableComponent,
    ArticleTableComponent,
    EventTableComponent,
    LoginComponent,
    ScheduleComponent,
    UserEditorComponent,
    RegisterComponent,
    EventEditorComponent,
    ArticleEditorComponent,
    FilterComponent,
    FilterPipe,
    StreamEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
