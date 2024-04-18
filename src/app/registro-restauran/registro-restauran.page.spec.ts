import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroRestauranPage } from './registro-restauran.page';

describe('RegistroRestauranPage', () => {
  let component: RegistroRestauranPage;
  let fixture: ComponentFixture<RegistroRestauranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroRestauranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
