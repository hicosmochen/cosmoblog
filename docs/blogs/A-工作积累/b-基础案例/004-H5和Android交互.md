# H5和Android交互





[[TOC]]







## 第一章 效果介绍

### 第01节 效果展示

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2023-09-03_16-03-51.png">





### 第02节 过程介绍

一、准备 H5的页面

```
1、在 HTML 当中需要定义 JavaScript 
2、在 JavaScript 当中定义函数， 调用函数，该函数是来自于 Android 端定义的接口
```



二、准备 Android 端

```
1、需要定义 JavaScript 的支持 webView.getSettings().setJavaScriptEnabled(true);
2、需要添加监听操作 webView.addJavascriptInterface(参数1, 参数2);
```



三、过程介绍

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2023-09-03_16-30-09.png">













## 第二章 案例代码

### 第01节 HTML 部分代码

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Simple H5 Page</title>
</head>
<body>

<button onclick="myFunction(1)">点击按钮1</button>
<br/><br/><br/>

<button onclick="myFunction(2)">点击按钮2</button>
<br/><br/><br/>

<button onclick="myFunction(3)">点击按钮3</button>
<br/><br/><br/>

<script>
    function myFunction(obj) {

       javaScriptObject.callFunction(obj);
    }

</script>
</body>
</html>
```







### 第02节 Android 部分代码

Java 部分代码，代码位置 `src/main/java/DemoActivity.java`

```java

import android.content.Context;
import android.os.Bundle;
import android.text.TextUtils;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.cosmo.good.study.R;

public class DemoActivity extends AppCompatActivity {

    private WebView webView;
    private Context context = DemoActivity.this;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_demo);

        webView = findViewById(R.id.web_view);

        webView.getSettings().setJavaScriptEnabled(true);   // 支持 JavaScript
        webView.loadUrl("file:///android_asset/mock/hello.html");

        webView.addJavascriptInterface(new MyScriptToJava(), "javaScriptObject");
    }

    class MyScriptToJava {
        @JavascriptInterface
        public void callFunction(String message) {
            runOnUiThread(() -> {

                if (TextUtils.equals(message, "1")){
                    Toast.makeText(context, "操作的是111", Toast.LENGTH_LONG).show();
                }
                if (TextUtils.equals(message, "2")){
                    Toast.makeText(context, "操作的是222", Toast.LENGTH_LONG).show();
                }
                if (TextUtils.equals(message, "3")){
                    finish();
                }
            });
        }
    }
}
```





布局文件的代码 ，代码位置 `src/main/res/layout/activity_demo.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <WebView
        android:id="@+id/web_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```















