import { vueMount } from '@/utils';
import { App } from 'vue';
import ApiPreview from './ApiPreview.vue';

export { ApiPreview };

export function ApiPreviewSetup() {
  const domArr = document.querySelectorAll('.caseContainer > .interface-title');
  const instanceArr: App[] = [];

  domArr.forEach((dom) => {
    if (dom.textContent?.startsWith('返回数据') === false) {
      return;
    }
    const box = document.createElement('div');
    const instance = vueMount(ApiPreview, box);

    dom?.appendChild(box);
    box.setAttribute('class', 'api-preview');
    instanceArr.push(instance);
  });

  return {
    uninstall() {
      instanceArr.forEach((instance) => instance.unmount());
    },
  };
}
