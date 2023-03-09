import { vueMount } from '@/utils';
import type { App } from 'vue';
import ApiPreview from './ApiPreview.vue';
import $ from 'jquery';

export { ApiPreview };

type TypeInstance = {
  /** vue实例 */
  instance: App;
  /** 挂载dom位置 */
  box: HTMLDivElement;
  /** 用途名称 */
  name: string;
  /** 卸载 */
  uninstall: () => void;
};

type TypeApiPreviewInstance = {
  responseData?: TypeInstance;
  requestData?: TypeInstance;
};

const instanceMap: TypeApiPreviewInstance = {};

newObserverElRemove(instanceMap);

function newInstance(name: keyof typeof instanceMap, parentDom: HTMLElement) {
  if (instanceMap[name]) {
    return instanceMap[name];
  }
  const box = document.createElement('div');
  const instance = vueMount(ApiPreview, box);

  parentDom?.appendChild(box);
  box.setAttribute('class', 'api-preview');
  instanceMap[name] = {
    instance,
    box,
    name,
    uninstall() {
      // console.log('触发元素卸载');
      instance.unmount();
      box.remove();
      instanceMap[name] = undefined;
    },
  };
  return instanceMap[name];
}

export function ApiPreviewSetup() {
  const domArr = document.querySelectorAll(
    '.caseContainer > .interface-title'
  ) as NodeListOf<HTMLElement>;

  domArr.forEach((dom) => {
    if (dom.textContent?.startsWith('返回数据')) {
      return newInstance('responseData', dom);
    }
    if (dom.textContent?.startsWith('请求参数')) {
      return newInstance('requestData', dom);
    }
  });

  return {
    uninstall() {
      Object.entries(instanceMap).forEach(([key, value]) => {
        value?.uninstall();
      });
    },
  };
}

/** 监听dom元素被移除 */
function newObserverElRemove(
  /** 待监听的实例对象 */
  dict: Record<string, TypeInstance>,
  /** 通过父级 parentEl 实现监听, 默认是document */
  parentEl: HTMLElement | Document = document
) {
  const observer = new MutationObserver(function (mutations, obv) {
    const instanceArr = Object.values(dict).filter(Boolean);
    const domArr = instanceArr.map((item) => item.box);

    mutations.forEach(function (mutation) {
      const { removedNodes } = mutation;

      if (removedNodes.length > 0) {
        $(removedNodes)
          .find($(domArr))
          .each((index, el) => {
            const instance = instanceArr.find((item) => item.box === el);

            instance && instance.uninstall();
          });
      }
    });
  });

  observer.observe(parentEl, {
    childList: true,
    subtree: true,
  });
  return observer;
}
