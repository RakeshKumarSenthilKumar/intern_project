import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (co) => co.DashboardComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users.component').then(
        (co) => co.UsersComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./pages/account/account.component').then(
        (co) => co.AccountComponent,
      ),
    canActivate: [authGuard],
    children: [
      {
        path: 'manage/:id',
        loadComponent: () =>
          import('./pages/manage-accounts/manage-accounts.component').then(
            (m) => m.ManageAccountsComponent,
          ),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'project',
    loadComponent: () =>
      import('./pages/project/project.component').then(
        (co) => co.ProjectComponent,
      ),
    canActivate: [authGuard],
    children: [
      {
        path: 'manage/:projectId',
        loadComponent: () =>
          import('./pages/manage-project/manage-project.component').then(
            (co) => co.ManageProjectComponent,
          ),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'project/:accountId',
    loadComponent: () =>
      import('./pages/project/project.component').then(
        (co) => co.ProjectComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'sprint',
    loadComponent: () =>
      import('./pages/sprint/sprint.component').then(
        (co) => co.SprintComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'sprint/:accountId',
    loadComponent: () =>
      import('./pages/sprint/sprint.component').then(
        (co) => co.SprintComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'sprint/manage/:projectId/:sprintId',
    loadComponent: () =>
      import('./pages/manage-sprint/manage-sprint.component').then(
        (co) => co.ManageSprintComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./pages/task/task.component').then(
        (co) => co.TaskComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'template',
    loadComponent: () =>
      import('./pages/manage-template/manage-template.component').then(
        (co) => co.ManageTemplateComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (co) => co.NotFoundComponent,
      ),
  }

];
