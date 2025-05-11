import { Routes } from '@angular/router';
import { sessionGuard } from './shared/guards/session.guard';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(
        (m) => m.HomeComponent,
      ),
    canActivate: [sessionGuard],
  },
  {
    path: 'members',
    loadComponent: () =>
      import('./features/members/members.component').then(
        (m) => m.MembersComponent,
      ),
    canActivate: [sessionGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
    canActivate: [sessionGuard],
    children: [
      {
        path: 'edit/:userId',
        loadComponent: () =>
          import('./features/edit-profile/edit-profile.component').then(
            (m) => m.EditProfileComponent,
          ),
        canActivate: [sessionGuard],
      },
    ],
  },
  {
    path: 'workspace',
    loadComponent: () =>
      import('./features/workspace/workspace.component').then(
        (m) => m.WorkspaceComponent,
      ),
    canActivate: [sessionGuard],
    children: [
      {
        path: 'edit/:workspaceId',
        loadComponent: () =>
          import('./features/edit-workspace/edit-workspace.component').then(
            (m) => m.EditWorkspaceComponent,
          ),
        canActivate: [sessionGuard],
      },
    ],
  },
  {
    path: 'workspace/:profileId',
    loadComponent: () =>
      import('./features/workspace/workspace.component').then(
        (m) => m.WorkspaceComponent,
      ),
    canActivate: [sessionGuard],
  },
  {
    path: 'milestone',
    loadComponent: () =>
      import('./features/milestone/milestone.component').then(
        (m) => m.MilestoneComponent,
      ),
    canActivate: [sessionGuard],
  },
  {
    path: 'milestone/:profileId',
    loadComponent: () =>
      import('./features/milestone/milestone.component').then(
        (m) => m.MilestoneComponent,
      ),
    canActivate: [sessionGuard],
  },
  {
    path: 'milestone/edit/:workspaceId/:milestoneId',
    loadComponent: () =>
      import('./features/edit-milestone/edit-milestone.component').then(
        (m) => m.EditMilestoneComponent,
      ),
    canActivate: [sessionGuard],
  },
  {
    path: 'activities',
    loadComponent: () =>
      import('./features/activity/activity.component').then(
        (m) => m.ActivityComponent,
      ),
    canActivate: [sessionGuard],
  },
  {
    path: 'blueprint',
    loadComponent: () =>
      import('./features/edit-blueprint/edit-blueprint.component').then(
        (m) => m.EditBlueprintComponent,
      ),
    canActivate: [sessionGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/page-missing/page-missing.component').then(
        (m) => m.PageMissingComponent,
      ),
  },
];
