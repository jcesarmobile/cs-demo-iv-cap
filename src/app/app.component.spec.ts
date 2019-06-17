import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Platform } from '@ionic/angular';

import { Plugins, StatusBarStyle } from '@capacitor/core';

import { AppComponent } from './app.component';
import { createIdentityServiceMock, IdentityService } from './services/identity';
import { createPlatformMock } from '../../test/mocks';

describe('AppComponent', () => {
  let originalSplashScreen;
  let originalStatusBar;

  beforeEach(async(() => {
    originalSplashScreen = Plugins.SplashScreen;
    originalStatusBar = Plugins.StatusBar;
    Plugins.StatusBar = jasmine.createSpyObj('StatusBar', ['setStyle', 'setBackgroundColor']);
    Plugins.SplashScreen = jasmine.createSpyObj('SplashScreen', ['hide']);
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: IdentityService, useFactory: createIdentityServiceMock }
      ]
    }).compileComponents();
  }));

  afterEach(() => {
    Plugins.StatusBar = originalStatusBar;
    Plugins.SplashScreen = originalSplashScreen;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the app', fakeAsync(() => {
    TestBed.createComponent(AppComponent);
    tick();
    expect(Plugins.SplashScreen.hide).toHaveBeenCalledTimes(1);
    expect(Plugins.StatusBar.setStyle).toHaveBeenCalledTimes(1);
    expect(Plugins.StatusBar.setStyle).toHaveBeenCalledWith({
      style: StatusBarStyle.Light
    });
    expect(Plugins.StatusBar.setBackgroundColor).not.toHaveBeenCalled();
  }));

  // TODO: after upgrade of jasmine...
  // it('sets the status bar background for android', fakeAsync(() => {
  //   const platform = TestBed.get(Platform);
  //   platform.is.withArgs('android').and.returnValue(true);
  //   TestBed.createComponent(AppComponent);
  //   tick();
  //   expect(Plugins.StatusBar.setBackgroundColor).toHaveBeenCalledTimes(1);
  //   expect(Plugins.StatusBar.setBackgroundColor).toHaveBeenCalledWith({ color: '#3171e0' });
  // }));
});
