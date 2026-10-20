export const SPLASH_SESSION_KEY = 'surakshak:splash-seen';

/* Runs in <head> before first paint. It mirrors shouldSkipSplash() in
   SplashProvider.tsx: when the visitor should NOT see the splash, it tags
   <html data-splash="skip"> and globals.css hides the overlay immediately,
   so returning visitors never see the plum flash before React hydrates.
   If you change the skip rules in one place, change them in the other. */
export const SPLASH_BOOT_SCRIPT = `(function(){try{var w=window,d=document.documentElement;if(new URLSearchParams(w.location.search).has('splash')){return;}var skip=w.matchMedia('(prefers-reduced-motion: reduce)').matches||w.location.hash.length>1;if(!skip){try{skip=w.sessionStorage.getItem('${SPLASH_SESSION_KEY}')==='1';}catch(e){}}if(skip){d.setAttribute('data-splash','skip');}}catch(e){}})();`;
