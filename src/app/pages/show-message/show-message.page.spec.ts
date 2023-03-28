import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ShowMessagePageRoutingModule } from './show-message-routing.module';
import { ShowMessagePage } from './show-message.page';

describe('ShowMessagePage', () => {
  let component: ShowMessagePage;
  let fixture: ComponentFixture<ShowMessagePage>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ShowMessagePage],
      imports: [IonicModule.forRoot(), ShowMessagePageRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
