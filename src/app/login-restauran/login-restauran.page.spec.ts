import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRestauranPage } from './login-restauran.page';

describe('LoginRestauranPage', () => {
  let component: LoginRestauranPage;
  let fixture: ComponentFixture<LoginRestauranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginRestauranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
