/*import {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,

    AsyncParallelBailHook,
    AsyncSeriesBailHook,
    AsyncSeriesHook,
    AsyncSeriesWaterfallHook
} from "tapable";*/

//SyncHook 串行同步执行,不关心返回值
/*
class SyncHook {
    constructor() {
        this.tasks = [];
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    call() {
        this.tasks.foreach(task=>task(...arguments))
    }

}

let queue = new SyncHook(['name']);

queue.tap("1", function (name) {
    console.log(name, 1);
});
queue.tap("2", function (name) {
    return "www"
});
queue.tap("3", function (name) {
    console.log(name, 3);
});

queue.call('zfpx',55);*/

//SyncBailHook  串行同步执行，有一个返回值不为null则跳过剩下的逻辑
/*
class SyncBailHook {
    constructor() {
        this.tasks = [];
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    call() {
       let i=0,ret;
       do {
           ret = this.tasks[i++](...arguments);
           console.log(ret);
       }while (!ret)
    }

}

let queue = new SyncHook(['name']);

queue.tap("1", function (name) {
    console.log(name, 1);
});
queue.tap("2", function (name) {
    return "www"
});
queue.tap("3", function (name) {
    console.log(name, 3);
});

queue.call('zfpx',55);*/

// SyncWaterfallHook
class SyncWaterfallHook {
    constructor() {
        this.tasks = [];
    }

    tap(name, task) {
        this.tasks.push(task);
    }

    call() {
       let [first,...tasks] = this.tasks;//数组
        tasks.reduce((ret, task) => {
            console.log([task][0])
        });
    }

}

let queue = new SyncWaterfallHook(['name']);

queue.tap("1", function (name,age) {
    console.log(name,age,1);
    return 1;
});
queue.tap("2", function (data) {
    console.log(data,2);
    return 2;
});
queue.tap('3',function(data){
    console.log(data,3);
});

queue.call('zfpx',55);
