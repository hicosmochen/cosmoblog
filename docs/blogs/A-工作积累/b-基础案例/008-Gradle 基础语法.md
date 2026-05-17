# Gradle 基础语法



[[TOC]]





## 第一章 项目结构介绍

### 第01节 项目结构

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2023-09-15_21-22-07.png">

### 第02节 结构说明

`setting.gradle` 文件

```
1、作用:
	A. Android 代码在编译的过程中, 最先找到的文件。
	B. 定义了项目的名称
	C. 定义了包含哪些模块
	D. 定义了一些仓库地址
	
2、详细说明:
	A. pluginManagement 	方便和有效的方式来管理 Maven 插件的版本与配置
	B. dependencyResolutionManagement 集中管理项目中依赖解析策略的方式, 简化配置、统一管理版本冲突和提高构建效率
	C. rootProject.name		项目的名称
	D. include   			包含的模块
```

`build.gradle` 文件：模块下面的对应的配置文件

```
1、 plugins:  
	A. 可以指明当前的模块是一个可运行的 APP 还是一个插件
	B. 案例:
		// 表示是一个可运行的 APP
		plugins{
			id  'com.android.application'
		}
		// 表示是一个插件(备注插件还可以自己去定义包名称和类名称)
		plugins{
			id 	'com.android.library'
		}

2、 android:
	A. 表示Android的一些配置信息, 都可以在这里定义, 后面我们的写法主要是针对于 android 
	B. 例如: 
		命名空间、编译版本、默认配置、编译类型、编译的Java版本 等
		
3、dependencies:
	A. 表示模块需要使用的一些外部的依耐
	B. 主要的写法
			implementation	可以将依赖项包含到项目中，并传递给应用程序及其所有模块，不会将依赖项暴露给其他模块
			compileOnly 	仅在编译时对代码可见，不会被打包进应用程序，目前被废弃
			api 都可以将依赖项包含到项目中，并传递给应用程序及其所有模块，应用程序内部和外部可见
```





### 第03节 分离引入

问题

```
如果 gradle 当中的内容很多的情况下, 需要进行分离 gradle 的代码写法。
类似于 java 代码当中的导包操作, 将多个 gradle 的信息, 进行导入。
```

操作

```groovy
1、在模块 APP的 build.gradle 并列的目录下面, 创建文件  config.gradle 文件
2、在模块 APP的 build.gradle 根目录下面, 添加下面一段代码:
		
	apply  from: "config.gradle"
```

效果图

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2023-09-15_22-27-24.png">





### 第04节 task任务

代码位置 `module/build.gradle` 根目录外面书写代码

```groovy
// 定义一个任务的写法, 
// 目的: 为了清除 APP每次build的时候的临时文件, 包含有一些临时的APP包文件信息等
// 效果: 将会在 Gradle 的 Tasks/other 当中存在该任务, 该任务的名称叫做 aCosmoCleanBuild
// 代码:
tasks.register('aCosmoCleanBuild', Delete) {
    delete 'build'
}
```

解释

```
1、 tasks.register 表示注册一个任务
2、 aCosmoCleanBuild 表示该任务的名称
3、 小括号当中的 Delete 表示该任务的类型, 任务需要做删除的操作
4、 大括号当中的 delete 表示该任务的调用的 API 叫做 delete 
5、 大括号当中的 'buld' 表示文件夹的名称
```













## 第二章 基础语法

### 第01节  变量和集合

1、任务分组 以及 字符串的定义

```groovy
// 1. 定义一个任务, 任务的名称叫做 stringOne
// 2. 设置当前的任务, 所属的组在 cosmo 如果 cosmo 不存在则创建
// 3. 设置任务的描述, this is my self task 鼠标挪动到任务上面的时候, 给出一个简单的提示信息
// 4. 定义字符串类型的数据, 可以是单引号也可以双引号, 引起来的就是字符串
// 5. 输出字符串的数据值, 采用的方式是 ${变量名称} 的写法格式

tasks.register('stringOne') {
    setGroup("cosmo")
    setDescription("this is my self task")

    def str1 = "hello"
    def str2 = 'world'

    print("${str1} ----> ${str2}")
}
```



2、单列集合取值和遍历

```groovy

tasks.register('dataOne') {
    setGroup("cosmo")
    setDescription("this is my self task")

    // 定义集合取值
    def listInt = [1, 2, 3, 4, 5, 6, 7]
    def listStr = ["One", "Two", "Three", "Four"]

    println("${listInt[0]}")
    println("${listStr[0]}")

    println("${listInt[1]}")
    println("${listStr[1]}")

    println("${listInt[9]}")
    println("${listStr[9]}")

    println("=====================")

    // 遍历集合的操作
    listStr.each {
        println it
    }
}
```



3、双列集合取值和遍历

```groovy
tasks.register('dataTwo') {
    setGroup("cosmo")
    setDescription("this is my self task")

    // 定义集合取值
    def map = [
            "name": "zhangsna",
            "age" : 13
    ]

    println(map["name"])
    println(map["age"])

    println("=====================")

    // 遍历集合的操作, 这里的 it 表示的是每一个元素
    map.each {
        println("key: ${it.key}  = value: ${it.value}")
    }

}

```





### 第02节 方法和对象

1、定义一个方法

```groovy
// 定义一个方法的写法
// 这里 static 和 def 是方法的修饰符
// int a, int b 是方法的参数
// methodA 是方法的名称
// a+b 是方法体的内容
// 需要注意的是  方法在没有 return 的情况下, 默认将最后一行的有效代码, 作为其返回值. 意思是 将 a+b 作为返回值返回
static def methodA(int a, int b){
    a+b
}

tasks.register("methodOne"){
    setGroup("cosmo")
    setDescription("this is a demo")

    // 调用方法
    println methodA(10, 20)
}
```



2、定义一个对象

```groovy
// 定义对象
// 写法的格式和Java的格式差不多，存值的操作和取值的操作与Java很类似
class StudentBean {
    String name
    int age

    StudentBean() {
    }

    StudentBean(String name, int age) {
        this.name = name
        this.age = age
    }

    String getName() {
        return name
    }

    void setName(String name) {
        this.name = name
    }

    int getAge() {
        return age
    }

    void setAge(int age) {
        this.age = age
    }
}

tasks.register("ObjectOne") {
    setGroup("cosmo")
    setDescription("this is a demo")

    StudentBean bean1 = new StudentBean();
    bean1.name = "zhangsan"
    bean1.setAge(20)
    println "bean1: ${bean1.name} and ${bean1.getAge()}"

    StudentBean bean2 = new StudentBean("lisi", 21);
    println "bean2: ${bean2.name} and ${bean2.getAge()}"

    StudentBean bean3 = new StudentBean();
    bean3.setProperty("name", "wangwu")
    bean3.setProperty("age", 22)
    println "bean3: ${bean3.getProperty("name")} and ${bean3.getProperty("age")}"
}
```





### 第03节 闭包函数

1、不带参数的闭包函数案例

```groovy
// 定义闭包函数(不带参数的闭包函数)
// 可以将其理解成为 Java 当中的接口。如: 回调接口的写法
static def myClosePackageOne(Closure<?> closure){
    for (i in 1..5) {
        closure(i)
    }
}


tasks.register("ClosePackageOne") {
    setGroup("cosmo")
    setDescription("this is a demo")

    myClosePackageOne {
        println it
    }
}

// 输出的结果是 1  2  3  4  5
```



2、多个参数的闭包函数案例

```groovy
// 定义闭包函数(带有参数的写法)
// 可以将其理解成为 Java 当中的接口。如: 回调接口的写法
// 注意这里写法,这里是多个参数,不能使用it 只能使用 param1,param2-> { ...... }
static def myClosePackageTwo(Closure<?> closure) {
    def map = [
            "name": "zhangsan",
            "age" : 24
    ]
    map.each {
        closure(it.key, it.value)
    }
}


tasks.register("ClosePackageTwo") {
    setGroup("cosmo")
    setDescription("this is a demo")

    myClosePackageTwo {
        param1, param2 ->
            {
                println "${param1} is ${param2}"
            }
    }
}
```







## 第三章 分流配置

### 第01节 效果介绍

效果图

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2023-09-16_18-32-33.png">

核心位置介绍

```
1、APP 模块下面的 build.gradle 定义了读取配置文件的内容, 以及分包处理的配置方案
2、APP 模块下面的 dir/debug/config.properties 和 dir/release/config.properties 各个版本的配置文件
3、gradle.properties 需要做 buildConfig 的设置, 才能让 JAVA 代码读取到 build的配置变量信息
4、MainActivity.java 当中去读取数据, 读取 buildConfig 的配置数据
```





### 第02节 案例代码

【一】位置 `app模块下面的 build.gradle` 文件写法

1、读取配置文件信息

```groovy
// 读取配置文件的信息的方法, 通过文件的类型 和 KEY 获取到指定的数据值
def getPropertyFormTypeByKey(String fileType, String key) {
    def value = ""
    Properties mProperties = new Properties();
    def proFile = file("dir/${fileType}/config.properties")
    if (proFile.canRead()) {
        mProperties.load(new FileInputStream(proFile))
        if (mProperties != null) {
            value = mProperties[key]
        }
    }
    return value
}
```

2、设置 `buildConfigFiled` 的参数

```groovy
android {
	// .....其他位置的代码省略.....
    buildTypes {
        debug {
            buildConfigField 'String', 'hostUrl', getPropertyFormTypeByKey(name, "HOST_URL")
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }

        release {
            buildConfigField 'String', 'hostUrl', getPropertyFormTypeByKey(name, "HOST_URL")
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
	// .....其他位置的代码省略.....
}
```



【二】在 `dir` 文件夹当中的各类配置文件的信息

1、位置 `dir/debug/config.properties`  当中的配置文件信息

```properties
HOST_URL="http://www.baidu.com"
```

2、位置 `dir/release/config.properties`  当中的配置文件信息

```properties
HOST_URL="http://www.qq.com"
```



【三】在项目根目录下面的 `gradle.properties` 当中的配置信息，需要加上属性

```properties
# 这里的配置文件信息, 表示高版本的 gradle 需要支持 buildConfigField 
android.defaults.buildfeatures.buildconfig=true
```



【四】在 `MainActivity.java` 当中的代码写法

```java
// 备注: 这里在使用的过程中, 如果没有生效的情况下。
// 可以在 AndroidStudio 的菜单栏当中, 找到 【Build】 -> 【Rebuild Project】 重新构建一下
String hostUrl = BuildConfig.hostUrl;
Log.e(TAG, "hostUrl: " + hostUrl);
```









##  第四章 渠道打包

### 第01节 多渠道包的实现

步骤

```
1、 给 APP 的 build.gradle 配置文件, 定义多渠道信息
2、 配置 buildConfigField 支持
3、 MainActivity 当中获取到渠道包的来源
```

【一】 在 APP 的 `build.gradle` 的配置文件当中新增下面的内容

```groovy
android {

    //....前面的内容省略....

    // 多渠道打包, 需要加入版本号
    flavorDimensions 'versionCode'

    // 一键化多渠道打包的操作
    productFlavors {
        xiaomi {}
        huawei {}
        vivo {}
        oppo {}
        meizu {}
    }

    // 一键化多渠道打包的配置
    productFlavors.all {
        flavor ->
            {
                flavor.manifestPlaceholders = [UMENG_CHANNEL_VALUE: name]
                buildConfigField "String", "PLATE_FROM", "\"${name}\""
            }
    }


	//....后面的内容省略....
}
```



【二】配置 buildConfigField 支持，在项目根目录下面的 `gradle.properties` 

```properties
android.defaults.buildfeatures.buildconfig=true
```



【三】在 `MainActivity` 当中获取到渠道信息

```java
// 这里获取到渠道的信息, 渠道的来源是受到上面 APP当中的 build.gradle 的渠道配置来定的
// 注意: 
// 如果 BuildConfig 失效的情况下, 
// 可以在 AndroidStudio 的菜单栏当中, 找到 【Build】 -> 【Rebuild Project】 重新构建一下
String plateFrom = BuildConfig.PLATE_FROM;
Log.e(TAG, "plateFrom: " + plateFrom);
```







### 第02节 包名称显示时间

在包名称当中显示时间和版本信息

```
主要的操作都是在 APP 的 build.gradle 当中完成代码的实现。

操作步骤：
	1、定义获取时间的方法
	2、定义APP包名称输出
```



1、获取时间的方法，位置  `APP的 build.gradle` 文件的根节点下面实现

```groovy
static def getCurrentTime() {
    return new Date().format("yyyyMMdd", TimeZone.getTimeZone("UTC"))
}
```



2、定义APP包名称的输出，位置 `APP的 build.gradle` 文件的 `debug` 或 `release`下面实现

```groovy
buildTypes {
    debug {
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'

        // APK文件的输出名称
        android.applicationVariants.all {
            variant ->
                variant.outputs.all {
                    def fileName = "${getCurrentTime()}_V${defaultConfig.versionName}_${name}.apk"
                    outputFileName = fileName
                }
        }
    }

    release {
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'

        // APK文件的输出名称
        android.applicationVariants.all {
            variant ->
                variant.outputs.all {
                    def fileName = "${getCurrentTime()}_V${defaultConfig.versionName}_${name}.apk"
                    outputFileName = fileName
                }
        }
    }
}
```





### 第03节 快捷方式打包

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/b-%E5%9F%BA%E7%A1%80%E6%A1%88%E4%BE%8B/Snipaste_2023-09-16_19-43-50.png">















