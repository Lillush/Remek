import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './page/calendar/calendar.component';
import { HomeComponent } from './page/home/home.component';

import { StreamersComponent } from './page/streamers/streamers.component';
import { ArticleComponent } from './page/article/article.component';
import { AdminComponent } from './page/admin/admin.component';
import { LoginComponent } from './page/login/login.component';
import { ScheduleComponent } from './page/schedule/schedule.component';
import { UserEditorComponent } from './common/editors/user-editor/user-editor.component';
import { RegisterComponent } from './common/register/register.component';
import { EventEditorComponent } from './common/editors/event-editor/event-editor.component';
import { ArticleEditorComponent } from './common/editors/article-editor/article-editor.component';
import { StreamEditorComponent } from './common/editors/stream-editor/stream-editor.component';
import { AuthGuardService } from './guard/auth.guard';
import { RoleGuardService } from './guard/role.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'streamers',
    component: StreamersComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: { role: 'ADMIN' },
  },
  {
    path: 'userEditor/:id',
    component: UserEditorComponent,
  },
  {
    path: 'eventEditor/:id',
    component: EventEditorComponent,
  },
  {
    path: 'articleEditor/:id',
    component: ArticleEditorComponent,
  },
  {
    path: 'streamEditor',
    component: StreamEditorComponent,
  },
  {
    path: 'article/:id',
    component: ArticleComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegisterComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
