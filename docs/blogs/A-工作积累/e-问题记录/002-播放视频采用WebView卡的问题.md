# WebView 播放视频卡顿的解决方案



[[TOC]]





## 第一章 前言

### 第01节 视频问题

描述

```
在使用 webView 播放内置的视频的时候，出现了卡顿，点击全屏无效化的情况。
这种情况下，用户体验非常不好，需要进行优化处理。
```



解决

```
1. 清单文件当中的 Activity 需要开启硬件加速功能。 android:hardwareAccelerated="true"
2. webView 的Java代码, 需要进行缩放场景的一些设置。
```





### 第02节 页面问题

描述

```
在使用 WebView 加载的过程中，出现了如下的提示信息:
net:ERR_CLEARTEXT_NOT_PERMITTED
```



解决

```
1. 在清单文件的 application 当中
2. 添加  android:usesCleartextTraffic="true"
```







## 第二章 案例

### 第01节 清单文件核心

位置

```
src/main/AndroidManifest.xml
```

代码

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!--  访问网络的权限  -->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@drawable/ic_launcher"
        android:supportsRtl="true"
        android:theme="@style/Theme.GoodStudy"
        android:usesCleartextTraffic="true"
        tools:targetApi="31">
        <activity
            android:name=".ui.activity.DemoActivity"
            android:exported="true"
            android:hardwareAccelerated="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        
    </application>

</manifest>
```

这里核心关注的两行代码：

```java
android:usesCleartextTraffic="true"
android:hardwareAccelerated="true"
```





### 第02节 布局文件写法

位置 

```
src/main/res/layout/activity_demo.xml
```

代码

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <WebView
        android:id="@+id/web_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</FrameLayout>
```





### 第03节 Java 代码写法

位置

```
src/main/java/com/cosmo/good/study/ui/activity/DemoActivity.java
```

代码

```java

import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.cosmo.good.study.R;

public class DemoActivity extends AppCompatActivity {

    private WebView mWebView;
    private View mCustomView;    // 用于全屏渲染的视频 View
    private WebChromeClient.CustomViewCallback mCustomCallback;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_demo);

        mWebView = findViewById(R.id.web_view);

        // 问题: 如果 WebView 加载出现了 net:ERR_CLEARTEXT_NOT_PERMITTED
        // 解决: 在清单文件的 application 当中添加 android:usesCleartextTraffic="true"
        // --------------------------------------------------------------------------------------------------
        // 如果需要播放视频, 需要做一些设置：
        // 1. 清单文件, 开启硬件加速。  android:hardwareAccelerated="true"
        // 2. 代码设置, 操作如下:


        int flagHardware = WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED;
        int flagFullscreen = WindowManager.LayoutParams.FLAG_FULLSCREEN;
        int matchParent = ViewGroup.LayoutParams.MATCH_PARENT;

        getWindow().setFlags(flagHardware, flagHardware);
        mWebView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onShowCustomView(View view, CustomViewCallback customViewCallback) {
                super.onShowCustomView(view, customViewCallback);
                if (mCustomCallback != null) {
                    mCustomCallback.onCustomViewHidden();
                    mCustomCallback = null;
                    return;
                }
                getWindow().setFlags(flagFullscreen, flagFullscreen);
                ViewGroup parent = (ViewGroup) mWebView.getParent().getParent();
                parent.setVisibility(View.GONE);
                ((ViewGroup) parent.getParent()).addView(view, new ViewGroup.LayoutParams(matchParent, matchParent));
                mCustomView = view;
                mCustomCallback = customViewCallback;
            }

            @Override
            public void onHideCustomView() {
                super.onHideCustomView();
                if (mCustomView != null) {
                    if (mCustomCallback != null) {
                        mCustomCallback.onCustomViewHidden();
                        mCustomCallback = null;
                    }
                    getWindow().clearFlags(flagFullscreen);
                    if (mCustomView != null && mCustomView.getParent() != null) {
                        ViewGroup parent = (ViewGroup) mCustomView.getParent();
                        parent.removeView(mCustomView);
                        if (mWebView.getParent().getParent() != null) {
                            ViewGroup parent2 = (ViewGroup) mWebView.getParent().getParent();
                            parent2.setVisibility(View.VISIBLE);
                        }
                    }
                    mCustomView = null;
                }
            }
        });

        mWebView.getSettings().setJavaScriptEnabled(true);
        String url = "http://xxxx.xxxx.xxxx/#/xxxGuide";
        mWebView.loadUrl(url);
    }
}
```

























