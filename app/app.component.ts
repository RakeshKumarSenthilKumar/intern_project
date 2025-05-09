import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
} from '@angular/core';
import { AuthComponent } from './core/components/auth.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { AuthStore } from './core/stores/auth.store';
import { AccountStore } from './core/stores/account.store';
import { AppStore } from './core/stores/app.store';
import { UserStore } from './core/stores/user.store';
import { GlobalLoaderComponent } from './core/components/global-loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, AuthComponent, GlobalLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  #authState = inject(AuthStore);
  #accountStore = inject(AccountStore);
  #appStore = inject(AppStore);
  #userStore = inject(UserStore);

  showLoading = computed(() => this.#appStore.showLoading());
  appReady = computed(() => this.#appStore.isPrerequisiteReady());

  constructor() {
    effect(() => {
      if (this.#authState.userAuthenticated()) {
        this.#accountStore.loadAccounts().subscribe(() => {
          this.#appStore.markAccountsReady();
          this.#userStore.getUsers().subscribe();
        });
      }
    });
  }
}
