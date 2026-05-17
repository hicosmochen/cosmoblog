# 001-Java基础语法





[[TOC]]







## 第一章 第一个程序

### 第01节 理论前提

**Java之父是谁？**

```
詹姆斯·高斯林。
------------
亲爹是 Sun 公司, 继父是 Oracle 公司
```

**Java的三个方向**

```
1. JavaSE   java语言基础
2. JavaME   嵌入式程序的开发, 塞班系统（诺基亚手机）
3. JavaEE	企业级开发,做服务器的
```

**跨平台性**

```
1、什么是平台?
		就是操作系统, 常见的操作系统有哪些啊。  windows\mac\Linux
		
2、跨平台是什么意思？
		我们的 程序（Java代码）可以在 任何一个操作系统上面的运行。
		
3、Java是如何实现 跨平台的？
		需要借助于 Java虚拟机（JVM）去实现跨平台。 "在不同的操作系统上面, 存在着不同的 Java虚拟机, 由Java虚拟机实现跨平台"
```

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/a-Java/Snipaste_2023-06-11_12-56-15.png"/>



**专业词汇**

```
1. JDK: Java开发工具包
2. JRE: Java运行环境
3. JVM: Java虚拟机
----------------------------------
三者之间是包含关系:   D>R>V
	JDK 包含有 JRE
	JRE 包含有 JVM
```

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/a-Java/Snipaste_2023-06-11_12-56-35.png">







### 第02节  常用的DOS命令

**启动小黑窗口的方式**

```
win+R 输入 cmd 回车
```

**常见的命令**

```
1. 切换盘符, 进入的命令
	A. 切换盘符:   D:  回车
	B. 进入命令:   cd C:\develop\Java\jdk-14   回车

2. 查看文件信息
	A. 查看文件信息：  DIR  回车

3. 退出的命令
	A. 单层退出		cd..  回车
	B. 退回根目录   cd\   回车

4. 其他的命令
	A. 清屏操作		cls   回车
	B. 退出操作		exit  回车
```

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/a-Java/Snipaste_2023-06-11_12-56-57.png">



验证环境变量

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/a-Java/Snipaste_2023-06-11_12-57-23.png">



**Notepad软件**

<img src = "https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/a-Java/Snipaste_2023-06-11_12-57-47.png">





### 第03节 HelloWorld

**操作步骤**

```
1. 新建文件：  	需要新建一个 HelloWorld.java 文件
2. 编写代码：	按照模板进行编写代码即可
3. 编译运行：	编译：  javac  HelloWorld.java    运行：  java  HelloWorld
```



**案例效果图**

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/a-Java/Snipaste_2023-06-11_12-58-06.png">





**常见问题**

```
1. 单词拼写问题
2. 中文符号问题
```







## 第二章  基础语法

### 第01节  注释

**注释有什么作用？**

```
用于解释说明程序的文字, 给程序员看的。
```



**注释的分类**

```
1. 单行注释		//这是单行注释
2. 多行注释		/*  这是多行注释  */
3. 文档注释		/** 这是文档注释  */
```





### 第02节  关键字

**什么是关键字？**

```
在 Java 语言当中, 被赋予特殊含义的单词, 叫做关键字。
```

**关键字有什么特点？**

```
1. 单词全部是 小写
2. 在编辑器当中 有特殊颜色标记。
```



### 第03节  常量

**什么是常量?**

```
在 程序执行的过程当中, 数据值 不会发生改变, 叫做常量。
```

**常量的分类有哪些？**

```
1. 字符串常量。   "大家好,我是渣渣辉"     ""
2. 字符常量。	 'A'    'a'    '9'    '我'
3. 整数常量。     520    1314    1111
4. 浮点数常量。	11.16   3.1425926
5. 布尔常量。	 true   false
6. 空常量。		  null
```



### 第04节  变量

**什么是变量？**

```
在 程序执行的过程当中, 数据值 可以发生改变, 叫做变量。   在内存当中,指的是一块存储空间。
```

**变量的定义格式**

```
1. 格式:
	数据类型  变量名称  =  数据值;

2. 例如:
	int   age   =  18;
```

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/a-Java/Snipaste_2023-06-11_12-58-26.png">



**变量使用的注意事项**

```
1. 变量未赋值, 不能直接使用。（打印输出）
2. 一行可以定义多个变量, 需要采用逗号隔开, 但是不建议这样操作。
3. 同一个变量名称的数据, 只能有一个数据类型。
4. 两种数据类型需要加上后缀。 （float需要加上后缀F,long类型需要加上后缀L）
5. 变量只在所属的大括号里面,有效。
```



### 第05节  数据类型

**数据类型的分类**

```
1. 基本数据类型： 四类八种
2. 引用数据类型： 数组、类、接口...
```

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/a-Java/Snipaste_2023-06-11_12-58-50.png">





### 第06节 标识符

**什么是标识符？**

```
给 变量、方法、类 取名字。 名字就叫做 标识符。
```

**标识符的要求？**

```
1. 硬指标： 强制遵循的标准
	A. 由 数字、字母、下划线、美元符号 组成
	B. 数字不能开头   2b
	C. 不能是 Java 当中的关键字

2. 软建议： 建议大家这样写
	A. 小驼峰
		a. 含义:  第一个单词首字母小写, 其他单词首字母大写
		b. 例如:  name   setAge   maxAge   chuanGe   pinYin
		c. 使用:  对于变量的命名 和 方法的命名
	B. 大驼峰
		a. 含义:  每个单词首字母大写
		b. 例如:  Student  XueSheng   HelloWorld   Demo   Test
		c. 使用:  对于 类的命名
```







### 第07节  类型转换

**隐式类型转换**

```
1. 格式
		数据类型A   变量名称A  =  变量名称B;
		
2. 例如
		int  numB = 18;
		double  numA = numB;   // 将int类型的变量 numB 隐式转换成为 double的变量 num
		
3. 条件
		从小到大, 可以采用 隐式类型转换。（等号的右边 到 等号的左边）
		
4. Java底层存在一个从小到大的顺序
		byte  ---  short (char)   ---- int  ---- long  ---- float  ---- double
		//说明: boolean 类型 不参与 类型转换。
```

 **强制类型转换**



```
1. 格式
		数据类型A   变量名称A   =  (数据类型A) 变量名称B;
		
2. 例如
		double  numA = 3.888;
		int numB = (int)numA;    //将 double 类型的 numA 强制转换成为 int 类型, 再去赋值给等号左边的 int 类型 numB
		
3. 条件
		从大到小, 可以采用 强制类型转换。 （等号右边 到 等号左边）
		//注意： 强制类型转换, 【可能】损失精度。
```

**常量优先计算原则**

```
1. 类型提升问题
			byte  short  char  参与运算的过程当中, 会自动提升为 int 类型。  ----> 前提是 【变量】参与运算。
			
2. 常量优先计算原则
			如果全部是常量参与运算, 先计算结果，再看数据类型。 如果结果超过范围，需要进行类型转换。
```

案例代码1

```java
// 变量 + 变量   ----> 类型提升
public  class  Test01{
	
	public static void main(String[] args){
	
		byte  num1  =  11;
		byte  num2  =  22;
	
		//隐式类型转换
		int  num3  =  num1  +  num2;
		System.out.println(num3);
		
		//强制类型转换
		byte num4  =  (byte)(num1  +  num2); 
		System.out.println(num4);
	}
}
```

案例代码2

```java
// 变量 + 常量      ---> 类型提升    
public  class  Test02{
	
	public static void main(String[] args){
	
		byte  num1  =  11;
		 
		//隐式类型转换
		int  num3  =  num1  +  55;
		System.out.println(num3);
		
		//强制类型转换
		byte num4  = (byte)(num1 + 55);
		System.out.println(num4);
	}
}
```

案例代码3

```java
// 常量 + 常量     
public  class  Test03{
	
	public static void main(String[] args){
	
		//常量优先计算原则: 如果全部是常量,先计算,再看数据类型。
		byte  num3  =  22  +  55;
		System.out.println(num3);
	}
}
```

案例代码4

```java
// 常量 + 常量     
public  class  Test04{
	
	public static void main(String[] args){
	
		//常量优先计算原则: 如果全部是常量,先计算,再看数据类型。
		//如果超过了范围,需要转换。 要么强制转换,要么隐式转换
		int  num3  =  122  +  55;
		System.out.println(num3);
		
		byte  num4  =  (byte)(122  +  55);
		System.out.println(num4);
	}
}
```









### 第08节  键盘录入

**操作步骤**

```java
1. 导包		import  java.util.Scanner;
2. 创建对象		Scanner  sc = new  Scanner(System.in);
3. 录入数据		int  num  = sc.nextInt();
```



**案例代码**

```java
//[1]键盘录入：导包操作
import  java.util.Scanner;
//定义了一个类,类的名字叫做 Demo, 文件的名字也叫作 Demo
public  class  Demo{
	//main方法
    public static  void  main(String[] args){
        //[2]键盘录入：创建对象
        Scanner  sc = new  Scanner(System.in);
		//给出提示语句
        System.out.println("请输入一个整数:");
		//[3]键盘录入：录入数据
		int  num  = sc.nextInt();
		//展示结果
        System.out.println("你输入的数据是:");
        System.out.println(num);
    }
}
```





### 第09节  随机数

**随机数的操作步骤**

```java
1. 导包		 import  java.util.Random;
2. 创建对象		Random  r = new Random();
3. 产生数据		int num = r.nextInt(10);     //产生的随机数范围, 包括0,不包括10  也就是 0-9 之间。
```

**案例代码**

```java
//1. 导包
import  java.util.Random;

public class Test01{
    public static void main(String[] args){
        //2. 创建对象
        Random r = new Random();
		//3. 产生随机数
		int num = r.nextInt(10);
    }
}
```

**拓展一下**

```
如果说, 我想要产生 任意范围的随机数, 应该怎么写?
例如: 张达跑去玩英雄联盟, 玩的是 托儿索, 出了一把 无尽之刃。 基础伤害是  150点, 暴击伤害是 100 点。 请问,一刀多少?
最少的伤害是 150, 最高伤害是 250。  想要使用随机数,表示这样的范围,应该怎么写?
----------------------------------------
产生任意范围随机数的公式:
	int num = r.nextInt(max - min + 1)  +  min ;
例如:
	//想要产生范围在 150 到 250 之间的数据。
	int num = r.nextInt(250 - 150 + 1)  +  150;
说明:
	r.nextInt(250 - 150 + 1)    --->   r.nextInt(101)   整体的范围在 0 --- 100  包括 0 也包括 100
	r.nextInt(250 - 150 + 1) + 150  整体加 150  范围在 150 到 250 之间。
```

















## 第三章   运算符

### 第01节  算数运算符

**基本的算数运算符**

```
+   加法
-   减法
*   乘法
/   除法
%   取余（取模）
```

说明

```java
public  class  Test01{

    public static void main(String[] args){
     	int x = 14;   
        int y = 4;
        //除法操作   14÷4=3....2
        int num1 = x/y;
		int num2 = x%y;
		System.out.println(num1);  // 3
		System.out.println(num2);  // 2
    }
}
```

解释  ==如果想要得到小数的结果，必须有浮点数，参与运算。（`double` 或者是 `float`）==

```java
public  class  Test02{

    public static void main(String[] args){
     	int x = 14;   
        int y = 4;
        //除法操作   14÷4=3.5
        float num = 1.0F*x/y; 
        System.out.println(num);   //3.5
    }
}
```





**字符的加操作**

```
规则: 字符（char 数据类型）在参与 加法运算的过程当中, 会采用底层对应的 ASCII 码表进行运算。

什么是 ASCII 码表呢?
	计算机底层对应的 字符和数字的 对应关系表。
```

常见的 ASCII 码表

| 字符  | 整数（十进制整数） |
| :---: | :----------------: |
| `' '` |         32         |
| `'0'` |         48         |
| `'A'` |         65         |
| `'a'` |         97         |

多个字符之间是连续的。

```
字符  'a' 对应的数据是 97  那么 字符 'b' 对应的数据是 98 同理 字符 'c' 对应的数据是 99  ....
```





**字符串的加操作**

```
如果有字符串（""） 参与加法运算, 规则是 进行字符串的拼接。 （粘在一起了） 前提条件是 从左往右运算。
```







**练习** 计算一个三位数的 个位数字、十位数字、百位数字。

题目

```
需求：
	键盘录入一个三位数，将其拆分为个位、十位、百位后，打印在控制台

运行结果:
    请输入一个三位数:
    123
    整数123个位为:3
    整数123十位为:2
    整数123百位为:1
    
分析：
    1：使用Scanner键盘录入一个三位数
    2：个位的计算：数值 % 10
    3：十位的计算：数值 / 10 % 10
    4：百位的计算：数值 / 100
    5：将个位, 十位, 百位拼接上正确的字符串, 打印即可
```

代码

```java
import java.util.Scanner;

public class Test {

    public static void main(String[] args) {
        // 1：使用Scanner键盘录入一个三位数
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入一个三位数");
        int num = sc.nextInt();
        // 2：个位的计算：数值 % 10
        int ge = num % 10;                      // 123 % 10 = 3
        // 3：十位的计算：数值 / 10 % 10
        int shi = num / 10 % 10;                // 123 / 10 = 12        12 % 10 = 2
        // 4：百位的计算：数值 / 100
        int bai = num / 100;                    // 123 / 100 = 1
        // 5：将个位, 十位, 百位拼接上正确的字符串, 打印即可
        System.out.println("整数"+num+"个位为:" + ge);
        System.out.println("整数"+num+"十位为:" + shi);
        System.out.println("整数"+num+"百位为:" + bai);   
    }
}
```





### 第02节  自增自减运算符

**基础说明**

```
1. 自增
	A. 符号:
		++
	B. 用法:
		a++;
		++a;
	C. 说明:
		在原始数据的基础上面, 加上1, 重新赋值给自己。

2. 自减
	A. 符号:
		--
	B. 用法:
		a--;
		--a;
	C. 说明:
		在原始数据的基础上面, 减去1, 重新赋值给自己。
```

**组合使用的情况**

```
前加 和 后加 两者的区别:  ++a 和 a++ 有什么区别?
	定义 int a = 10;  int y = 20;
	-----------------------------
	如果是 前加 ++a :  先加再用。  int b = ++a;      
	如果是 后加 y++ :  先用后加。  int x = y++;
	-----------------------------
如果打印输出结果 
	a = 11
	b = 11
	x = 20
	y = 21
```





### 第03节  赋值运算符

**基础符号**

```
=
+=
-=
*=
/=
%=
```

**例如**

```java
byte b = 3;
b+=2;   //相当于   b = (byte)(b + 2);   最终的结果就是 b = 5
```

**注意**

```
拓展的赋值运算符当中, 包含有 强制类型转换。
```



### 第04节  关系运算符

**基础符号**

```
>
<
>=
<=
==
!=
```



**注意事项**

```
1. 关系运算符的结果是 布尔 boolean 数据类型， 成立就是 true  不成立就是 false
2. 不要把 == 写成了 =  一个等于号表示的是 赋值, 两个等于号表示的是 判断
```









### 第05节  逻辑运算符

**逻辑运算符有什么作用啊？**

```
可以 连接 多个关系表达式。  多条件连接
```



**逻辑运算符的分类和规则**

```
1. 逻辑与
	A. 符号:  &
	B. 规则:  有 false 则 false

2. 逻辑或
	A. 符号:  |
	B. 规则:  有 true 则 true

3. 逻辑非
	A. 符号:  !
	B. 规则:  非 true 则 false, 非 false 则 true

4. 逻辑异或
	A. 符号:  ^
	B. 规则:  相同是 false  不同是 true
```



**短路逻辑运算符**

```
主要有两个符号:
	&&  和  ||

规则:
	1. 逻辑双与,短路与 &&   规则:  有 false 则 false   如果符号左边是 false 那么右边不执行。
	2. 逻辑双或,短路或 ||   规则:  有 true 则 true     如果符号左边是 true  那么右边不执行。

好处是什么?
	效率会比前面逻辑 & 和 | 更高。 推荐大家采用 逻辑双与 && 和 逻辑双或 ||
```







### 第06节  三元运算符

**格式**

```
关系表达式 ?  表达式1 :  表达式2 ;
```

**流程**

```
1. 先计算关系表达式的值, 看结果是 true 还是 false
2. 如果是 true 表达式1 就是最终的结果
3. 如果是 false 表达式2 就是最终的结果
```

**案例**

```java
int a = 33;
int b = 44;
int max = a>b ? a:b;   //三元运算符,获取到两个数据的最大值
```



**练习** 三个数据获取最小值，采用键盘录入实现

```java
// 键盘录入：导包
import java.util.Scanner;

public class Demo{

	public static void main(String[]  args){
        //键盘录入： 创建对象
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入第一个数据:");
        //键盘录入：录入数据
		int num1 = sc.nextInt();
        System.out.println("请输入第二个数据:");
        //键盘录入：录入数据
		int num2 = sc.nextInt();
        System.out.println("请输入第三个数据:");
        //键盘录入：录入数据
		int num3 = sc.nextInt();
		//--------------------
		//首先,比较前面两个数据, 获取到两个数据当中的较小值
		int temp = num1 < num2 ? num1 : num2 ;
		//再次,获取到临时的较小值 和 最后一个数据的最小值
		int min = temp < num3 ? temp : num3;
		//展示最后的结果
		System.out.println("最小值是:" + min);
    }
}
```









## 第四章  流程控制语句

### 第01节  if 语句

**格式一**

```
1. 语法
		if(关系表达式){
				语句体;
		}
		
2. 流程
    a. 先计算 关系表达式的值, 看结果是 true 还是 false 
    b. 如果是 true 就执行 大括号当中的 语句体
    c. 如果是 false 就不执行 大括号当中的 语句体
    
3. 注意
		a. 如果 语句体 只有一句话的情况下, 可以省略 大括号不写, 但是不建议。 如果别人写的是这种格式, 你要看得懂。
		b. if 语句的小括号后面, 不要加 分号。
```

**格式二**

```
1. 语法
    if(关系表达式){
      ....语句体1....
    }else{
      ....语句体2...
    }

2. 流程
    a. 计算关系表达式的结果, 看结果是 true 还是 false 
    b. 如果是 true 就执行 语句体1
    c. 如果是 false 就执行 语句体2


3. 面试题目: 判断奇数和偶数 为什么不能判断1 而是判断0
		public  static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入一个整数:");
        int  num  = sc.nextInt();
        //------------------------------------
        if(num % 2 == 0){
            System.out.println("偶数");
        }else{
            System.out.println("奇数");
        }
    }
```

**格式三**

```
1. 语法
    if(关系表达式1){
      .....语句体1.....
    }else if(关系表达式2){
        .....语句体2.....
    }else if(关系表达式3){
      .....语句体3.....
    } 
    	.....
    }else{
      .....语句体N+1.....
    }
    
2. 流程
    a. 先计算关系表达式1 的值,看结果是 true 还是 false 如果是 true 那么执行 语句体1
    b. 如果结果是 false , 那么就去 计算关系表达式2 的值, 看结果是 true 还是 false 如果是 true 就执行 语句体2
    c. 如果结果是 false , 那么就去 计算关系表达式3 的值, 看结果是 true 还是 false 如果是 true 就执行 语句体3
    .........
    d. 如果上述的 关系表达式当中, 每一个关系表达式的值, 都是 false 那么就执行 else 语句体当中的内容, 也就是 语句体 N+1
    
3. 案例
			需求：键盘录入学生考试成绩, 根据成绩程序给出不同的奖励。
      95~100分 : 自行车一辆
      90~94分  : 游乐场一次
      80~89分   : 变形金刚一个
      80分以下 : 挨顿揍, 这座城市又多了一个伤心的人~
			public static void main(String[] args){
        // 1. 使用Scanner录入考试成绩
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入您的成绩:");
        int score = sc.nextInt();
        // 2. 判断成绩是否在合法范围内 0~100
        if(score >=0 && score <= 100){
            // 合法成绩
						//-------------------------------
            // 3. 在合法的语句块中判断成绩范围符合哪一个奖励
            if(score >= 95 && score <= 100){
                System.out.println("自行车一辆");
            }else if(score >= 90 && score <= 94){
                System.out.println("游乐场一次");
            }else if(score >= 80 && score <= 89){
                System.out.println("变形金刚一个");
            }else {
                System.out.println("挨顿揍, 这座城市又多了一个伤心的人~");
            }
						//-------------------------------
        }else{
            // 非法的话, 给出错误提示
            System.out.println("您的成绩输入有误!");
        }
    }
```

 

### 第02节  switch语句

 **语法**

```
1. 语法
    switch(表达式){
        case  值1:
        ......语句体1.....
        break;
        case  值2:
        ......语句体2.....
        break;
      default:
        ......语句体N+1.....
        break;
    }

2. 流程
    a. 计算表达式的值, 看计算之后的值, 与哪一个 case 相匹配。
    b. 如果与其中的一个 case 匹配, 那么就执行对应的 语句体, 遇到 break 就结束。
    c. 如果与其中的任何一个 case 都不匹配, 那么就执行 default 语句体 N+1 , 遇到 break 就结束。
    
3. 注意事项
    a. 对于 表达式 而言, 数据类型有限制的，只能是以下的几种数据类型：
      	任何JDK版本: byte、 short、 char、 int
      	JDK5 版本:  枚举
      	JDK7 版本:  字符串 String 
    b. 对于 case 而言, 只能是 常量 不能是 变量
    c. 如果 不写 break, 出现 case 穿透现象, 直到找到最近的 break 为止。
```

 **练习**

```java
//两个情侣丢骰（tou）子,丢到几,就做对应的事情。

import java.util.Scanner;

public class Test03{
	
	public  static  void  main(String[] args){
		Scanner sc = new Scanner(System.in);
		System.out.println("switch请输入骰子数目:1-6");
		int touZi = sc.nextInt();
		//-----------
		switch(touZi){
			case 1:
				System.out.println("抱一下");
				break;
			case 2:
				System.out.println("亲一下");
				break;
			case 3:
				System.out.println("打一下");
				break;
			case 4:
				System.out.println("分手吧");
				break;
			case 5: 
			case 6:
				System.out.println("再来一次");
				break;
			default:
				System.out.println("你的骰子有问题");
				break;
		}
	}
}
```







### 第03节  for循环

**格式**

```java
for(初始化语句; 条件判断语句; 循环控制语句){
	......循环体语句.......
}
```

**流程**

```
1. 执行 初始化语句
2. 执行 条件判断语句, 判断 初始化语句是否满足 判断条件, 如果不满足, 循环结束,  如果满足, 执行循环体语句, 循环控制语句发生变化.
3. 执行 条件判断语句, 判断 变化之后的 初始化语句是否满足 判断条件, 如果不满足, 循环结束,  如果满足, 执行循环体语句, 循环控制语句发生变化.
4. 执行 条件判断语句, 判断 变化之后的 初始化语句是否满足 判断条件, 如果不满足, 循环结束,  如果满足, 执行循环体语句, 循环控制语句发生变化.
...........
5. 执行 条件判断语句, 判断  变化之后的 初始化语句是否满足 判断条件, 如果不满足, 循环结束。
```

**例如**

```java
for(int x = 1; x<= 5; x++){
    System.out.println("我错了,原谅我吧...");
}


/*
	1. 执行 x = 1
	2. 执行 x <= 5  条件满足吗?  x=1  x<=5 满足, 执行循环体, 打印输出 我错了,原谅我吧...  执行 x++;  此时此刻x=1 自增之后 x=2
	3. 执行 x <= 5  条件满足吗?  x=2  x<=5 满足, 执行循环体, 打印输出 我错了,原谅我吧...  执行 x++;  此时此刻x=2 自增之后 x=3
	4. 执行 x <= 5  条件满足吗?  x=3  x<=5 满足, 执行循环体, 打印输出 我错了,原谅我吧...  执行 x++;  此时此刻x=3 自增之后 x=4
	5. 执行 x <= 5  条件满足吗?  x=4  x<=5 满足, 执行循环体, 打印输出 我错了,原谅我吧...  执行 x++;  此时此刻x=4 自增之后 x=5
	6. 执行 x <= 5  条件满足吗?  x=5  x<=5 满足, 执行循环体, 打印输出 我错了,原谅我吧...  执行 x++;  此时此刻x=5 自增之后 x=6
	7. 执行 x <= 5  条件满足吗?  x=6  x<=5 不满足, 循环就结束。
*/
```

**案例1：打印输出 1 - 5 和 5 -1**

```java
public class  Test02{

    public static void main(String[] args){
        //打印输出  1-5
        //从1开始,到5结束,中间的变化的过程是累加的操作 1,2,3,4,5....
		for(int x=1; x<=5; x++){
            System.out.println(x);
        }
		
		System.out.println("========");
		
		//想要打印输出 5-1
		//从5开始,到1结束,中间变化的过程是不断减少的操作 5,4,3,2,1
		for(int y=5; y>=1; y--){
			System.out.println(y);
		}
    }
}
```

通过这个案例，你学会了什么？

```
什么时候, 采用 for 循环操作啊?
	范围性 问题, 优先考虑 for 循环操作。
	
范围有 开始位置 和 结束位置。
	开始位置: 循环的初始化语句。
	结束位置: 循环的条件判断语句。
```

**案例2：求和操作**

```java
public class Test03 {
    public static void main(String[] args) { 
        int sum = 0; 
        for(int i = 1; i <= 5; i++){ 
            //sum = sum + i;
            sum += i;
        }
        System.out.println("数据1-5的和为:" + sum);
    }
}
```

通过这个案例，你学会了什么？

```
求和操作的使用步骤?
	1. 定义： 循环前, 定义求和变量  int sum = 0;
	2. 变化： 循环中, 累加操作     sum += i;
	3. 输出： 循环后, 打印输出     System.out.println(sum);
```

**案例3：偶数求和**

```java
public class Test04 {

    public static void main(String[] args) { 
        int sum = 0; 
        for(int i = 1; i <= 100; i++){ 
            if(i % 2 == 0){ 
                sum += i;
            }
        }
        System.out.println("1-100之间的偶数和为:" + sum);
    }
}
```

通过这个案例，你学会了什么？

```
for 循环 和 if 语句搭配使用的场景:
	for 循环: 表示的是 在一定范围内的数据
	if 语句: 进行筛选, 选择 判断等操作。
	--------------------------
	结合在一起:  在一定范围内, 筛选满足要求的数据, 需要使用 for 和 if 搭配使用。
```

**案例4：打印输出所有的水仙花数**

```java
public class Test05 {

    public static void main(String[] args) { 
        for(int i = 100; i <= 999; i++){ 
            int ge = i % 10;
            int shi = i / 10 % 10;
            int bai = i /100 % 10; 
            if( (ge*ge*ge + shi*shi*shi + bai*bai*bai) == i){
                System.out.println(i);
            }
        }
    }
}
```

**案例5：统计水仙花个数**

```java
public class Test05 {
    public static void main(String[] args){ 
        int count = 0;
        for(int i = 100; i <= 999; i++){
            int ge = i % 10;
            int shi = i / 10 % 10;
            int bai = i / 10 / 10 % 10;
            
            if( (ge*ge*ge + shi*shi*shi + bai*bai*bai) == i){ 
                count++;
            }
        }
        
        System.out.println(count);
    }
}
```

通过这个案例，你学会了什么？

```
统计变量的使用步骤?
	1. 定义: 在循环前, 定义统计变量 int count = 0;
	2. 变化: 在循环中, 自增操作	 count++;
	3. 输出: 在循环后, 打印输出    System.out.println(count);
```

**打印输出语句的问题**

```java
System.out.println("helloWorld");   //先打印输出 helloWorld 在换行。
System.out.print("helloWorld");     //只是打印输出 helloWorld 
-----------------------
System.out.print("helloWorld\n");     //先打印输出 helloWorld 在换行。
System.out.print("helloWorld\t");     //先打印输出 helloWorld 在制表（留出一段空格距离,相当于是 TAB 键）。
```

**打印输出语句和循环的问题**

```
请问，什么时候打印输出语句,写在循环内部,什么时候打印输出语句写在循环的外面?
	1. 如果写在循环 内部, 循环是多次操作,需要多次打印输出。  //例如: 打印所有的水仙花数。 所有的,不止一个。
	2. 如果写在循环 外面, 循环是多次操作,写在外面,只有一个结果。  //例如: 求和操作  和 统计操作
```

**小结一下**

````
1. 遇到【范围】问题, 考虑循环操作。 开始位置 和 结束位置
2. 求和操作的步骤：
	A. 循环前, 定义求和变量  int sum = 0;
	B. 循环中, 变量累加操作  sum += i;
	C. 循环后, 打印输出结果  System.out.println(sum);
3. 统计变量的步骤:
	A. 循环前, 定义统计变量  int count = 0;
	B. 循环中, 变量自增操作  count++;
	C. 循环后, 打印输出结果  System.out.println(count);
4. for 循环语句 和 if 语句搭配使用的情况
	for 循环 表示的是 范围, if 语句 表示的是 筛选。 
	综合来说: 在一定范围内, 筛选满足要求的数据, 需要使用 for 循环 和 if 语句搭配使用。
````









### 第04节  while 循环

**格式**

```java
初始化语句;

while(条件判断语句){
	循环体语句;
	循环控制语句;
}
```

**流程**  说明，执行流程和 for 循环的执行流程是一样的。

```
1. 执行 初始化语句
2. 执行 条件判断语句, 判断 初始化语句是否满足 判断条件, 如果不满足, 循环结束,  如果满足, 执行循环体语句, 循环控制语句发生变化.
3. 执行 条件判断语句, 判断 变化之后的 初始化语句是否满足 判断条件, 如果不满足, 循环结束,  如果满足, 执行循环体语句, 循环控制语句发生变化.
4. 执行 条件判断语句, 判断 变化之后的 初始化语句是否满足 判断条件, 如果不满足, 循环结束,  如果满足, 执行循环体语句, 循环控制语句发生变化.
...........
5. 执行 条件判断语句, 判断  变化之后的 初始化语句是否满足 判断条件, 如果不满足, 循环结束。
```

**例如**

```java
int x = 1;
while(x<= 5){
    System.out.println("我错了,原谅我吧...");
    x++;
}

/*
	1. 执行 x = 1
	2. 执行 x <= 5  条件满足吗?  x=1  x<=5 满足, 执行循环体, 打印输出 我错了,原谅我吧...  执行 x++;  此时此刻x=1 自增之后 x=2
	3. 执行 x <= 5  条件满足吗?  x=2  x<=5 满足, 执行循环体, 打印输出 我错了,原谅我吧...  执行 x++;  此时此刻x=2 自增之后 x=3
	4. 执行 x <= 5  条件满足吗?  x=3  x<=5 满足, 执行循环体, 打印输出 我错了,原谅我吧...  执行 x++;  此时此刻x=3 自增之后 x=4
	5. 执行 x <= 5  条件满足吗?  x=4  x<=5 满足, 执行循环体, 打印输出 我错了,原谅我吧...  执行 x++;  此时此刻x=4 自增之后 x=5
	6. 执行 x <= 5  条件满足吗?  x=5  x<=5 满足, 执行循环体, 打印输出 我错了,原谅我吧...  执行 x++;  此时此刻x=5 自增之后 x=6
	7. 执行 x <= 5  条件满足吗?  x=6  x<=5 不满足, 循环就结束。
*/
```

**练习**

```java
public class Test {
    public static void main(String[] args){
        // 1. 定义计数器变量, 准备用于统计折叠的次数
        int count = 0;
        // 2. 准备纸张厚度变量, 珠峰高度变量
        double paper = 0.1;
        int zf = 8844430;
        //3. 折叠的过程是多次, 所以使用循环, 不确定循环次数, 使用while循环
        //  进入循环的条件为(厚度没有超过珠峰的高度就折叠)
        while(paper <= zf){
            paper *= 2;
            System.out.println(paper);
            // 4. 每折叠一次, 计数器就要自增(查数)
            count++;
        }
        // 5. 循环结束后, 打印计数器变量即可.
        System.out.println(count);
    }
}
```

通过这个案例，我们学会了什么？

```
什么时候, 采用 while 循环, 什么时候, 采用 for 循环?
	不明确 循环次数的情况下, 需要考虑 while 循环。
	因为我不清楚, 多少次可以 折叠完毕.

后期有固定的使用场景:
	1. 集合的迭代器当中
	2. IO流读取数据的时候
```







### 第05节  do...while循环

**格式**

```java
初始化语句;

do{
	.....循环体语句....
	循环控制语句;
}while(条件判断语句);
```

**特点**

````
不管 初始化语句, 是否满足 条件判断语句, 都会执行一次 循环体语句。  （简单一点说: 循环体语句至少执行1次）
````

**三种循环的区别**

```
1. for循环 while 循环 和 do...while 循环区别?
	for循环 while 循环: 先判断,再执行
	do...while 循环: 先执行,后判断

2. for循环 和 while 循环 有什么区别?
	for 循环: 循环结束之后, 初始化 变量, 不可以继续使用。
	while 循环: 循环结束之后, 初始化变量, 还可以继续使用。
```







### 第06节 死循环

**死循环通用格式**  主要采用的是 while 循环

```java
while(true){
	......死循环要做的事情.....
}
```



**死循环的应用场景** 死循环什么时候，会被使用得到？

```
例如: 需要一直重复的去做某件事情。
例如: 游戏制作的时候, 当我们的游戏启动之后,就是死循环开始的时候，当我们的游戏 GAME OVER 就是死循环结束的时候。
```







### 第07节  跳转控制语句

**两个关键字**

```java
1. continue : 继续, 跳过当前循环,继续下一次的循环 【向上跳】
2. break : 终止, 可以直接让循环结束 【向下跳】
```



**案例代码**

```java
public class Test01{

    public static void main(String[] args){
        
        for(int x=1; x<=10; x++){
            //判断语句
            if(x%3==0){
                 .........
            }
            System.out.println("HelloWorld");
        }
    }
}
```

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/a-Java/Snipaste_2023-06-11_12-59-19.png">









## 第五章   数组

### 第01节 基础理论

**为什么需要学习数组？**

```
1. 如果有很多个 相同数据类型的数据,在一起的时候, 采用前面定义变量的形式, 很复杂了。 100个int类型数据让你去定义。 需要容器去存放多个相同类型的变量。
2. 数组是引用数据类型, 为后期学习 其他引用数据类型（类、接口...）做准备工作的
3. 数组作为一种容器, 可以存放多个变量的情况, 为后期学习 集合（另外的一种容器）做准备工作的
```

**快速入门**

```java
//数组的快速入门
public class Demo {

    public static void main(String[] args) {

        //1. 需要定义一个数组
        //数据类型[]  数组名称 = new 数据类型[数组长度大小];
        int[] array = new int[3];
        
        System.out.println(array);  //[I@10f87f48  内存地址值
        //数组当中,数据的位置从0开始. 位置分别是 0,1,2 值是 0,0,0
        System.out.println(array[0]); //0
        System.out.println(array[1]); //0
        System.out.println(array[2]); //0

        //=======================
        //2. 给数组的元素赋值
        array[0] = 111;
        array[1] = 222;
        array[2] = 333;
        
        System.out.println(array);  //[I@10f87f48
        System.out.println(array[0]); //111
        System.out.println(array[1]); //222
        System.out.println(array[2]); //333

        //=======================
        //3. 数组里面一共有多少个数据?
        System.out.println(array.length);  //3

        //========================
        //4. 如果我想要展示出来每一个数据值
        for (int i = 0; i < array.length; i++) {
            System.out.println(array[i]);
        }
    }
}
```

通过上述案例，我们可以学会什么？

```
1. 数组的定义格式：  数据类型[]  数组名称 = new 数据类型[数组长度大小];
2. 直接打印输出数组名称, 获取到的是 数组的地址值
3. 如何访问数组元素呢?  可以采用 数组名称[脚标值]    脚标值从0开始
4. 知道数组长度的方式?  数组名称.length
5. 数组的遍历方式?     采用 for 循环遍历数组元素, 打印输出数组当中,每一个元素的值
```





### 第02节  内存图

**Java内存的划分**

```
1. 栈内存： 存放的是局部变量 和 方法信息（方法需要进栈执行）
2. 堆内存： 存放的是 new 出来的东西, 存在 地址值 和 默认值
3. 方法区： 存放 .class 字节码信息
4. 寄存器
5. 本地方法栈
```

**默认值的情况**

```
1. 整数类型的默认值是:  0
2. 浮点数类型的默认值是:  0.0
3. 字符类型的默认值是:  空字符
4. 布尔类型的默认值是:  false
5. 引用数据类型的默认值是:  null
```

一个数组内存图

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/a-Java/Snipaste_2023-06-11_12-59-43.png">





两个数组内存图

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/a-Java/Snipaste_2023-06-11_13-00-05.png">



共享数组的内存图

<img src="https://cosmocheng.oss-cn-chengdu.aliyuncs.com/study/B-%E8%AF%AD%E6%B3%95%E4%B8%93%E9%A2%98/a-Java/Snipaste_2023-06-11_13-00-37.png">







### 第03节  静态初始化

**格式**

```
1. 完整格式:
	A. 格式:
		数据类型[]  数组名称  = new  数据类型[] {  数值1,数值2,数值3,数值4 };
	B. 例如:
		int[]  arrayA = new int[]{ 11,22,33,44 };

2. 简化格式:
	A. 格式:
		数据类型[]  数组名称  =  {  数值1,数值2,数值3,数值4 };
	B. 例如:
		int[]  arrayA = { 11,22,33,44 };
```



**随机点名器**

```java
import java.util.Random;

//随机点名器
public class Test02 {

    public static void main(String[] args) {

        //定义一个数组,包含有全班的姓名信息,静态初始化
        String[] nameArray = {
                "严国斌","全小锦","郭敬玥","徐周达","祝凡","山帅哥"
        };

        //你觉得我应该怎么点啊?
        //我们随机的是 数组的索引（脚标值） 范围是从 0开始到 最大长度-1
        //nameArray[6]  没有的
        //随机数
        Random r = new Random();
        //int index = r.nextInt(5-0+1)+0;
        int index = r.nextInt(nameArray.length);

        System.out.println(nameArray[index]);
    }
}
```







### 第04节  数组的两个小问题

**数组索引越界异常**

```
1. 名称:  ArrayIndexOutOfBoundsException
2. 原因:  数组访问了 不存在的索引。 
3. 解决:  不要去访问这样的索引

---------------
例如:
	int[] array = new int[3];
	System.out.println(array[3]);  //就会出现异常,数组索引越界异常。索引的范围在 0~2 
```



**空指针异常**

```
1. 名称:  NullPointerException
2. 原因:  忘记了 new 的操作, 直接赋值为 null. 没有赋值,默认引用数据类型赋值为null.  简单一点说,就是没有 new
3. 解决:  补上 new 的操作
```







### 第05节  数组的遍历操作

**遍历**

```
把数组的元素, 无重复 无遗漏的 展示在控制台当中。
```

**案例代码**

```java
//数组的遍历操作
public class Test03 {

    public static void main(String[] args) {

        //静态初始化数组
        String[] foodArray = {
                "粥","粉","面","饭"
        };

        //遍历数组: 正向遍历方式. 快捷键： 数组名称.fori 回车
        for (int i = 0; i < foodArray.length; i++) {
            //快捷键:  foodArray[i].sou
            System.out.println(foodArray[i]);
        }

        System.out.println("-----------");

        //遍历数组: 反向遍历方式. 快捷键： 数组名称.forr 回车
        for (int i = foodArray.length - 1; i >= 0; i--) {
            //快捷键:  foodArray[i].sou
            System.out.println(foodArray[i]);
        }
    }
}
```









### 第06节  数组练习

**元素查找**

```java
import java.util.Scanner;

public class Test4 {
    
    public static void main(String[] args) {
        // 1.定义一个数组，用静态初始化完成数组元素的初始化
        int[] arr = {19, 28, 37, 46, 50};
        // 2.键盘录入要查找的数据，用一个变量接收
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入您要查找的元素:");
        int num = sc.nextInt();
        // 3.定义一个索引变量，初始值为-1
        // 假设要查找的数据, 在数组中就是不存在的
        int index = -1;
        // 4.遍历数组，获取到数组中的每一个元素
        for (int i = 0; i < arr.length; i++) {
            // 5.拿键盘录入的数据和数组中的每一个元素进行比较，如果值相同，就把该值对应的索引赋值给索引变量，并结束循环
            if(num == arr[i]){
                // 如果值相同，就把该值对应的索引赋值给索引变量，并结束循环
                index = i;
                break;
            }
        }
        //  6.输出索引变量
        System.out.println(index);
    }
}
```





**评委评分案例（综合案例）**

需求

```
在 我的好声音当中, 一共有 5 个评委,需要对 参赛选手 进行评分, 每位评委, 评分的范围在 0 - 100 之间。
需要去计算 平均分, 规则: 去掉最低分 之后的平均分。

例如:
	第1位评分的评分：
	98
	第2位评分的评分：
	92
	第3位评分的评分：
	97
	第4位评分的评分：
	95
	第5位评分的评分：
	100
	最终选手的平均分是:
	97
```

代码

```java
import java.util.Scanner;

//评委评分案例
public class Test02 {

    public static void main(String[] args) {

        //创建一个数组,采用动态初始化,长度为5
        int[] scoreArray = new int[5];

        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < scoreArray.length; i++) {
            System.out.println("请输入第" + (i + 1) + "个评委的分数:");
            int num = sc.nextInt();
            scoreArray[i] = num;
        }
        //========================
        // 计算总分 求和操作.循环前定义,循环中累加,循环后输出
        int sum = 0;
        for (int i = 0; i < scoreArray.length; i++) {
            sum += scoreArray[i];
        }
        //========================
        //计算最小值, 去掉最低分
        int min = scoreArray[0];
        for (int i = 0; i < scoreArray.length; i++) {
            if (scoreArray[i] < min) {
                min = scoreArray[i];
            }
        }
        //========================
        //计算平均分 = (总和 - 最小值)/(数组长度-1)
        int avg = (sum - min) / (scoreArray.length - 1);
        System.out.println("选手的平均分是:" + avg);
    }
}
```

















