/* eslint-disable @typescript-eslint/no-explicit-any */
export {};
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: any;
  }
}

window.FB = window.FB || {};
