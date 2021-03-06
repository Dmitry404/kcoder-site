import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesListPageComponent } from './exercises-list-page.component';
import { ExercisesService } from './exercises.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';

describe('ExercisesListPageComponent', () => {
  let component: ExercisesListPageComponent;
  let fixture: ComponentFixture<ExercisesListPageComponent>;

  beforeEach(async(() => {
    const fakeActivatedRoute = {
      // snapshot: { data: { ... } }
    } as ActivatedRoute;
    const fakeRouter = {} as Router;
    const fakeModalService = {} as BsModalService;

    TestBed.configureTestingModule({
      declarations: [ExercisesListPageComponent],
    }).overrideComponent(ExercisesListPageComponent, {
      set: {
        providers: [
          { provide: ExercisesService, useClass: ExercisesServiceMock },
          { provide: ActivatedRoute, useValue: fakeActivatedRoute },
          { provide: Router, useValue: fakeRouter },
          { provide: BsModalService, useValue: fakeModalService },
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExercisesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load available exercises', () => {
    const element = fixture.debugElement.nativeElement;
    const exercises = element.querySelectorAll('.exercise-item');

    expect(exercises.length).not.toEqual(0);
  });
});

class ExercisesServiceMock extends ExercisesService {
  constructor() {
    super(null);
  }

  fetchExercises(): Observable<{ id: string, content: string }[]> {
    return of([
      {id: 'id1', content: 'id1_content'},
      {id: 'id2', content: 'id2_content'},
      {id: 'id3', content: 'id3_content'},
      {id: 'id4', content: 'id4_content'},
    ]);
  }
}
