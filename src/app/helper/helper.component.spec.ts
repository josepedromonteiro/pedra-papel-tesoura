import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelperComponent } from './helper.component';

describe('HelperComponent', () => {
  let component: HelperComponent;
  let fixture: ComponentFixture<HelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
