import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestGenreComponent } from './request-genre.component';

describe('RequestGenreComponent', () => {
  let component: RequestGenreComponent;
  let fixture: ComponentFixture<RequestGenreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestGenreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
