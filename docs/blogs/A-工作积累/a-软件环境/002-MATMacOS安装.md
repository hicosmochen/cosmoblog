# MAT MacOS安装









[[TOC]]







## 第一章 简述

### 第01节 介绍

什么是 MAT 工具？

```
1、性能优化当中的内存优化一直是一个经常遇到的问题，也是一个高级 Android 开发工程师必须掌握的素质和技能
2、MAT 是单词的缩写： Memory Analyzer tool的缩写。指分析工具
3、MAT 是一款属于 eclipse 的开发工具，可以快速的帮助程序员进行定位 Android 当中常见的 内存泄漏、内存抖动、OOM 等问题
```





### 第02节 获取 

MAT 工具的获取

```
MAT 工具可以通过下面的 官网下载地址，进行工具的下载，下载地址如下：

https://www.eclipse.org/mat/downloads.php
```

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/a-%E8%BD%AF%E4%BB%B6%E7%8E%AF%E5%A2%83/Snipaste_2023-06-11_11-37-53.png">











## 第二章 配置

### 第01节 显示包内容

说明：在MacOS 当中找到 应用程序，右键选择 **显示包内容** 

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/a-%E8%BD%AF%E4%BB%B6%E7%8E%AF%E5%A2%83/Snipaste_2023-06-11_11-38-22.png">



或者采用 Linux 指令打开的方式

```
cd /Applications/mat.app
```





### 第02节 MAT配置Java环境变量

**如果我们采用可视化界面方式配置**

在 显示包信息当中，找到 `Eclipse` 找到当中的 `MemoryAnalyzer.ini` 文件，在这个文件当中需要新增下面的绿色输入框的内容

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/a-%E8%BD%AF%E4%BB%B6%E7%8E%AF%E5%A2%83/Snipaste_2023-06-11_11-38-52.png">

绿色框部分的内容如下：

```
-vm
/Library/java/JavaVirtualMachines/jdk-11.jdk/Contents/Home/bin
```

> 说明：
>
> 1、位置不要放错了，上面这段代码，是存在于第4行的下面 `-vmargs` 上面
>
> 2、上面的路径 `/Library/java/JavaVirtualMachines/jdk-11.jdk/Contents/Home/bin` 表示的是 Java的环境变量地址，每个MacOS 地址是差不多的，只是版本号不同
>
> 3、这里 JDK 的版本没有关系，后面可以进行选择配置，MAT支持的最低版本，进行兼容处理



**如果我们采用指令的方式，进行配置**

需要进入到 Eclipse 文件夹当中，采用 VIM 指令，处理添加信息之后再去保存

```
cd /Applications/mat.app/Contents/Eclipse
vim MemoryAnalyzer.ini
-------------> 这里添加上面的代码
-vm
/Library/java/JavaVirtualMachines/jdk-11.jdk/Contents/Home/bin
-------------> 添加完毕之后, 进行保存
:wq!
```











### 第03节 MAT兼容低版本Java

**如果我们采用可视化界面方式配置**

在 显示包信息当中，找到 `Eclipse` 找到当中`configuration` 文件夹, 里面的 `config.ini` 文件，在这个文件当中需要修改下面绿色输入框的内容（版本号）

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/a-%E8%BD%AF%E4%BB%B6%E7%8E%AF%E5%A2%83/Snipaste_2023-06-11_11-39-19.png">



> 说明：
>
> 目前根据下载的版本，支持的版本略有不同，目前我下载的支持的版本是 17 我自己将其修改为 8



**如果我们采用指令的方式，进行配置**

需要进入到 configuration 文件夹当中，采用 VIM 指令，处理添加信息之后再去保存

```
cd /Applications/mat.app/Contents/Eclipse/configuration
vim config.ini
-------------> 修改版本号
osgi.requiredJavaVersion=8
-------------> 修改版本号
:wq!
```









## 第三章 问题

### 第01节 正常启动效果

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/a-%E8%BD%AF%E4%BB%B6%E7%8E%AF%E5%A2%83/Snipaste_2023-06-11_11-39-48.png">







### 第02节 可能遇到的问题

问题现象

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/a-%E8%BD%AF%E4%BB%B6%E7%8E%AF%E5%A2%83/Snipaste_2023-06-11_11-40-13.png">



问题描述

```
Version 11.0.18 of the JVM is not suitable for this product
```

解决方案

```
需要配置 eclipse 的 config.ini 设置最低支持版本。
例如: osgi.requiredJavaVersion=8
具体操作： 见上面 MAT 兼容低版本Java
```





















