import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGenreRequestsComponent } from './user-genre-requests.component';

describe('UserGenreRequestsComponent', () => {
  let component: UserGenreRequestsComponent;
  let fixture: ComponentFixture<UserGenreRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGenreRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGenreRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
