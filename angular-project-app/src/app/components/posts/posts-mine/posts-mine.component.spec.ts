import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsMineComponent } from './posts-mine.component';

describe('PostsMineComponent', () => {
  let component: PostsMineComponent;
  let fixture: ComponentFixture<PostsMineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsMineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
