
function detect( userAgent ) {
  return ( regexps ) => regexps.reduce(( version, regexp ) => {
    if ( version === false ) {
      const matched = userAgent.match( regexp );
      return matched ? ( matched[1] || true ) : version;
    }
    return version;
  }, false );
}

/**
 * 四个层面 系统环境/浏览器环境/移动设备/软件环境
 * 系统：ios/android/macos/windows
 * 设备：phone/tablet/kindle/pc
 * 浏览器：主流浏览器 ie/chrome/firefox/opera/safari
 * 软件：wechat: ios/android
 *      alipay: ios/android
 */

function detactor( userAgent ) {
  const match = detect( userAgent.toLowerCase());
  const is = {

    // 系统检测
    android: match([/android\s([\d.]+)/]),
    macos: match([/\(macintosh;\sintel\smac\sos\sx\s([\d_]+)/]),
    windows: match([/windows\snt\s([\d.]+)/]),
    ios: match([/\(i[^;]+;( U;)? CPU.+Mac OS X/]),

    // 设备检测
    // phone
    ipad: match([/\(ipad.*os\s([\d_]+)/]),
    // ipod: match([/\(ipod.*os\s([\d_]+)/]),
    iphone: match([/iphone\sos\s([\d_]+)/]),
    windowsPhone: match([/windows\sphone\s([\d.]+)/]),

    // mobile 两边有空格
    // 推测安卓平板一般有 mobile 的代表可以插 sim 卡,所以这样判断不准确
    androidPhone: match([/android\s([\d.]+).*\smobile\s.*/]),

    // pad
    kindle: match([/kindle\/([\d.]+)/]),

    // 浏览器检测及版本
    ie: match([ /* ie < 11 */ /msie ([\d.]+)/, /* ie11 */ /rv:([\d.]+)\) like gecko/ ]),
    edge: match([/edge\/([\d.]+)/]),
    firefox: match([/firefox\/([\d.]+)/]),
    opera: match([/(?:opera|opr).([\d.]+)/]),
    chrome: match([ /chrome\/([\d.]+)/, /crios\/([\d.]+)/ ]),
    chromeMobile: match([/crios\/([\d.]+)/]),
    safari: match([/version\/([\d.]+).*safari/]),

    // 软件环境
    wechat: match([/micromessenger\/([\d.]+)/]),
    alipay: match([/alipayclient\/([\d.]+)/])
  };

  // 小米浏览器兼容
  // "Mozilla/5.0 (Linux; U; Android 9; zh-cn; MIX 2S Build/PKQ1.180729.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.128 Mobile Safari/537.36 XiaoMi/MiuiBrowser/10.2.2"
  const adm = match([/android\s.*;\s([^;]*)\sbuild\/.*/]);
  const admTablet = adm && adm.match( /\spad\s/ );
  // const xiaomiPhone = xiaomi && !xiaomiTablet;

  // 由于国产安卓阵营的信息比较乱,需要修正
  is.androidPhone = is.androidPhone && !admTablet;

  // chrome
  is.chrome = !is.edge && is.chrome;

  // 系统
  // is.ios = is.ipad || is.iphone; // || is.ipod;
  is.safari = !!( is.ios || is.macos || is.windows ) && is.safari;

  // pad
  is.androidTablet = !is.androidPhone && !!is.android;
  is.windowsTablet = match([/touch/]) && !is.windowsPhone && is.windows;

  // 平台
  is.phone = !!( is.iphone || is.androidPhone || is.windowsPhone );
  is.tablet = !!( is.ipad || is.androidTablet || is.windowsTablet || match([/tablet/]));

  // 浏览器
  is.safariMobile = ( is.ipad || is.iphone ) && is.safari;

  // 软件环境
  is.iosWechat = !!is.iphone && !!is.wechat;
  is.androidWechat = !!is.android && !!is.wechat;
  is.iosAlipay = !!is.ios && !!is.alipay;
  is.androidAlipay = !!is.android && !!is.alipay;

  // pc
  is.pc = !is.phone && !is.tablet && !is.kindle;

  return is;
}

export default detactor;
