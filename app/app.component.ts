import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { LoginComponent } from './shared/components/login.component';
import { ShellComponent } from './shared/components/shell/shell.component';
import { SessionStore } from './shared/stores/session.store';
import { ProfileStore } from './shared/stores/profile.store';
import { SystemStore } from './shared/stores/system.store';
import { TeamStore } from './shared/stores/team.store';
import { SpinnerComponent } from './shared/components/spinner.component';

@Component({
  selector: 'main-root',
  standalone: true,
  imports: [ShellComponent, LoginComponent, SpinnerComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  #sessionStore = inject(SessionStore);
  #profileStore = inject(ProfileStore);
  #systemStore = inject(SystemStore);
  #teamStore = inject(TeamStore);

  loadingVisible = computed(() => this.#systemStore.getLoadingState());
  systemInitialized = computed(() => this.#systemStore.checkInitialization());

  constructor() {
    effect(() => {
      if (this.#sessionStore.isLoggedIn()) {
        this.#profileStore.fetchProfiles().subscribe(() => {
          this.#systemStore.setProfilesLoaded();
          this.#teamStore.loadTeamData().subscribe();
        });
      }
    });
  }
}
