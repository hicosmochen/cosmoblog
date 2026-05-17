# Splash的WebView





[[TOC]]





## 第一章 前言

### 第01节  提出问题

开发过程中遇到的问题

```
1、问题一：有时候开发需求，需要将 webView 嵌入 APP当中，但是会遇到了初次加载出现白屏的现象。
2、问题二：有时候需要快速启动APP，快速响应APP程序。
3、问题三：自定义视图，自定义属性的用法。
4、问题四：layer-list 基础案例介绍
5、问题五：属性动画的基础用法
6、问题六：Android设置字体的方式
```

接下来的案例代码当中，将会融入上面几个问题的答案。





### 第02接 分析问题

1、为什么 webView 使用的时候，会出现白屏的现象？

```
因为 webView 在使用的过程中，需要加载大量的网络资源，如 html、css、javascript 以及其他的资源文件。
webview 的显示，还必须在主线程当中实现，因此主线程会处于一段时间的阻塞过程中，这个过程，界面没有渲染，显示白屏
```

2、如何提升响应速度呢？

```
1、可以采用 splash 主题样式，在启动的过程中，直接跳转进入到主题。
2、当界面启动的时候，上层需要先加载一个 广告页面，底层加载WebView页面，等待WebView页面加载完毕，再移除广告页面。
```









### 第03节 效果展示

效果截图

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2023-08-19_14-07-10.png">



代码结构

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2023-08-19_13-49-20.png">







## 第二章 代码

### 第01节 splash主题

1、在 `res/values/themes.xml`  定义 splash 主题样式

案例代码如下：

```xml
<resources>
    <!--  定义 splash 界面的主题样式, 初始化状态设置为 无 ActionBar 全屏效果  -->
    <style name="MySplashTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="android:windowFullscreen">true</item>
        <item name="android:windowBackground">@drawable/mysplash</item>
    </style>
</resources>
```



2、在 `res/drawable` 当中定义 `mysplash.xml` 

案例代码如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">

    <item android:drawable="@color/rgb_71CCE0" />

    <item>
        <bitmap
            android:alpha="0.8"
            android:gravity="center"
            android:src="@drawable/logox" />
    </item>
</layer-list>
```



3、需要在安卓清单文件配置主题 `AndroidManifest.xml`

案例核心代码如下：

```xml
<application
    android:width="128dp"
    android:height="128dp"
    android:allowBackup="true"  
    android:icon="@mipmap/logo"
    android:label="@string/app_name"
    android:largeHeap="true" 
    android:supportsRtl="true"
    android:theme="@style/MySplashTheme"
    android:usesCleartextTraffic="true"
    tools:targetApi="31">
```

其中核心代码  `android:theme="@style/MySplashTheme"`



4、操作的效果

```
这样操作完毕之后，得到的效果如下：
	1、在点击 APP 图标的时候，能够快速的进入到应用程序当中
	2、可以给每个 Activity 设置相同统一的主题样式, 保证相同的自定义跳转样式
```







### 第02节 广告页面

1、自定义属性，在 `res/values/attrs.xml` 当中自定义属性

核心代码如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>

    <!--
    定义自定义属性, 包含如下参数
        1、 广告部分的背景颜色 backgroundColor
        2、 广告部分的背景图片 backgroundImage
        3、 广告部分是否显示文字动画 isAnimText
        4、 广告部分是显示文字内容 textMessage
        5、 广告部分是显示文字字体 adTextFont
        6、 广告部分文字的大小 adTextSize
        7、 广告部分文字的颜色 adTextColor
    -->
    <declare-styleable name="CommonMidView">
        <attr name="bgColor" format="color|integer" />
        <attr name="bgImage" format="reference|color" />
        <attr name="adIsAnimText" format="boolean" />
        <attr name="adTextMessage" format="reference|string" />
        <attr name="adTextSize" format="integer" />
        <attr name="adTextFont" format="string" />
        <attr name="adTextGravity" format="reference|integer" />
        <attr name="adTextColor" format="color|integer" />
    </declare-styleable>

</resources>
```



2、自定义广告类 `CommonMidView.java`

核心代码如下：

```java

import android.animation.Animator;
import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.graphics.Typeface;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;
import java.util.Collection;

// 中间插入的广告部分
public class CommonMidView extends FrameLayout {

    private int mBgColor;
    private int mBgImage;
    private String mTextMessage;
    private int mAdTextColor;
    private int mAdTextSize;
    private String mAdTextFont;
    private boolean mIsAnimText;
    private int mAdTextGravity;
    private TextView mTextView;
    private Context mContext;

    public CommonMidView(@NonNull Context context) {
        this(context, null);
    }

    public CommonMidView(@NonNull Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public CommonMidView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        this(context, attrs, defStyleAttr, 0);
    }

    public CommonMidView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        initView(context, attrs, defStyleAttr, defStyleRes);
    }

    private void initView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        this.mContext = context;
        this.mTextView = new TextView(context);
        this.mTextView.setLayoutParams(new LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        this.mTextView.setGravity(Gravity.CENTER);
        this.mTextView.setVisibility(View.VISIBLE);
        addView(mTextView);
        //-------------------------------------------------------------------------------
        //初始化自定义属性的操作
        TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.CommonMidView);
        mBgColor = typedArray.getColor(R.styleable.CommonMidView_bgColor, 0);
        mBgImage = typedArray.getResourceId(R.styleable.CommonMidView_bgImage, 0);
        mIsAnimText = typedArray.getBoolean(R.styleable.CommonMidView_adIsAnimText, false);
        mTextMessage = typedArray.getString(R.styleable.CommonMidView_adTextMessage);
        mAdTextColor = typedArray.getColor(R.styleable.CommonMidView_adTextColor, 0);
        mAdTextSize = typedArray.getInt(R.styleable.CommonMidView_adTextSize, 0);
        mAdTextFont = typedArray.getString(R.styleable.CommonMidView_adTextFont);
        mAdTextGravity = typedArray.getInt(R.styleable.CommonMidView_adTextGravity, 0);

        typedArray.recycle();
        // 这里颜色和背景图，在内存当中加载的时候，可能是负数，需要判断是 非零（默认值）情况下才做加载
        if (mBgColor != 0) {
            setBackgroundColor(mBgColor);
        }
        if (mBgImage != 0) {
            setBackgroundResource(mBgImage);
        }
        if (mAdTextColor != 0) {
            mTextView.setTextColor(mAdTextColor);
        }
        if (mAdTextSize != 0) {
            mTextView.setTextSize(mAdTextSize);
        }

        Log.e("cosmo", "cosmo.initView....mTextMessage: " + mTextMessage);

        setAdTextSize(mAdTextSize);
        setAdTextColor(mAdTextColor);
        setAdTextFont(mAdTextFont);
        setTextMessage(mTextMessage);
        setIsAnimText(mIsAnimText);
        setAdTextGravity(mAdTextGravity);
        //-----------------------------------------------------------------------------------
    }

    // 设置文字的动画效果。属性动画，组合播放
    private void animationText() {
        ObjectAnimator scaleAnimator1 = ObjectAnimator.ofFloat(mTextView, "alpha", 0.0F, 1.0F).setDuration(1500);
        scaleAnimator1.setRepeatCount(0);
        ObjectAnimator scaleAnimator2 = ObjectAnimator.ofFloat(mTextView, "scaleX", 0.0F, 1.5F).setDuration(1000);
        scaleAnimator2.setRepeatCount(0);
        ObjectAnimator scaleAnimator3 = ObjectAnimator.ofFloat(mTextView, "scaleY", 0.0F, 1.5F).setDuration(1000);
        scaleAnimator3.setRepeatCount(0);
        Collection<Animator> arrayAnimator = new ArrayList<>();
        arrayAnimator.add(scaleAnimator1);
        // arrayAnimator.add(scaleAnimator2);
        // arrayAnimator.add(scaleAnimator3);
        AnimatorSet set = new AnimatorSet();
        set.playTogether(arrayAnimator);
        set.start();
    }


    public int getBGColor() {
        return mBgColor;
    }

    public void setBGColor(int mBgColor) {
        this.mBgColor = mBgColor;
        if (mBgColor != 0) {
            setBackgroundColor(mBgColor);
        } else {
            setBackgroundColor(Color.TRANSPARENT);
        }
    }

    public int getBGImage() {
        return mBgImage;
    }

    public void setBGImage(int mBgImage) {
        this.mBgImage = mBgImage;
        if (mBgImage != 0) {
            setBackgroundResource(mBgImage);
        } else {
            setBackgroundColor(Color.TRANSPARENT);
        }
    }

    public String getTextMessage() {
        return mTextMessage;
    }

    public void setTextMessage(String mTextMessage) {
        this.mTextMessage = mTextMessage;
        mTextView.setText(mTextMessage);
        mTextView.setVisibility(TextUtils.isEmpty(mTextMessage) ? View.GONE : View.VISIBLE);
    }


    public boolean isIsAnimText() {
        return mIsAnimText;
    }

    public void setIsAnimText(boolean mIsAnimText) {
        this.mIsAnimText = mIsAnimText;
        if ((!TextUtils.isEmpty(mTextMessage)) && mIsAnimText) {
            animationText();
        }
    }

    public int getAdTextColor() {
        return mAdTextColor;
    }

    public void setAdTextColor(int mAdTextColor) {
        this.mAdTextColor = mAdTextColor;
        mTextView.setTextColor(mAdTextColor == 0 ? Color.TRANSPARENT : mAdTextColor);
    }

    public int getAdTextSize() {
        return mAdTextSize;
    }

    public void setAdTextSize(int mAdTextSize) {
        this.mAdTextSize = mAdTextSize;
        mTextView.setTextSize(mAdTextSize);
    }

    public void setAdTextFont(String mAdTextFont) {
        this.mAdTextFont = mAdTextFont;
        Typeface typeface = Typeface.createFromAsset(mContext.getAssets(), mAdTextFont);
        mTextView.setTypeface(typeface);
    }

    // 这里根据传入的 mAdTextGravity 数据值, 设置文本显示的位置
    // 0  表示显示在屏幕的正中央
    // -1 表示显示在屏幕的底部中央
    // -2 表示显示在屏幕的底部靠左
    // -3 表示显示在屏幕的底部靠右
    // 1  表示显示在屏幕的顶部中央
    // 2  表示显示在屏幕的顶部左边
    // 3  表示显示在屏幕的顶部右边
    public void setAdTextGravity(int mAdTextGravity) {
        this.mAdTextGravity = mAdTextGravity;
        if (mAdTextGravity == 0) {
            mTextView.setGravity(Gravity.CENTER);
        }
        if (mAdTextGravity == -1) {
            mTextView.setGravity(Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL);
        }
        if (mAdTextGravity == -2) {
            mTextView.setGravity(Gravity.BOTTOM | Gravity.START);
        }
        if (mAdTextGravity == -3) {
            mTextView.setGravity(Gravity.BOTTOM | Gravity.END);
        }
        if (mAdTextGravity == 1) {
            mTextView.setGravity(Gravity.TOP | Gravity.CENTER_HORIZONTAL);
        }
        if (mAdTextGravity == 2) {
            mTextView.setGravity(Gravity.TOP | Gravity.START);
        }
        if (mAdTextGravity == 3) {
            mTextView.setGravity(Gravity.TOP | Gravity.END);
        }
    }
}
```







### 第03节 webView 封装

1、自定义属性，在 `res/values/attrs.xml` 当中自定义属性

核心代码如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
 
    <!--
        定义自定义属性, 包含如下参数
            1、访问网络地址 url
            2、URL加载完毕之后，延迟等待的时间 delay
    -->
    <declare-styleable name="CommonWebView">
        <attr name="url" format="string" />
        <attr name="delay" format="integer" />
    </declare-styleable>

</resources>
```



2、自定义类 `CommonWebView.java`

```java

import android.content.Context;
import android.content.res.TypedArray;
import android.os.Handler;
import android.os.Looper;
import android.util.AttributeSet;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

// 自定义的 WebView
public class CommonWebView extends WebView {

    private String mUrl;
    private long mDelay;
    private final long DEFAULT_DELAY_MILLIS = 3000L;
    private OnPageFinishListener onPageFinishListener;

    public CommonWebView(@NonNull Context context) {
        this(context, null);
    }

    public CommonWebView(@NonNull Context context, @Nullable AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public CommonWebView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr, 0);
        initView(context, attrs, defStyleAttr, 0);
    }


    // 执行一系列初始化数据的操作
    private void initView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        //---------------------------------------------------------------------------------------
        //初始化自定义属性的操作
        TypedArray typedArray = context.obtainStyledAttributes(attrs, R.styleable.CommonWebView);
        mUrl = typedArray.getString(R.styleable.CommonWebView_url);
        mDelay = typedArray.getInt(R.styleable.CommonWebView_delay, 0);
        typedArray.recycle();
        // 这里颜色和背景图，在内存当中加载的时候，可能是负数，需要判断是 非零（默认值）情况下才做加载
        if (mDelay == 0) {
            mDelay = DEFAULT_DELAY_MILLIS;
        }
        //---------------------------------------------------------------------------------------
        // 清除一些数据
        clearCache(true);
        clearFormData();
        clearHistory();
        // 定义缩放
        setInitialScale(1);
        // 做一些基础的配置
        WebSettings settings = getSettings();
        settings.setSupportZoom(true);  // 设置支持缩放
        settings.setUseWideViewPort(true);   // 设置使用宽视图端口
        settings.setLoadWithOverviewMode(true); // 设置加载概览模式
        settings.setMediaPlaybackRequiresUserGesture(false);  // 设置媒体播放需要用户手势
        settings.setDomStorageEnabled(true);    // 设置 DOM 存储已启用
        settings.setAllowUniversalAccessFromFileURLs(true); // 设置允许从文件URL进行通用访问
        settings.setJavaScriptEnabled(true);    // 设置需要JavaScript 支持
        settings.setJavaScriptCanOpenWindowsAutomatically(true);  // 设置Java脚本可以自动打开Windows
        settings.setAllowFileAccess(true);  // 设置允许文件访问

        // 设置操作完毕之后的回调监听器
        setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                // 当页面加载完毕的时候, 给出一段时间延迟, 用于改变回显
                new Handler(Looper.getMainLooper()).postDelayed(() -> {
                    if (onPageFinishListener != null) {
                        onPageFinishListener.onFinish(url);
                    }
                }, mDelay);
            }
        });

        // 加载页面
        loadUrl(mUrl);
    }

    public void setOnPageFinishListener(OnPageFinishListener onPageFinishListener) {
        this.onPageFinishListener = onPageFinishListener;
    }

    // 获取到延时的时间
    public long getDelay() {
        return mDelay;
    }

    // 设置延时时间
    public void setDelay(long mDelay) {
        this.mDelay = mDelay;
    }

    // 加载网页的操作
    public void loadUrl(@NonNull String url) {
        super.loadUrl(url);
        this.mUrl = url;
    }

    // 可以回退的操作
    public boolean canGoBack() {
        return super.canGoBack();
    }

    public void goBack() {
        super.goBack();
    }

    // 页面完成的监听器
    public interface OnPageFinishListener {
        void onFinish(String url);
    }
}
```



3、需要做域名配置，在 `res/xml/network_security_config.xml` 当中

核心代码

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true" />
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">baidu.com</domain>
        <!-- 如果需要多个域名，可以添加多个 <domain> 标签 -->
    </domain-config>
</network-security-config>
```







### 第04节 衔接部分 Activity 

1、布局文件  `res/layout/activity_main.xml` 

核心代码写法

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    
    <!--
      	WebView页面, 当页面加载完毕之后，延迟500毫秒消去广告，以及定义访问的网址
    -->
    <com.demo.screen.CommonWebView
        android:id="@+id/common_web_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:delay="500"
        app:url="https://xuwei.plus/cosmo" />


    <!--
      	广告页面, 中间显示的文字界面，这里可以切换成为广告图片
		注意：如果设置了背景颜色和背景图片，背景图片会覆盖背景颜色，这里是由于Java代码控制的
    -->
    <com.demo.screen.CommonMidView
        android:id="@+id/common_mid_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:adIsAnimText="true"
        app:adTextColor="@color/white"
        app:adTextFont="font/xingshu.ttf"
        app:adTextGravity="-1"
        app:adTextMessage="心之所向\n\n\n力之所往\n\n"
        app:adTextSize="25"
        app:bgColor="@color/rgb_EC6303"
        app:bgImage="@mipmap/bigback" />


</FrameLayout>
```



2、准备颜色文件 `res/values/colors.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="black">#FF000000</color>
    <color name="white">#FFFFFFFF</color>
    <color name="rgb_EC6303">#EC6303</color>
    <color name="rgb_2A7E66">#2A7E66</color>
    <color name="rgb_71CCE0">#71CCE0</color>
</resources>
```



3、Activity 部分的核心代码

```java
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private CommonWebView mCommonWebView;
    private CommonMidView mCommonMidView;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mCommonWebView = findViewById(R.id.common_web_view);
        mCommonMidView = findViewById(R.id.common_mid_view);

        // 当页面加载完毕的时候, 拿到中间广告页面, 隐藏掉中间的广告界面
        mCommonWebView.setOnPageFinishListener(paramURL -> {
            mCommonMidView.setVisibility(View.GONE);
        });
    }


    @Override
    public void onBackPressed() {
        if (mCommonWebView.canGoBack()) {
            mCommonWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
```





















