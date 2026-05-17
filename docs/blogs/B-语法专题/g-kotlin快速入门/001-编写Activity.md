# 编写 Activity





[[TOC]]









## 第一章 简单Activity

```kotlin
import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.cosmo.tencent.R
import java.io.Serializable

// 写了一个类, 类名称是 DemoActivity 继承了 AppCompatActivity 类, 实现了 Serializable 接口
// 继承类 和 实现接口 都是采用的 :
// 【1】 对于类来说, 后面需要有小括号() 用来表示构造方法
// 【2】 对于接口来说, 后面不需要小括号, 直接跟上接口名称即可
class DemoActivity : AppCompatActivity(), Serializable {

    // 定义一个常量 TAG 获取当前类的简称名称
    private val TAG = DemoActivity::class.simpleName

    // 重写了生命周期的方法 onCreate() 其中 Bundle 有可能会为 null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_demo)

        // 获取到 TextView 的对象
        val mTextView: TextView = findViewById(R.id.text_view)

        // 设置点击事件, 可以直接省略 view->{} 如果需要使用省略的 view 可以采用 it 替代
        mTextView.setOnClickListener {
            Toast.makeText(this, "helloWorld", Toast.LENGTH_SHORT).show()
        }

    }
}
```









## 第二章 databing 写法

```kotlin

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.ViewModelProvider
import com.cosmo.tencent.databinding.ActivityDemoBinding
import com.cosmo.tencent.viewmodel.DemoViewModel
import java.io.Serializable

// 写了一个类, 类名称是 DemoActivity 继承了 AppCompatActivity 类, 实现了 Serializable 接口
// 继承类 和 实现接口 都是采用的 :
// 【1】 对于类来说, 后面需要有小括号() 用来表示构造方法
// 【2】 对于接口来说, 后面不需要小括号, 直接跟上接口名称即可
class DemoActivity : AppCompatActivity(), Serializable {

    // 定义一个常量 TAG 获取当前类的简称名称
    private val TAG = DemoActivity::class.simpleName

    // 定义了成员变量, 因为明确了, 他的初始化时机。
    // 我们可以添加关键字 lateinit （延迟初始化）允许你声明一个非空（non-null）类型的变量，但暂时不初始化它，稍后再赋值。
    private lateinit var viewModel: DemoViewModel
    private lateinit var binding: ActivityDemoBinding


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // 查找到 BinDing 的对象. 注意 ActivityDemoBinding 他是根据我们的 R.layout.activity_demo 来自动生成的类
        binding = ActivityDemoBinding.inflate(layoutInflater)
        // 设置布局文件, 直接指定根布局
        setContentView(binding.root)
        // 初始化 ViewModel 的实现, 主要 DemoViewModel 的写法就是 class DemoViewModel : ViewModel() { }
        viewModel = ViewModelProvider(this).get(DemoViewModel::class.java)
        // 绑定 ViewModel
        binding.viewModel = viewModel
        // 绑定生命周期
        binding.lifecycleOwner = this


        // 设置点击事件, 可以直接省略 view->{} 如果需要使用省略的 view 可以采用 it 替代
        binding.textView.setOnClickListener {
            Toast.makeText(this, "helloWorld", Toast.LENGTH_SHORT).show()
        }

    }
}
```

















































