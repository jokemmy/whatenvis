
import detector from '../node';


const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36';
const env = detector( ua );

test( 'pc', () => {
  expect( env.pc ).toBeTruthy();
});
