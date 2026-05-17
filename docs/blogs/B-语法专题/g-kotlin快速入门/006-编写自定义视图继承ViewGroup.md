# 编写 自定义视图继承 ViewGroup









[[TOC]]





## 第一章 简单自定义视图继承 ViewGroup

```kotlin

import android.content.Context
import android.graphics.Color
import android.util.AttributeSet
import android.view.Gravity
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView

// 定义了 DemoLayout 类, 继承 ViewGroup 类
// 采用了 @JvmOverloads constructor 这种写法, 进行了 构造方法的重载写法
// 其中观察一下, 部分参数给出了默认值的情况。 如 attrs: AttributeSet? = null, defStyleAttr: Int = 0
// 在继承 View 的构造方法上面也定义 View(context, attrs, defstyleAttr)
class DemoLayout @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : ViewGroup(context, attrs, defStyleAttr) {

    private val imageView: ImageView
    private val textView: TextView

    // 点击监听器
    private var onClickListener: OnClickListener? = null

    init {
        // 初始化子View 创建 ImagevView 对象的同时, 给出了相关的宽度高度参数
        imageView = ImageView(context).apply {
            layoutParams = LayoutParams(
                LayoutParams.WRAP_CONTENT,
                LayoutParams.WRAP_CONTENT
            )
            scaleType = ImageView.ScaleType.CENTER_CROP
        }

        // 初始化自View 创建 TextView 对象的同时, 给出了相关的宽度高度参数
        textView = TextView(context).apply {
            layoutParams = LayoutParams(
                LayoutParams.WRAP_CONTENT,
                LayoutParams.WRAP_CONTENT
            )
            gravity = Gravity.CENTER
            setTextColor(Color.BLACK)
        }

        addView(imageView)
        addView(textView)

        // 设置自身可点击
        isClickable = true
        // 设置了监听事件
        setOnClickListener {
            onClickListener?.onClick(this)
        }
    }

    // 设置图片资源
    fun setImageResource(resId: Int) {
        imageView.setImageResource(resId)
    }

    // 设置文本
    fun setText(text: String) {
        textView.text = text
    }

    // 设置文本颜色
    fun setTextColor(color: Int) {
        textView.setTextColor(color)
    }

    // 设置点击监听器
    fun setOnItemClickListener(listener: OnClickListener) {
        this.onClickListener = listener
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        // 测量子View
        measureChildren(widthMeasureSpec, heightMeasureSpec)

        // 获取子View的测量尺寸
        val imageWidth = imageView.measuredWidth
        val imageHeight = imageView.measuredHeight
        val textWidth = textView.measuredWidth
        val textHeight = textView.measuredHeight

        // 计算总宽度和高度  maxOf 方法的作用: 返回两个值中的较大值。
        val width = maxOf(imageWidth, textWidth)
        val height = imageHeight + textHeight

        // 设置自身尺寸
        // setMeasuredDimension() 是自定义 View 测量流程的“最终确认”步骤。在 onMeasure() 中必调
        // View.resolveSize(int size, int measureSpec)：结合 MeasureSpec 模式自动适配尺寸
        setMeasuredDimension(
            resolveSize(width, widthMeasureSpec),
            resolveSize(height, heightMeasureSpec)
        )
    }

    override fun onLayout(changed: Boolean, l: Int, t: Int, r: Int, b: Int) {
        val width = r - l
        val imageWidth = imageView.measuredWidth
        val imageHeight = imageView.measuredHeight
        val textHeight = textView.measuredHeight

        // 布局图片View
        val imageLeft = (width - imageWidth) / 2
        imageView.layout(
            imageLeft,
            0,
            imageLeft + imageWidth,
            imageHeight
        )

        // 布局文本View
        val textWidth = textView.measuredWidth
        val textLeft = (width - textWidth) / 2
        textView.layout(
            textLeft,
            imageHeight,
            textLeft + textWidth,
            imageHeight + textHeight
        )
    }
}

```







## 第二章 在自定义视图采用DataBing写法

```kotlin

import android.content.Context
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import com.cosmo.tencent.R
import com.cosmo.tencent.databinding.LayoutDemoBinding
import com.cosmo.tencent.viewmodel.DemoViewModel

// 定义了 DemoLayout 类, 继承 ViewGroup 类
// 采用了 @JvmOverloads constructor 这种写法, 进行了 构造方法的重载写法
// 其中观察一下, 部分参数给出了默认值的情况。 如 attrs: AttributeSet? = null, defStyleAttr: Int = 0
// 在继承 View 的构造方法上面也定义 View(context, attrs, defstyleAttr)
class DemoLayout @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : ViewGroup(context, attrs, defStyleAttr) {

    // 定义 ViewModel
    private var viewModel: DemoViewModel? = null

    private val TAG = DemoLayout::class.simpleName

    // 这里是绑定 的操作
    private var binding: LayoutDemoBinding = DataBindingUtil.inflate(
        LayoutInflater.from(context),
        R.layout.layout_demo,
        this,
        true
    )


    init {
        // 事件监听
        binding.textView.setOnClickListener { listener?.onSuccess() }
    }


    //------------------------------------------------------------------
    // 定义回调的接口
    interface OnViewListener {
        fun onFail()
        fun onSuccess() {}
    }

    private var listener: OnViewListener? = null

    fun setOnViewListener(listener: OnViewListener) {
        this.listener = listener
    }
    //------------------------------------------------------------------

    // 设置 ViewModel
    fun setViewModel(viewModel: DemoViewModel) {
        this.viewModel = viewModel
    }

    override fun onLayout(p0: Boolean, p1: Int, p2: Int, p3: Int, p4: Int) {
        TODO("Not yet implemented")
    }
}
```









