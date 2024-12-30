/**
 * __webpack_public_path__是webpack中的publicPath变量
 * 用于在异步请求资源的时候替换原本的publicPath，从而达到动态控制资源路径
 *  */
if (window.__POWERED_BY_QIANKUN__) {
  window.__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
