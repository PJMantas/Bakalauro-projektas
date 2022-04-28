import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreRequestComponent } from './genre-request.component';

describe('GenreRequestComponent', () => {
  let component: GenreRequestComponent;
  let fixture: ComponentFixture<GenreRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
