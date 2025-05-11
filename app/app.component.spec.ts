import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
    }).compileComponents();
  });

  it('should create the dashboard', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const dashboard = fixture.componentInstance;
    expect(dashboard).toBeTruthy();
  });

  it(`should have the 'admin-portal' title`, () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const dashboard = fixture.componentInstance;
    expect(dashboard.title).toEqual('admin-portal');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, admin-portal',
    );
  });
});
