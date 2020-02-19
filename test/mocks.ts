import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

export function createActivatedRouteMock() {
  return {
    snapshot: {
      paramMap: jasmine.createSpyObj('Snapshot', ['get'])
    }
  };
}

export function createNavControllerMock() {
  return jasmine.createSpyObj<NavController>('NavController', ['back', 'navigateForward', 'navigateRoot']);
}

export function createOverlayElementMock(name: string) {
  return jasmine.createSpyObj(name, ['dismiss', 'present']);
}

export function createOverlayControllerMock(name: string, element?: any) {
  return jasmine.createSpyObj(name, {
    create: Promise.resolve(element),
    dismiss: undefined,
    getTop: Promise.resolve(element)
  });
}

export function createPlatformMock() {
  return jasmine.createSpyObj<Platform>('Platform', {
    ready: Promise.resolve(''),
    is: false
  });
}

export function createRouterMock() {
  return jasmine.createSpyObj<Router>('Router', {
    navigate: Promise.resolve(true)
  });
}

export function createStorageMock() {
  return jasmine.createSpyObj<Storage>('Storage', {
    clear: Promise.resolve(),
    get: Promise.resolve(),
    ready: Promise.resolve(null),
    remove: Promise.resolve(),
    set: Promise.resolve()
  });
}
