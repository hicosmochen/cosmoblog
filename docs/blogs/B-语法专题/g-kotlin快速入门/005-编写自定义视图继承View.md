# 编写 自定义视图继承 View









[[TOC]]





## 第一章 简单自定义视图继承 View

```kotlin

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.util.AttributeSet
import android.view.View

// 定义了 DemoView 类, 继承 View 类
// 采用了 @JvmOverloads constructor 这种写法, 进行了 构造方法的重载写法
// 其中观察一下, 部分参数给出了默认值的情况。 如 attrs: AttributeSet? = null, defStyleAttr: Int = 0
// 在继承 View 的构造方法上面也定义 View(context, attrs, defstyleAttr)
class DemoView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    // 创建画笔对象, 仔细观察, 可以看到这里采用了 apply 进行链式设置数据值
    private val paint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.BLACK      // 文字颜色
        textSize = 50F           // 文字大小（单位：像素）
        textAlign = Paint.Align.CENTER // 文字对齐方式
    }

    // 重写了 onDraw() 方法
    // 这里的 width 和 height 实际上是省略了 getWith() 方法 和 getHeight() 方法
    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)

        // 计算文字绘制的中心位置
        val centerX = width / 2f
        // 这里的操作是为了通过 paint 来计算出垂直文本的居中效果
        val centerY = height / 2f - (paint.descent() + paint.ascent()) / 2f

        // 绘制文字
        canvas.drawText("HelloWorld", centerX, centerY, paint)
    }
}

```







## 第二章 在自定义视图实现接口暴露

自定义 View 继承 View 的方式，设置对外的点击事件写法

```java

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.util.AttributeSet
import android.view.View

class DemoView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    private val textPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = Color.BLACK
        textSize = 50f
        textAlign = Paint.Align.CENTER
    }

    private var text = "HelloWorld"

    // 定义了点击事件的监听器, 这里可以为 null
    private var onClickListener: OnClickListener? = null

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)

        // 计算文字绘制位置（垂直居中）
        val x = width / 2f
        val y = height / 2f - (textPaint.descent() + textPaint.ascent()) / 2f

        canvas.drawText(text, x, y, textPaint)
    }

    // 对外暴露出点击事件的监听，设置 isClickable = true 使视图可点击
    fun setOnTextClickListener(listener: OnClickListener) {
        this.onClickListener = listener
        isClickable = true
    }

    // 必须重写 performClick() 以确保可访问性
    override fun performClick(): Boolean {
        super.performClick()
        onClickListener?.onClick(this)
        return true
    }

    // 设置文字内容
    fun setText(text: String) {
        this.text = text
        invalidate() // 重绘视图
    }

    // 设置文字颜色
    fun setTextColor(color: Int) {
        textPaint.color = color
        invalidate() // 重绘视图
    }

    // 设置文字大小
    fun setTextSize(size: Float) {
        textPaint.textSize = size
        invalidate() // 重绘视图
    }
}

```

在 Activity 当中完成点击效果

```kotlin
val demoView = findViewById<DemoView>(R.id.demo_view)   
demoView.setOnTextClickListener {
    // 处理点击事件
    Toast.makeText(this, "HelloWorld clicked!", Toast.LENGTH_SHORT).show()
    
    // 可以动态修改文字属性
    demoView.setText("Clicked!")
    demoView.setTextColor(Color.RED)
    demoView.setTextSize(60f)
}

```









