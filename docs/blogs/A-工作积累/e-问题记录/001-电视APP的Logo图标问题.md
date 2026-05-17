# 电视APP的Logo图标问题





[[TOC]]





## 第一章 遇到问题

### 介绍

```
在 Android App 安装到TV 设备当中的时候, 出现了 LOGO 图标显示模糊缩小的问题。
当时经过了多次反复的测试，发现无论自己如何调整，都没有办法解决该问题。
```



### 现象

```
1、图标显示不清晰
2、图标显示大小不满足
```



> 错误的思考方向：
>
> 1、直接放入一个 1024px 的高清图作为logo , 未能解决问题
>
> 2、设置各个版本的如  `mdpi` 、`xmdpi`、`xxmdpi`  等。未能解决问题







## 第二章 解决方案

### 简述

```
采用 svg 矢量图进行处理, 需要做下面的两个操作：
1、准备 svg 格式的矢量图
2、采用 AndroidStudio 工具进行矢量图标打造处理
```



> 插曲1： 当时在解决这个问题的时候，重启了 电视机设备，重启后发现APP图标正常了？ 
>
> 插曲2：观察到电视机的其他 APP 显示图标和手机 APP项目的显示图标不一致？





### 解决

第一步：需要先准备 `svg` 图片

第二步：对着在 安卓项目的 `res/drawable` 目录右键选择 `New`   选择 `Vector Asset`  创建矢量图

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/e-%E9%97%AE%E9%A2%98%E8%AE%B0%E5%BD%95/Snipaste_2023-08-17_22-33-44.png"> 



创建矢量图

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/e-%E9%97%AE%E9%A2%98%E8%AE%B0%E5%BD%95/Snipaste_2023-08-17_22-38-29.png">



第三步：在清单文件 `AndroidManifest.xml` 当中设置图标 

```xml
<application
        android:allowBackup="true"
        android:hardwareAccelerated="true"
        android:icon="@drawable/logo"
        android:label="@string/app_name"
        android:roundIcon="@drawable/logo"
        android:theme="@style/Theme.AppCompat.NoActionBar"
        android:supportsRtl="true">
```

备注： 这里主要设置的是两个属性值，他们分别是

1、 `android:icon`

2、`android:roundIcon`















