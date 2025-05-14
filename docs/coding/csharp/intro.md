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

**“但是，古尔丹，剩下的那小部分是什么呢？”**

