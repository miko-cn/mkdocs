# C\#技术生态解析

> 摘要：本文章尝试深入浅出地简述C#技术生态里涉及到的一些技术名词以及他们之间的关系，
> 主要包含C#编程语言、.Net框架、Mono/IL2CPP等后端以及CLR、IL等涉及到程序编译运行的术语，
> 推荐入门C#编程和Unity开发的同学阅读。

## C\#

相信不少人在刚接触C#语言的时候（多数情况下是通过Unity游戏开发了解），
各类教程和文档只会告诉你在开发的时候需要使用C#语言、
电脑环境需要安装 `.Net SDK`和`VisualStudio`（善解人意的Unity会自动帮你安装），
创建模板工程或者项目，打开编辑器，好了现在你可以开始写C#啦：

=== "Hello, World"

    ```C#
    using System;

    public class HelloWorld
    {
      static void Main(string[] args)
      {
        Console.WriteLine("Hello World");
      }
    }
    ```

=== "Unity"

    ```C#
    using UnityEngine;

    public class GameObjectScript : MonoBehaviour
    {
        void Awake() { }
        void Update() { }
    }
    ```

对不对？接下来更多就是往里添加`if-else`、`for`和更多的`class`了对吧？

你可能还会在C#语言本身的特性（泛型、引用、垃圾回收等）和程序设计方法上下点功夫，
再点一些调试技能树，如果你能做到这些，那恭喜你，你已经能满足大部分工作需求了！

“**但是，古尔丹，剩下的那小部分是什么呢？**”

## .NET

> `.NET`，你经常看见它，但你很难从字面意义上去理解它和C#之间的关系。

2002年，微软发布了`.NET Framework`的1.0版本，主要面向Windows应用开发。

在这个互联网技术快速崛起的时期，微软希望这个新平台能够直接契合**“网络化”**的核心趋势，
当时`.com`域名热潮席卷全球，微软通过`.NET`名称对“网络即未来”的行业共识进行回应，`.NET`中的`NET`即网络（Network），强调平台连接不同设备和系统的设计初衷。

微软甚至企图将`.NET`作下一代技术的统一后缀，例如`Microsoft.NET`、`VB.NET`、`ASP.NET`等。

!!! note "`点Net` 还是 `DotNet` ？"
    早起开发者常因名称中的`.`符号感到困扰，出现了`点Net`和`DotNet`两种不同的称呼方式，这一混乱持续到2016年，
    微软推出的`.NET Core`明确采用`dotnet`作为命令行工具后才逐渐统一。

### 在世界还没有.NET时

在没有`.NET`和C#之前，程序员都在用什么开发Windows平台程序呢？
Visual Basic、C/C++、ASP，喔，当然还有微软最讨厌的Java！

微软认为不同编程语言（如VB和C++）的代码之间不互通，开发团队协作效率低，希望未来可以让不同语言的程序能够无缝连接，