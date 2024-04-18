import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRestauranPage } from './admin-restauran.page';

describe('AdminRestauranPage', () => {
  let component: AdminRestauranPage;
  let fixture: ComponentFixture<AdminRestauranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminRestauranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
