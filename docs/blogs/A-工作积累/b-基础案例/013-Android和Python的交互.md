# Android 和 Python的交互



[[TOC]]





## 第一章 准备工作

### 第01节   下载 python

下载地址

```
https://www.python.org/downloads/
```



<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2025-04-16_06-39-00.png">





### 第02节 安装 python

在安装的过程中, 记得勾选配置环境变量

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2025-04-16_06-39-01.png">

> 在这里需要注意两点内容：
>
> 1、安装的路径。这个路径需要记录一下，后续在 安卓的 build.gradle 当中需要进行配置
>
> 2、添加到环境变量中，下面选择了   `Add python.exe to PATH`





### 第03节 检测环境变量

在 cmd 控制台当中，输入指令  

```
python  --version
```

如果出现了详细的版本信息，那么表示当前的 python 安装成功了。

效果如下

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2025-04-16_06-39-02.png">







## 第二章 安卓使用

### 第01节  项目导入环境

在 app/build.gradle 当中，引入下面三处代码实现。

第1处，需要在 plugins 里面引入下面的内容

```groovy
plugins {
    //.....需要引入下面的内容, 其他的内容省略......
    id 'com.chaquo.python' version '16.0.0'
}
```



第2处，需要在 android 里面引入下面的内容

```groovy
android {
	// .......需要引入下面的内容(当前 python 文件存在的路径), 其他的内容省略........
    sourceSets {
        main {
            python.srcDir "src/main/python"
        }
    }
}
```



第03处，需要在 android  defaultConfig 里面引入下面的内容

```groovy
android {
    defaultConfig { 

        // .......需要引入下面的内容(当前 buildPython 后面跟随的地址是本地地址, 建议只是对地址做调整), 其他的内容省略........
        // 注意：本地的地址是 python 的安装路径下面。上面截图中 红色框, 保存的就是这个地址 跟上 python.exe
        python {
            version "3.8"   
            buildPython "C:\\Users\\EDY\\AppData\\Local\\Programs\\Python\\Python313\\python.exe"  
            pip {
                install "numpy"
                install "pandas"
            }
        }

        ndk {
            abiFilters "arm64-v8a", "x86_64"
        }
        
    }
}
```







### 第02节  初始化 python 环境

在 安卓的 Application 的 onCreate 方法中，进行 python 的初始化

```groovy
import android.app.Application;

import com.chaquo.python.Python;
import com.chaquo.python.android.AndroidPlatform;

// 备注: BootApplication 需要在 安卓清单文件的 <application /> 指定 android:name="" 属性
public class BootApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        //------------------------------------------------------------------------------
        // 初始化 Python  环境
        if (!Python.isStarted()) {
            Python.start(new AndroidPlatform(this));
        }
        //------------------------------------------------------------------------------
    }
}
```







### 第03节  调用 python 的方法

在按钮的点击事件中，或者其他的方法中，进行调用下面的代码。

```java
import com.chaquo.python.PyObject;
import com.chaquo.python.Python;

public class CommonPythonUtil {

    public static String test(String param) {
        String data = "";
        try {
            
            // 执行Python脚本或直接运行Python代码
            // 参数说明: ac_test 是存在于 src/main/python/ac_test.py 文件
            // 为什么是上面的这个路径?  src/main/python 
            // 这里是由 build.gradle 当中的 python.srcDir 进行配置得到的
            PyObject pyObj = Python.getInstance().getModule("ac_test");
            
            // 参数说明:
            // 参数1: 存在于 ac_test.py 文件当中的方法, 这个方法的名称叫做  forecastAC_test
            // 参数2: param 指的是方法的参数, 这里只需要传递一个参数, 因此只写了一个 param 这里其实可以接收的是可变参数实例
            // 返回值: PyObject 这个类型的结果, 该结果通过了 toString() 方法, 获取到了 Java 字符串对象。
            PyObject result = pyObj.callAttr("forecastAC_test", param);
            // 获取结果并转换为字符串
            data = result.toString(); 
            
            Log.i(TAG, "PythonResult.data: " + data);
        } catch (Exception exception) {
            Log.i(TAG, "PythonResult.exception: " + exception);
        }
        return data;
    }
}
```







## 第三章 准备的 python 数据

### 第01节  准备的 python

python 数据存在路径如下：

```
app/src/main/python/ac_test.py
```

其中 python 当中 ac_test.py 代码写法

```python
# -*- coding: utf-8 -*-

import numpy as np
import pandas as pd
import json


features = ['city', 'out_temple', 'body_temple',
       'weather', 'wind_level',
       'int_temple', 'frontleft_door',
       'frontright_door', 'backleft_door', 'backright_door',
       'frontleft_window', 'frontright_window', 'backleft_window',
       'backright_window', 'sun_level',
       'car_state', 'number', 'cloth']

temple_features = features + ['pre_temple_5min']
level_features = features + ['pre_level_5min']
mode_features = features + ['pre_mode_5min']

temple_features = features
level_features = features
mode_features = features

def forecastAC_test(data):
    print(data)
    print(type(data))

    dict_data = json.loads(data)
    print(dict_data)
    print(type(dict_data))

    input_df = pd.DataFrame(data=[
        [dict_data['city'], dict_data['out_temple'], dict_data['body_temple'], dict_data['weather']
            # ,
         # dict_data['wind_level'], dict_data['int_temple'], dict_data['frontleft_door'], dict_data['frontright_door'],
         # dict_data['backleft_door'], dict_data['backright_door'], dict_data['frontleft_window'], dict_data['frontright_window'],
         # dict_data['backleft_window'], dict_data['backright_window'], dict_data['sun_level'], dict_data['car_state'],
         # dict_data['number'], dict_data['cloth'], dict_data['ac_state'],
         # dict_data['ac_temple'], dict_data['ac_level'],
         # dict_data['ac_mode']
         ]
    ], columns=['city', 'out_temple', 'body_temple',
       'weather'
       #  , 'wind_level',
       # 'int_temple', 'frontleft_door',
       # 'frontright_door', 'backleft_door', 'backright_door',
       # 'frontleft_window', 'frontright_window', 'backleft_window',
       # 'backright_window', 'sun_level',
       # 'car_state', 'number', 'cloth', 'ac_state', 'ac_level', 'ac_mode'
                ])

    print(input_df)


    print('测试通过,能够运行python代码！')

    data_struct = {
        "Time": "2024/5/16 15:33:47",
        "User_Id": "2",
        "ac_temple": 24,
        "ac_level": 7,
        "ac_state": 1,
        "ac_mode": 2
    }

    return data_struct

if __name__ == '__main__':
    dict_data = {
    "city": "0",
    "out_temple": 30,
    "body_temple": 26.5,
    "weather": 0
    }

    json_str = json.dumps(dict_data)

    return_data = forecastAC_test(json_str)

    print(return_data)
```





### 第02节  项目结构

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2025-04-16_06-39-03.png">







