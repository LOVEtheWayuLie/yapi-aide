import { ApiPreviewSetup } from './pages/ApiPreview';

/** 页面初始化操作, 组件需要自处理防多次初始化 */
export function pageInit() {
  setTimeout(() => {
    ApiPreviewSetup();
  }, 500);
}
