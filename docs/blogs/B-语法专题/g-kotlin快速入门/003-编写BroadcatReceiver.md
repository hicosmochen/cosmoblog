# 编写 BroadcastReceiver









[[TOC]]





## 第一章 简单BroadcastReceiver

```kotlin
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class DemoReceiver : BroadcastReceiver() {

    private val ACTION_ONE: String = "xxx.xxx.xxx.ONE.xxx"
    private val ACTION_TWO: String = "xxx.xxx.xxx.TWO.xxx"
    private val ACTION_THREE: String = "xxx.xxx.xxx.THREE.xxx"

    private val TAG = DemoReceiver::class.simpleName

    // 重写了 onReceiver 方法
    // 这里标注了 Intent?  表示这里 Intent 可能会为 null 值
    override fun onReceive(context: Context?, intent: Intent?) {
        // 采用 when 语句类似 Java 的 switch 语句, 进行分发操作
        // 因为是在 广播接收者当中, 我们可以清晰知道 intent 不为 null
        // 所以在 intent 后面跟上了两个感叹号 !! 表示当前的 intent 一定不会为 null
        when (intent!!.action) {

            ACTION_ONE -> {
                val data = intent.getStringExtra("data")
                // 下面的语法, 可以看到 字符串表达式 $变量名称
                Log.i(TAG, "onReceive.data: $data")
            }

            ACTION_TWO -> {
                Log.i(TAG, "onReceive.BroadcastReceiver")
            }

            ACTION_THREE -> {
                Log.i(TAG, "onReceive.BroadcastReceiver")
            }
        }
    }
}
```







## 第二章 启动BroadcatReceiver

```kotlin
// 例如在 Activity 或者 Service 的 onCreate() 方法中
override fun onCreate() {
    super.onCreate()
		// 1. 创建广播接收器实例
        DemoReceiver receiver = DemoReceiver()
        // 2. 创建IntentFilter并添加要监听的Action
        val filter = IntentFilter().apply {
            addAction("com.example.MY_ACTION") 		 // 自定义Action
            addAction(Intent.ACTION_POWER_CONNECTED)  // 系统Action
        }
        // 3. 动态注册广播接收器
        registerReceiver(receiver, filter)
}
```

这里看到了一个关键字  `apply`  那么 `apply` 有什么作用呢? 

作用：可以进行链式调用

例如:  我们知道 ArrayList<T> 在进行添加元素时，那么可以编写下面的代码

```kotlin
val arrayList = ArrayList<String>().apply {
    add("hello")
    add("word")
    add("android")
}
```















