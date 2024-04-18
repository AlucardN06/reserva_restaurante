import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Editar2Page } from './editar2.page';

describe('Editar2Page', () => {
  let component: Editar2Page;
  let fixture: ComponentFixture<Editar2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Editar2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
