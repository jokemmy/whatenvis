
import { JSDOM } from 'jsdom';
import env from '../index';

test( 'Create', () => {
  const { window } = new JSDOM( '<!DOCTYPE html><p>Hello world</p>' );
  const newEnv = env.create( window );
  expect( newEnv.pc ).toBeTruthy();
});
