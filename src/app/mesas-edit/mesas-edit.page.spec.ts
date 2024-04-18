import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesasEditPage } from './mesas-edit.page';

describe('MesasEditPage', () => {
  let component: MesasEditPage;
  let fixture: ComponentFixture<MesasEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MesasEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
