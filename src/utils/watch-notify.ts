export class Watch {
  name: string;
  id: number;
  callBack: (name: string) => void;

  constructor(name: string, fn: Watch['callBack']) {
    this.name = name; // 订阅消息的名称
    this.id = new Date().getTime(); // 这里简单的运用时间戳做订阅者的ID
    this.callBack = fn; // 订阅消息发送改变时->订阅者执行的回调函数
  }

  update = () => {
    // 将订阅者更新方法
    const cb = this.callBack; // 赋值为了不改变函数内调用的this

    cb(this.name);
  };
}

export class Dep {
  static watch: Watch | null = null;
  subs: Watch[] = [];
  id: number;
  // 订阅池
  constructor() {
    this.id = new Date().getTime(); // 这里简单的运用时间戳做订阅池的ID
  }

  add = (watch: Watch) => {
    this.subs.push(watch);
  };

  notify = () => {
    // 通知订阅者有变化
    this.subs.forEach((e) => {
      if (typeof e.update === 'function') {
        try {
          e.update.apply(e); // 触发订阅者更新函数
        } catch (err) {
          console.warn(err);
        }
      }
    });
  };
}
