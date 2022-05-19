import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOeuvreComponent } from './detail-oeuvre.component';

describe('DetailOeuvreComponent', () => {
  let component: DetailOeuvreComponent;
  let fixture: ComponentFixture<DetailOeuvreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOeuvreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOeuvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
