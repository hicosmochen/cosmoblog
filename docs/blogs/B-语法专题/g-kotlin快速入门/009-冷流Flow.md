# 冷流 Flow









[[TOC]]







## 第一章 基础介绍

### 第01节 概述说明

什么是 Flow ?

```
1、在 Kotlin 语法当中, Flow 是一种用于处理异步数据流响应式的编程范式，它提供了一种声明式的处理顺序，可能异步产生数据。
2、Flow 是 Kotlin 协程（Coroutines） 生态系统的一部分，广泛应用于 Android 开发中。
3、适用于下面的一些场景：
	A. 网络请求		从API获取数据，并且逐条处理
	B. 数据库操作	监听数据库变化，实时更新 UI
	C. 事件监听		如传感器数据、用户输入等
	D. 状态管理		在 MVVM 架构中，使用 Flow 管理 UI 状态
```

 

### 第02节 对比说明

| 特性         | Flow                         | Stream                                     |
| ------------ | ---------------------------- | ------------------------------------------ |
| 语言/平台    | `Kotlin`协程                 | `Java 8 +`                                 |
| 是否支持挂起 | 是                           | 否                                         |
| 是否为冷流   | 是                           | 否（默认为热流）                           |
| 线程模式     | 协程调度器控制               | 通常在主线程 或者  自定义线程池中运行      |
| 数据处理方式 | 异步、非阻塞                 | 同步、阻塞（除非集合 `CompletableFuture`） |
| 适用场景     | 异步 IO、网络请求、UI 更新等 | 内存中数据的批量处理、转换                 |
| 生命周期管理 | 与协程绑定，易于取消         | 需手动管理                                 |

设计哲学差异

```
1、 Flow 面向协程的异步数据流
	A. Flow的设计初衷是为了更好地支持 Kotlin 协程生态系统。
	B. 特别是在 Android 开发过程中, 它可以与 LiveData、ViewModel 等组件无缝集成。
	C. 非常适合处理网络请求、数据库更新 等异步处理场景
	例如: 在 retrofit 当中, 我们可以将 suspend 函数 封装成为 Flow 以便于在 UI层中 安全地收集数据
	
2、Stream 面向集合的函数式处理
	A. Stream 更像是 Java 当中一种 "声明式" 的数据处理方式
	B. 强调的是对集合的转换和聚合操作, 而不是异步数据流的推送与消费
	C. 它更适合处理静态数据集, 而非动态生成或者异步获取的数据
```

性能与资源管理

```
1、 Flow 的优势
	A. 轻量级		Flow 在协程当中运行, 可以利用协程调度器优化线程切换
	B. 可取消性		当协程被取消时，Flow也会自动停止，避免资源泄漏
	C. 背压控制		可以通过 buffer()、confalte() 等操作符控制数据流速率
	
2、Stream 的局限
	A. 同步阻塞				如果在主线程中使用 stream 处理大量数据，可能会导致 UI卡顿
	B. 不可取消				一旦启动，无法直接中断 stream 的处理过程
	C. 不适合异步数据源		如网络请求、传感器数据等，需要借助其他机制。（如 CompletableFuture） 配合使用。
```







## 第二章 用法介绍

### 第01节 创建Flow

**方式一** 构建器创建 Flow

```kotlin
val demoFlow = flow {
    emit(1)
    delay(1000)
    emit(2)
    delay(1000)
    emit(3)
}
```

**方式二** 使用 asFlow 转换集合，将普通的集合转换成为 flow

```kotlin
val demoList = listOf{ "A", "B", "C"}
val demoFlow = demoList.asFlow()
```

**方式三** 使用 `channelFlow` 创建基于 `Channel` 的 flow 适用于更底层的控制

```kotlin
val demoFlow = channelFlow {
    send("hello")
    send("world")
}
```







### 第02节 收集Flow

 **collect** 收集

```kotlin
import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoList = listOf("A", "B", "C")
        val demoFlow = demoList.asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 collect 收集到数据, 对数据进行输出处理
            demoFlow.collect {
                Log.i(TAG, "it: $it")
            }
        }
    }
}

// 输出结果 A  B  C
```

**onEach** 预览

```kotlin
import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoList = listOf(11, 12, 13, 14)
        val demoFlow = demoList.asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 onEach 每个元素出发前 【可以查阅数据值】, 再采用 collect 进行收集消费操作
            // 思考的作用: 可以对数据进行输出, 查看原始数据的数据值, 便于调试程序
            demoFlow.onEach {
                Log.i(TAG, "it: $it")
            }.collect {
                Log.i(TAG, "it: $it")
            }
        }
    }
}
// 输出结果
// 11  11  12  12  13  13  14  14 
```





















### 第03节 变换操作符

**map** 对每个元素进行映射

```kotlin
import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoList = listOf(11, 12, 13)
        val demoFlow = demoList.asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 map 对数据进行 【转换】 的处理, 再采用 collect 进行收集消费操作
            demoFlow.map {
                it * 2
            }.collect {
                Log.i(TAG, "it: $it")
            }
        }
    }
}

// 输出结果 22  24  26
```

**filter** 过滤

```kotlin
import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.filter
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoList = listOf(11, 12, 13)
        val demoFlow = demoList.asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 filter 对数据进行 【过滤】 的处理, 再采用 collect 进行收集消费操作
            demoFlow.filter {
                it % 2 == 0
            }.collect {
                Log.i(TAG, "it: $it")
            }
        }
    }
}

// 输出结果 12
```

**flatMapLatest** 将每个元素转换成为一个新的 `Flow` 并且只保留最新的那个

```kotlin
import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoList = listOf(11, 12, 13, 14)
        val demoFlow = demoList.asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 flatMapLatest 对每一个数据进行 【转换新流】 的处理 保留最新的, 再采用 collect 进行收集消费操作
            demoFlow.flatMapLatest {
                flow {
                    emit(it * 10)
                    emit(it * -10)
                }
            }.collect {
                Log.i(TAG, "it: $it")
            }
        }
    }
}
// 输出结果 110 -110  120 -120  130 -130  140 -140
```



**scan** 累积计算

```kotlin
import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.scan
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoList = listOf(11, 12, 13, 14)
        val demoFlow = demoList.asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 scan(0) 初始数据是 sum = 0  不断地进行累加, 保留累加的数值
            // scan 【累积计算】 类似于求和的操作, 会保留中间求和的值,  再采用 collect 进行收集消费操作
            demoFlow.scan(0) { sum, it ->
                it + sum
            }.collect {
                Log.i(TAG, "it: $it")
            }
        }
    }
}
// 输出结果
// 0  11  23  36  50
```









### 第04节 组合操作符

**zip** 将两个 `Flow` 的元素按照顺序匹对

```kotlin
import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.zip
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoFlowOne = listOf(11, 22, 33, 44, 55).asFlow()
        val demoFlowTwo = listOf(10, 20, 30, 40).asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 zip 将两个 Flow 的元素按顺序配对 【顺序匹对】  再采用 collect 进行收集消费操作
            // 注意: 只是匹配对应上的数据，其中 55 没有匹配上, 不会在 collect 结果中显示
            demoFlowOne.zip(demoFlowTwo) { emlementOne, emlementTwo ->
                emlementOne + emlementTwo
            }.collect {
                Log.i(TAG, "it: $it")
            }
        }
    }
}
// 输出结果
// 21  42  63  84
```

**combine** 合并多个 `Flow` 每当任意一个发生变化时触发

```kotlin
import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoFlowOne = listOf(11, 22, 33, 44, 55).asFlow()
        val demoFlowTwo = listOf(10, 20, 30, 40).asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 combine 将两个 Flow 的元素按顺序配对 【顺序匹对】  再采用 collect 进行收集消费操作
            // 注意: 其中 55 因为没有匹配项, 那么会继续使用最后一项作为匹配项, 进行运算。 40 + 55 = 95
            demoFlowOne.combine(demoFlowTwo) { emlementOne, emlementTwo ->
                emlementOne + emlementTwo
            }.collect {
                Log.i(TAG, "it: $it")
            }
        }
    }
}
// 输出结果
// 21  42  63  84  95
```





### 第05节 错误处理

**catch** 捕获异常流并且继续流

```kotlin
import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.scan
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoList = listOf(11, 12, 13, 14)
        val demoFlow = demoList.asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 catch 可以【捕获异常流并且继续流】, 再采用 collect 进行收集消费操作
            demoFlow.scan(0) { sum, it ->
                (sum + it) / 0
            }.catch { exception ->
                Log.e(TAG, "catch: exception: $exception")
            }.collect {
                Log.i(TAG, "it: $it ")
            }
        }
    }
}
// 输出结果
// 0
// catch: exception: java.lang.ArithmeticException: divide by zero
```



**retry** 重试

```kotlin
import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.retry
import kotlinx.coroutines.flow.scan
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoList = listOf(11, 12, 13, 14)
        val demoFlow = demoList.asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 retry 试着尝试了 3次 , 再采用 collect 进行收集消费操作
            demoFlow.scan(0) { sum, it ->
                (sum + it) / 0
            }.retry(3)
                .catch { exception ->
                    Log.e(TAG, "catch: exception: $exception")
                }.collect {
                    Log.i(TAG, "it: $it ")
                }
        }
    }
}
// 输出结果
// 0 0 0 0
// catch: exception: java.lang.ArithmeticException: divide by zero
```



**onCompletion** 流完成 或者 取消时 执行

```kotlin

import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.onCompletion
import kotlinx.coroutines.flow.scan
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoList = listOf(11, 12, 13, 14)
        val demoFlow = demoList.asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 onCompletion 【流完成或者取消时】执行 , 再采用 collect 进行收集消费操作
            demoFlow.scan(0) { sum, it ->
                (sum + it) / 0
            }.catch {
                Log.e(TAG, "catch: it: $it")
            }.onCompletion {
                Log.i(TAG, "onCompletion: it: $it")
            }.collect {
                Log.i(TAG, "it: $it ")
            }
        }
    }
}
// 输出结果
// 0
// catch: it: java.lang.ArithmeticException: divide by zero
// onCompletion: it: null

```







### 第06节 背压处理

**conflate** 丢弃旧的值，只保留最新的

```kotlin
import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.conflate
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoList = listOf(11, 12, 13, 14, 15)
        val demoFlow = demoList.asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 conflate 【丢弃旧的值，只保留最新的】执行 , 再采用 collect 进行收集消费操作
            demoFlow.conflate().collect {
                Log.i(TAG, "it: $it ")
            }
        }
    }
}
// 输出结果
// 11  15
```

**buffer** 缓冲一定数据的元素

```kotlin
import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.buffer
import kotlinx.coroutines.flow.conflate
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoList = listOf(11, 12, 13, 14, 15)
        val demoFlow = demoList.asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 conflate 丢弃旧值, 保留新值。 需要保留多少个新值呢?
            // 采用 buffer(3) 来记录保存的新值, 表示【从后往前, 保留3个新值】, 再采用 collect 进行收集消费操作
            demoFlow.conflate().buffer(3).collect {
                Log.i(TAG, "it: $it ")
            }
        }
    }
}
// 输出结果
// 11  13  14  15
```

**dropWhile** 丢弃满足条件的元素，直到第一个不满足条件的元素出现

```kotlin
import android.util.Log
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.buffer
import kotlinx.coroutines.flow.conflate
import kotlinx.coroutines.flow.dropWhile
import kotlinx.coroutines.launch

class DemoViewModel : ViewModel() {

    private val TAG = DemoViewModel::class.simpleName

    val viewModelScope: CoroutineScope by lazy {
        // 创建一个与 ViewModel 生命周期绑定的 Scope
        CoroutineScope(SupervisorJob() + Dispatchers.Main)
    }

    fun demo() {
        val demoList = listOf(10, 11, 12, 13, 14, 15, 16, 17)
        val demoFlow = demoList.asFlow()

        viewModelScope.launch {
            // 在协程当中, 采用 dropWhile 丢弃满足条件的元素，直到第一个不满足条件的元素出现。
            // 第一步 从 Flow 流中 dropWhile 舍弃掉 第一个数据是偶数的情况，丢弃了 10
            // 第二步 进行 conflate() 丢弃旧值的处理
            // 第三步 缓存 buffer(2) 两个数据值
            demoFlow.dropWhile {
                it % 2 == 0
            }.conflate()
                .buffer(2)
                .collect {
                    Log.i(TAG, "it: $it ")
                }
        }
    }
}
// 输出结果
// 11  16  17
```











