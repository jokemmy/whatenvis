
import detector from './detector';


function hasOwnProperty( object, propertyName ) {
  return Object.prototype.hasOwnProperty.call( object, propertyName );
}

// 横屏
function landscape() {
  if (
    screen.orientation && hasOwnProperty( global, 'onorientationchange' )
  ) {
    return screen.orientation.type.includes( 'landscape' );
  }
  return global.innerHeight < global.innerWidth;
}

// 竖屏
// function portrait() {
//   return !landscape();
// }

function walkOnChangeOrientationList( changeOrientationList, newOrientation ) {
  for ( let i = 0, l = changeOrientationList.length; i < l; i++ ) {
    changeOrientationList[i]( newOrientation );
  }
}

function handleOrientation( changeOrientationList, resetCache ) {
  return function() {
    if ( landscape()) {
      walkOnChangeOrientationList( changeOrientationList, 'landscape' );
    } else {
      walkOnChangeOrientationList( changeOrientationList, 'portrait' );
    }
    resetCache();
  };
}

/**
 * 四个层面 系统环境/浏览器环境/移动设备/软件环境
 * 系统：ios/android/macos/windows
 * 设备：phone/tablet/kindle/pc
 * 浏览器：主流浏览器 ie/chrome/firefox/opera/safari
 * 软件：wechat: ios/android
 *      alipay: ios/android
 */

function browser( global ) {
  const previousWhatenvis = global.whatenvis;
  const is = detector( global.navigator.userAgent.toLowerCase());

  // 移动端
  if ( is.tablet || is.phone ) {
    is.landscape = landscape();
    is.portrait = !is.landscape;

    const changeOrientationList = [];
    is.onOrientationChange = function( cb ) {
      if ( typeof cb === 'function' ) {
        changeOrientationList.push( cb );
      }
    };

    let orientationEvent = 'resize';
    if ( hasOwnProperty( global, 'onorientationchange' )) {
      orientationEvent = 'orientationchange';
    }

    // Listen for changes in orientation.
    if ( global.addEventListener ) {
      global.addEventListener( orientationEvent, handleOrientation( changeOrientationList, () => {
        is.landscape = landscape();
        is.portrait = !is.landscape;
      }), false );
    }
  }

  is.noConflict = function() {
    global.whatenvis = previousWhatenvis;
    return is;
  };

  global.whatenvis = is;
  return is;
}

export default browser( self );
