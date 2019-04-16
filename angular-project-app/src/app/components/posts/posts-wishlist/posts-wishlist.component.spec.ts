import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsWishlistComponent } from './posts-wishlist.component';

describe('PostsWishlistComponent', () => {
  let component: PostsWishlistComponent;
  let fixture: ComponentFixture<PostsWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
