# GitHub 远程仓库





[[TOC]]





## 第一章 生成 SSH 秘钥

### 第01节 使用前提

> 使用前提条件： 
>
> ​		当前的计算机系统当中，已经安装了 git 软件，其中 git 的官方网站，可以下载 git 软件。
>
> 
>
> 官方网站地址： 
>
> ​		https://git-scm.com/downloads





### 第02节 核心代码

第一步：设置账号和邮箱

```
git config --global user.name  "chcsvip"
git config --global user.email  "chcsvip@126.com"
```

> 备注:
>
> 1、其中 `chcsvip` 是我们的用户名
>
> 2、其中 `chcsvip@126.com` 这里是邮箱地址





第二步：生成SSH秘钥

```
cd ~/.ssh
ssh-keygen -o
cat ~/.ssh/id_rsa.pub
```

> 备注：
>
> 1、第一步是需要进入到 .ssh 的隐藏文件夹下面，当前采用的指令是 Linux 和 MacOS 系统，如果是 Windows 可以进入到文件夹当中
>
> 2、第二步是生成ssh秘钥的指令，这里需要按下 三次回车键即可
>
> 3、第三步是查看ssh秘钥的指令，当查看得到秘钥的时候，需要复制当前的秘钥，准备交给 github 当中











## 第二章 使用SSH秘钥

### 第01节  找到设置

项目设置，在 github 项目中，找到 Setting 选项

<img src = "https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/a-%E8%BD%AF%E4%BB%B6%E7%8E%AF%E5%A2%83/Snipaste_2023-06-11_11-30-37.png">







### 第02节 找到KEY

找到 key 信息

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/a-%E8%BD%AF%E4%BB%B6%E7%8E%AF%E5%A2%83/Snipaste_2023-06-11_11-31-19.png">







### 第03节 添加KEY

添加 Key

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/A-%E5%B7%A5%E4%BD%9C%E7%A7%AF%E7%B4%AF/a-%E8%BD%AF%E4%BB%B6%E7%8E%AF%E5%A2%83/Snipaste_2023-06-11_11-31-47.png">













## 第三章 代码处理

###  第01节 克隆代码

克隆代码

```
git  clone   git@github.com:cosmocheng/ExperienceDemo.git
```

> 备注：`git@github.com:cosmocheng/ExperienceDemo.git` 是仓库代码的地址







### 第02节 分支处理

显示分支

```
git   branch  -vv
git   branch  -a
```

> 备注: 
>
> 1、 `-vv` 表示显示本地分支
>
> 2、 `-a`  表示显示所有分支，包括本地分支和远程分支





切换分支

```
git   branch    hello
```

> 备注：`hello` 表示分支的名称，意思是切换到 `hello` 分支当中



删除分支

```
git  branch  -d   hello
```

> 备注： `hello` 表示分支的名称，意思是删除掉 `hello` 分支







### 第03节  添加提交

查看状态

```
git   status
```

添加信息

```
git  add  .
```

> 备注：  `.` 表示添加所有的



提交信息

```
git   commit   -m     "需要提交的信息"
```

> 备注： `-m` 是固定写法，前后需要添加空格，提交信息有专门的标准



**提交信息的标准语法**

```
一、提交格式。 这里的括号和冒号都是 中文符号
    type （scope）: message

二、参数介绍：
    1、type：指的代码的提交类型，不同的提交类型表示对应不同的代码改动，比如：
            feat：新功能的开发
            fix：bug的修复
            docs：文档格式的改动
            style：代码格式改变
            refactor：对已有的功能进行重构
            perf：性能优化
            test：增加测试
            build：改变了build工具
            revert：撤销上一次的commit提交
            chore：构建过程或辅助工具的变动
    2、scope：用于说明commit影响的范围，比如：权限模块、还是首页
		3、message： 对提交的代码做一个简短的说明，不能过长。

三、示例
    提交案例1：  fix（系统菜单图标）：添加缺少的图标
    提交案例2：  feat（初始化项目开发）： 项目开发的初始化操作
    提交案例3：  docs（文档描述介绍）： 针对于文档docs当中, 新增001_git提交规范.txt
    提交案例4：  fix（登录功能）： 修复登录功能出现的bug信息
    提交案例5：  style（屏保程序）： 调整代码的基础格式

四、简化提交文案：
    提交案例1：  fix：添加缺少的图标
    提交案例2：  feat： 项目开发的初始化操作
    提交案例3：  docs： 针对于文档docs当中, 新增001_git提交规范.txt
    提交案例4：  fix： 修复登录功能出现的bug信息
    提交案例5：  style： 调整代码的基础格式
```



### 第04节  推送云端

推送标准语法  （如果本地分支名与远程分支名相同，则可以省略冒号：）

```
git push <远程主机名> <本地分支名>:<远程分支名>  
git push <远程主机名> <本地分支名>
```

推送的通用写法

```
git push --force origin master
```

> 备注：
>
> 1、 `orgin` 表示的是当前的主机名称。一般不做修改
>
> 2、 `master` 表示的是远程的分支名称，推送到哪一个分支当中
>
> 3、  `--force` 表示强制推送，取消git版本检测
>
> 
>
> 另外：当前的指令在哪个分支当中，就是把当前的代码，推送到 `orgin` 的 `master` 分支当中。 后期切换分支的时候，需要切换推送的分支























