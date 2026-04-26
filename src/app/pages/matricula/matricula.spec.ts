import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Matricula } from './matricula';

describe('Matricula', () => {
  let component: Matricula;
  let fixture: ComponentFixture<Matricula>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Matricula],
    }).compileComponents();

    fixture = TestBed.createComponent(Matricula);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
