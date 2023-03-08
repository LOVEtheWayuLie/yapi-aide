import { Dep, Watch } from './watch-notify';

const addHistoryMethod = (function () {
  const historyDep = new Dep();

  return function <T extends 'historyChange' | 'pushState' | 'replaceState'>(
    name: T
  ) {
    const method = history[name as 'pushState'];
    const newMethod = function (...params) {
      method.apply(history, params);
      historyDep.notify();
    } as (typeof history)['pushState'];
    const dict = {
      historyChange(name: string, fn: Watch['callBack']) {
        const event = new Watch(name, fn);

        historyDep.add(event);
      },
      pushState: newMethod,
      replaceState: newMethod,
    } as const;

    return dict[name] as (typeof dict)[T];
  };
})();

export const addHistoryListener = addHistoryMethod('historyChange');

/** 监听history初始化 */
export function initListenHistory() {
  if (!window) {
    return;
  }
  // window.addHistoryListener = addHistoryListener;
  history.pushState = addHistoryMethod('pushState');
  history.replaceState = addHistoryMethod('replaceState');
}
initListenHistory();
