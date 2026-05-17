# 编写 Service









[[TOC]]





## 第一章 简单Service

```kotlin
import android.app.Service
import android.content.Intent
import android.os.IBinder

// 定义一个 DemoService 它去继承了 Service
class DemoService : Service() {

    // 重写了 onBind() 方法, 这里的返回值是 IBinder 的对象
    // 在 IBinder? 的后面, 紧跟着一个 ? 表示当前的 IBinder 可以为空
    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    // 重写了 生命周期的 onCreate() 方法
    override fun onCreate() {
        super.onCreate()
    }

    // 重写了生命周期的 onStartCommand() 方法
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        return super.onStartCommand(intent, flags, startId)
    }

    // 重写了生命周期的 onDestory() 方法
    override fun onDestroy() {
        super.onDestroy()
    }
}
```







## 第二章 内部类线程

内部类两种写法：

1、`object` 关键字

2、`lambda` 表达式

```kotlin
import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.util.Log

// 定义一个 DemoService 他去继承了 Service
class DemoService : Service() {

    private val TAG = DemoService::class.simpleName

    // 重写了 onBind() 方法, 这里的返回值是 IBinder 的对象
    // 在 IBinder? 的后面, 紧跟着一个 ? 表示当前的 IBinder 可以为空
    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    // 重写了 生命周期的 onCreate() 方法
    override fun onCreate() {
        super.onCreate()
    }

    // 重写了生命周期的 onStartCommand() 方法
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        return super.onStartCommand(intent, flags, startId)
    }

    // 重写了生命周期的 onDestory() 方法
    override fun onDestroy() {
        super.onDestroy()
    }

    // 内部定义一个线程的实现类写法， 这里是完整的写法。使用的是 object
    val runnable1 = object : Runnable {
        override fun run() {
            Log.i(TAG, "object内部类")
        }

    }

    // 内部定义一个线程的实现类写法，采用简化的写法。使用的是 Lambda 表达式
    val runnable2 = Runnable { Log.i(TAG, "Lambda表达式") }
}
```















