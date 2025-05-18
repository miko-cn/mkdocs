# C\#技术生态深入浅出

> 摘要：本文章尝试深入浅出地简述C#技术生态里涉及到的一些技术名词以及他们之间的关系，
> 主要包含C#编程语言、.NET平台、Mono/IL2CPP等后端以及CLR、IL等涉及到程序编译运行的术语，
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

![古尔丹](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181744616.webp)

## .NET

> `.NET`，你经常看见它，但你很难从字面意义上去理解它和C#之间的关系。

2002年，微软发布了`.NET Framework`的1.0版本，主要面向Windows应用开发。

在这个互联网技术快速崛起的时期，微软希望这个新平台能够直接契合**“网络化”**的核心趋势，
当时`.com`域名热潮席卷全球，微软通过`.NET`名称对“网络即未来”的行业共识进行回应，`.NET`中的`NET`即网络（Network），强调平台连接不同设备和系统的设计初衷[^1]。

[^1]: [杨树权，闲话 .NET（2）：.NET 起名的原因、读法和演变，2024](https://mp.weixin.qq.com/s?__biz=Mzg4MjE3ODM0NA==&mid=2247484105&idx=1&sn=609626fba0f7bbe25047932746d7d4c1&chksm=ce8ac61a847a27853b6b3eadab15a6ad5bc7d304f73e70d848a30f179e4d77c5619fa7b5f526#rd)

微软甚至企图将`.NET`作下一代技术的统一后缀，例如`Microsoft.NET`、`VB.NET`、`ASP.NET`等。

??? note "`点Net` 还是 `DotNet` ？"
    早起开发者常因名称中的`.`符号感到困扰，出现了`点Net`和`DotNet`两种不同的称呼方式，这一混乱持续到2016年，
    微软推出的`.NET Core`明确采用`dotnet`作为命令行工具后才逐渐统一[^1]。

### 在世界还没有.NET时

在没有`.NET`和C#之前，程序员都在用什么开发Windows平台程序呢？
Visual Basic、C/C++、ASP，喔，当然还有微软最讨厌的Java！

不同编程语言（如VB和C++）的代码之间不互通，各自有各自的编译器和运行环境，
这导致开发团队协作效率低，微软希望未来可以让不同语言的程序能够无缝连接。

??? note "那微软为什么不只开发一个统一的语言呢？"
    一方面是考虑历史兼容性，微软早期的技术生态包含大量语言（VB/C++/J#等），强制统一语言会迫使开发者放弃原有的代码库和技能，导致生态分裂；
    另一方面考虑开发者偏好，不同语言的特性和适用场景不同（如VB.NET写UI层，C#写业务逻辑，F#做数据分析），保留语言多样性让开发者可以根据需求选择适合的语言，提升开发效率。

那为了让未来推出的一系列编程语言互通，需要怎么做呢？

### 统一执行 = CIL + CLR

编程语言是人类使用的高级语言，而计算机中的处理单元只能接受一些比较底层的代码指令集，人类的高级语言需要经过“翻译”才能被计算机所理解。

对于经常造一门新语言的同学来说应该比较熟悉“编译”和“解释”这两个概念，这是两种不同的“翻译”方式：

- **编译**：将源代码直接转换为机器码，生成的是特定计算硬件对应的可执行文件，由于其提前编译的特性，执行效率较高，但意味着需要针对不同平台编译不同的计算指令，比较典型的编译型语言有C和C++；
- **解释**：不提前编译代码，而是在程序实际运行时逐行解释源代码（同样是翻译成机器码），相比于提前编译来说执行效率较低，但好处在于开发调试过程更加高效，比较典型的解释型语言有Python和JavaScript。

![编译和解释](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181929667.webp)

??? note "划分 '编译型语言' 和 '解释型语言' 的不准确性讨论[^2]"
    尽管上文中为了阅读的通俗易懂性，将编译型和解释型进行了概念上的区分，也说了一些典型的语言例子，
    但实际上将一门语言完全定义为“编译型”或者“解释型”是不够准确的。

    编程语言仅仅会对这门语言的语义（或者说语法）的抽象描述，而不会对代码如何实际地被“翻译”进行限制或者定义，
    一门语言可以同时支持编译和解释，也可以只支持编译，也可以只支持解释，仅仅取决于工具链的设计。

    例如Java的机器码可以被JVM（Java虚拟机）在不同平台上解释执行，也可以被JIT（即时编译器）直接编译成具体平台的机器码执行。
    
[^2]: [RednaxelaFX，Java 是编译型语言还是解释型语言？，2013](https://www.zhihu.com/question/19608553/answer/18628779)

在这一个流程上，微软为了可以让不同语言的程序互通，采用了一种介于“编译”和“解释”之间的方式——“先编译，再解释”（有点类似于Java的JVM），
即：

- 先将不同语言的源代码编译成统一的**公共中间语言**（Common Intermediate Language，简称**CIL**，有些地方可能会叫MSIL或者IL）；
- 然后让统一的IL代码被**公共语言运行时**（Common Language Runtime，简称**CLR**）解释（一般是JIT）执行。

![CIL/CLR](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181946699.webp)

C#语言下输出一行`"Hello, World!"`的源代码和IL代码例子：

=== "C#"

    ```csharp
    Console.WriteLine("Hello, World!");
    ```

=== "CIL"

    ```C++
    .method private hidebysig static void  '<Main>$'(string[] args) cil managed
    {
        .entrypoint
        .maxstack  8
        IL_0000:  ldstr      "Hello, World!"
        IL_0005:  call       void [System.Console]System.Console::WriteLine(string)
        IL_000a:  nop
        IL_000b:  ret
    }
    ```

??? note "我该如何查看CIL代码？"
    你可以使用.NET SDK中的`ildasm.exe`工具来查看源代码编译的.exe或者.dll所对应的CIL代码。
    ![ildasm](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181028720.webp)

CLR收到各种语言的CIL代码后，使用JIT即使编译器将CIL代码转换为机器码，同时CLR还需要管理机器码程序运行时的内存分配、垃圾回收和代码访问边界监测等工作。

### 统一规范 = CTS + CLS

当然，为了让不同的语言可以实际地适配`IL+CLR`的流程，编程语言设计或实际代码需要满足一定的规范要求：

- **CTS**：公共类型系统（Common Type System），定义了.NET的类型系统，包括基本类型、类、接口、委托等，不同语言需要将自己的类型系统映射到CTS上，从而确保在语言之间可以进行类型安全的交互（比如C#的`int`和VB.NET的`Integer`，背后都是CTS的`System.Int32`）；
- **CLS**：公共语言规范（Common Language Specification），定义了跨语言互操作时必须遵守的最小功能集（比如禁止指针类型、使用符合规范的类型等），主要用于规范组件的公共接口，内部实现并不会受到约束，可以理解成是CLS的一个更加严格的CTS子集。

![CTS/CLS](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181946373.webp)

比如，CTS中要求[^3]：

- .NET中的所有类型不是值类型就是引用类型；
- `System.Object`是所有类型的基类；
- 类可以实现任意数量的接口，但只能继承一个基类（除`System.Object`外）；
- 所有类都必须至少有一个构造函数（如果没有显示定义，大多编译器将会自动生成一个默认的无参构造函数）；
- 枚举`System.Enum`不能定义自己的方法、不能实现接口、不能定义属性或事件；
- 接口成员必须全都具有`public`访问修饰符；
- 接口不能定义字段、属性；
- 返回类型不被视为方法签名的一部分；
- 方法重载必须具有不同的参数类型或参数数量；
- ...

[^3]: [Microsoft，通用类型系统，2024](https://learn.microsoft.com/zh-cn/dotnet/standard/base-types/common-type-system)

任何满足了CTS的高级语言都可以被称为“面向.NET框架的语言”，C#、F#和VB.NET是微软自己开发的符合CTS标准的语言，还有一些其他支持.NET平台的语言，比如Delphi.NET、Python.NET等；而CLS用于规范在不同语言之间操作的公共接口具体实现，比如C#某个类的标记为公共接口（使用到`[CLSCompliant]`标记）的函数参数只能使用`int`而不能使用`uint`，返回值不能是`void*`等等。

所以简单来讲，你可以说一门.NET语言满足了CTS（互通的基础），但是并非其所有特性都满足CLS（互通的约束）。

??? note "怎么没提到BCL和FCL？"
    如果你看到了这里，那你肯定懂这两个概念，对不对？要不然谁会问一个自己不懂的东西，对吧！哈哈！

    那万一你只是不小心点到了，没关系，不知道也无伤大雅，好奇的话就自己去微软文档里探索吧！

### .NET Framework

.NET Framework是微软最早的.NET实现，提供完整的开发框架（如WinForms、WPF、ASP.NET等），支持多种编程语言，C#、VB.NET等，但仅支持Windows系统，主要面向Windows桌面应用开发，代码闭源，无法做到跨平台。

.NET Framework各版本的简单总结：

1. 2002年，.NET Framework 1.0，微软首个.NET实现，支持C#和VB.NET等，提供基础类库（BCL）等；
2. 2005年，.NET Framework 2.0，引入泛型；
3. 2006年，.NET Framework 3.0，新增WPF（界面）、WCF（通信）等；
4. 2008年，.NET Framework 3.5，引入LINQ（查询）、AJAX支持等；
5. 2010-2019年，.NET Framework 4.x-4.8，引入了许多新特性和改进，如并行编程、动态语言、异步编程、MVC框架等。

微软在.NET博客宣布在2022年4月26日开始停止支持.NET Framework 4.52/4.6/4.61，不再为这些版本提供更新。

![.NET Framework](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505182120808.webp)

目前（2025年5月17日），.NET Framework 3.5和4.8.1仍然提供安全性和累计可靠性改进更新，微软仍然在维护.NET Framework的原因一方面是维护遗留系统，大量企业级引用（如WinForms、WPF、旧ASP.NET）仍依赖.NET Framework 4.8，另一方面是某些Windows的特性（如COM+、Registry访问）仍需依赖.NET Framework或特定包。

### .NET Core

`.NET Core`是微软在2016年推出的**开源**、跨平台版本的.NET实现，专注于轻量级、高性能和云原生应用，支持多操作系统（Windows、Linux、macOS），可用于开发Web应用、移动应用、桌面应用等。

![.NET Core](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505182150606.webp)

.NET Core各版本的简单总结：

1. 2016年，.NET Core 1.0，首个跨平台开源框架；
2. 2017年，.NET Core 2.0，性能优化，支持容器化，引入Razor Pages和.NET Standard2.0兼容；
3. 2019年，.NET Core 3.0，支持开发Windows桌面应用（WPF/WinForms），引入`System.Text.Json`；
4. 2019年底，.NET Core 3.1作为首个长期支持版本（LTS）发布，标志微软从传统迈向现代化跨平台转型的里程碑。
5. 后续版本跟随.NET 数字版本(例如5/6/7/8)一同更新发布。

### .NET 数字版本

对最近几年刚接触C#的开发者来说，比起.NET Core和.NET Framework，你可能看到更多的是.NET数字版本，例如.NET 5/6/7/8等，目前，.NET 10已经发布，但仍处于预览阶段(.NET 10.0.0-preview.4)。

微软从2020年发布`.NET 5`开始，将.NET Core、.NET Framework和Xamarin合并为统一的`.NET`平台，消除技术上的差异，统一开发体验，支持多平台开发。

![.NET 5](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505182245756.webp)

.NET 各数字版本的简单总结：

1. 2020年，.NET 5，首个数字版本，启动统一战略，支持​C# 9​​；
2. 2021年，.NET 6，首个完整统一的LTS版本，覆盖全场景开发，引入动态PGO、热重载(Hot Reload)等；
3. 2022年，.NET 7，原生AOT（提前编译）成熟，减少启动时间和内存占用，支持C#，以及正式发布.NET MAUI，统一移动端/桌面端UI开发流程；
4. 2023年，.NET 8，全面拥抱AI和云原生，成为企业级开发的标杆LTS版本；
5. 2024年，.NET 9，提升云原生和智能应用开发，专注于提高生产力、简化部署和加速人工智能集成；
6. 2025年，.NET 10，推出C# 14以及一系列性能、安全性和开发效率的新特性。

### .NET Standard

如果把`.NET`生态比作一个“编程工具世界”，不同平台（Windows的.NET Framework、跨平台的.NET Core、移动端的Xamarin等）就像不同的“国家”，各自有各自的“语言”（.NET语言可以调用的API和工具），`.NET Standard`就是一个通用语言字典，它告诉所有国家，当一个人说“Apple”的时候，你一定要给TA一个“苹果”，而不是给TA一个“去掉松木的菠萝(1)”。
{.annotate}

1. 松木(pine)，菠萝(pineapple)

开发者只要按照`.NET Standard`这本字典编写的代码，就可以在任何国家畅通无阻，不存在实现功能上的差异。

![.NET Standard](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/20250517213632.png)

例如在文件操作和网络请求上，各平台具有对应的API，在有统一标准前，不同平台的实现在代码中通过宏定义来进行区分，而统一后，开发者可以编写一次代码，跨平台运行。

实现读取文件到`string`的功能：

=== "在 .NET Standard 之前"

    ```csharp
    // 条件编译实现（不同平台使用不同 API）
    public class FileHelper
    {
        public string ReadAllText(string path)
        {
    #if NET45
            // .NET Framework 4.5 实现
            return System.IO.File.ReadAllText(path);
    #elif __IOS__
            // Xamarin iOS 实现
            return Foundation.NSString.FromData(
                Foundation.NSData.FromFile(path),
                Foundation.NSStringEncoding.UTF8);
    #elif NETCOREAPP
            // .NET Core 实现（旧版本可能没有完整 API）
            return System.IO.File.ReadAllText(path);
    #endif
        }
    }
    ```

=== "在 .NET Standard 之后"

    ```csharp
    // .NET Standard 2.0 项目
    public class UnifiedFileHelper
    {
        public string ReadAllText(string path)
        {
            // 直接使用 System.IO.File，所有平台一致
            return File.ReadAllText(path);
        }
    }
    ```

实现异步HTTP请求的功能：

=== "在.NET Standard 之前"

    ```csharp
    // 条件编译实现（不同平台使用不同 API）
    public class NetworkService
    {
        public async Task<string> GetAsync(string url)
        {
    #if NET45
            // .NET Framework 使用 HttpWebRequest
            var request = (HttpWebRequest)WebRequest.Create(url);
            using (var response = (HttpWebResponse)await request.GetResponseAsync())
            using (var reader = new StreamReader(response.GetResponseStream()))
            {
                return await reader.ReadToEndAsync();
            }
    #elif __IOS__
            // Xamarin iOS 使用 NSUrlSession
            var session = NSUrlSession.SharedSession;
            var dataTask = await session.CreateDataTaskAsync(new NSUrl(url));
            return NSString.FromData(dataTask.Data, NSStringEncoding.UTF8);
    #elif NETCOREAPP
            // .NET Core 使用 HttpClient
            using (var client = new HttpClient())
            {
                return await client.GetStringAsync(url);
            }
    #endif
        }
    }
    ```

=== "在 .NET Standard 之后"

    ```csharp
    // .NET Standard 2.0 项目
    public class UnifiedNetworkService
    {
        private readonly HttpClient _client = new HttpClient();

        public async Task<string> GetAsync(string url)
        {
            // 统一使用 HttpClient，无需平台判断
            return await _client.GetStringAsync(url);
        }
    }
    ```

.NET Standard到目前为止已经发布了9个版本(1.0-1.6，2.0-2.1)[^4]，每个新版本都会添加更多的API，这意味着如果你在编写类库时：

- 选择的.NET Standard版本越高，你能使用的API越多，但同时各.NET实现却可能会落后，能使用的平台范围变少（例如`2.1`版本无法在`.NET Framework 4.8.1`上运行）；
- 选择的.NET Standard版本越低，你能使用的API越少，各.NET实现却可能会更加统一，能使用的平台范围更广（例如`1.0`版本可以在绝大部分.NET实现上运行）；

[^4]: [Microsoft，.NET Standard，2025](https://dotnet.microsoft.com/zh-cn/platform/dotnet-standard#versions)

=== "1.0"
    ![1.0](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181111540.webp)
=== "1.1"
    ![1.1](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181111533.webp)
=== "1.2"
    ![1.2](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181118775.webp)
=== "1.3"
    ![1.3](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181119771.webp)
=== "1.4"
    ![1.4](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181119096.webp)
=== "1.5"
    ![1.5](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181119169.webp)
=== "1.6"
    ![1.6](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181120944.webp)
=== "2.0"
    ![2.0](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181120894.webp)
=== "2.1"
    ![2.1](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181120286.webp)

## Mono

做Unity游戏开发的同学应该不会对`Mono`这个词太陌生(1)，但你可能并不知道它具体是什么，对不对？
{.annotate}

1. 你总不能不知道`MonoBehaviour`这个基础类吧！

在Unity项目Project Setting的Scripting Backend中，可以看到默认是Mono（另一个选项是IL2CPP）：

![Unity Mono](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181437535.webp)

Mono是一个由Xamarin公司所主持的自由开放源码项目，目的是创建一系列符合 ECMA 标准的.NET工具，与微软的.NET Framework不同，Mono项目起始阶段主要致力于Linux桌面应用程序开发，第一次正式发布于2003年，在之后Mono逐渐演进为多个平台和操作系统上的.NET实现，包括Windows、Linux、macOS、iOS、Android等。

*[ECMA]: 主要指ECMA-334(C#语言规范) 和 ECMA-355(公共语言基础设施-CLI)

??? note "为什么Unity没有选择同样跨平台的.NET Core?"

    一方面是因为时间，2005年Unity初创时，.NET Framework仅支持Windows平台，
    而Mono作为开源跨平台.NET实现，完美契合Unity期望的“一次编写、多平台部署”的目标。

    另一方面Mono的轻量级设计（Boehm GC）更适合资源受限的移动设备和嵌入式环境，
    早期的.NET Core尚未对游戏开发场景进行优化。

    尽管Unity团队现在已经能够认识到比起自己造轮子，直接使用.NET Core可以获得更多的性能便利，
    但因为各种各样的历史遗留因素，直到目前最新的Unity6版本，.NET Core仍不被支持。
    一些小道消息提到Unity7版本可能会支持.NET Core。

### Mono简要发展阶段

1. 初创阶段（2001-2010）：旨在为Linux平台提供.NET实现，2003年首次发布，2010年推出第二代垃圾回收SGen，提升内存管理效率；
2. 黄金时期（2011-2016）：称为Unity引擎和Xamarin移动开发框架的核心组件，2014年Unity全面集成Mono运行时，支持C#脚本跨平台运行，支持AOT编译，满足iOS平台禁用JIT的限制；
3. 微软整合期（2016-2024）：微软收购Xamarin后，将Mono纳入.NET基金会，2019年发布最后一个Mono独立大版本（6.0），2020年和.NET 5整合，Mono作为轻量级运行时支持移动/WebAssembly场景，2024年微软将Mono项目移交给WineHQ，专注.NET统一生态；
4. 技术遗产延续（2025-今）：虽然Unity正逐步转向.NET Core，但Mono仍通过Wine-mono项目支持Windows兼容层，在Xamarin.Android/iOS等遗留系统中持续维护。

## IL2CPP

除了Mono外，你可以看到另一个Unity自己开发的Scripting Backend —— `IL2CPP`，如果你理解IL的话，也不难从字面上理解IL2CPP(Intermediate Language To C++)的内容，将C#源代码编译的IL中间语言代码，进一步转译为C++代码，可以一定程度上提高性能、安全性和平台兼容性。

![Unity IL2CPP](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505181539189.webp)

### 既生Mono，何生IL2CPP？

直到目前为止，Mono仍然是Unity引擎默认的脚本后端，Unity为何需要自己单独造一个轮子呢？

![IL2CPP](https://picgo-1256575825.cos.ap-guangzhou.myqcloud.com/202505182309031.webp)

除了Unity自己提到的有点，还有一些其他方面没有摆在明面上的原因：

一方面因为Mono许可的问题，早期时候Unity从Novell（在2003-2011年时期维护Mono的企业）获取了一个Mono2.0版本的Library-GPL的特殊许可，这个许可允许在商业应用程序中使用Mono而无需公开源代码，然而在Xamarin接管Mono（之后再被微软收购，更改为MIT许可）后，许可环境变得更加复杂，许可费用也变得更加高昂[^5] [^6]。没有长期稳定的商业授权协议，Unity无法轻易更新他们的Mono版本，也就意味着Unity开发者无法享受到新版Mono带来的.NET功能和性能改进（比如Mono 2.x仅支持到C# 4，Mono 5.x可以支持到C# 6）。

[^5]: [System，Mono Runtime Libraries License (LibraryGPL)，2011](https://discussions.unity.com/t/mono-runtime-libraries-license-librarygpl/27593/2)
[^6]: [arvzg1，Why does Unity need new Mono?，2014](https://discussions.unity.com/t/why-does-unity-need-new-mono/532351)

另一方面早期的Mono是为了在32位架构上运行而设计，苹果从2016年以后都要求必须支持ARM64架构（从iPhone 5s开始），并且iOS不允许将内存页同时设置为可写（Writable）和可执行（Executable），而JIT编译需要动态生成机器码并执行，这要求内存页同时具备这两种权限，而iOS会直接拒绝此类操作，原生代码的动态生成会被视为潜在的安全风险，然而尽管Unity使用的Mono支持了用于替代JIT的Full AOT模式，但该模式下无法构建ARM64的应用[^7]。

[^7]: [优梦创客，Unity热更新哪些事，2020](https://www.bilibili.com/video/BV1Ra411c7Gz/?vd_source=8f73aa16bfeeb7abf27d71b3f5560423)

> IL2CPP is the only scripting back end available when building for iOS and WebGL.
>
> 在为iOS和WebGL构建时，IL2CPP是唯一可用的脚本后端。
>
> — Unity Doc.

所以Unity赶在2016年苹果对64位的规定落实前，在2015年正式向大家发布了第一个使用IL2CPP的平台：iOS 64-bit。

### 双刃剑的优缺点

IL2CPP的优点：

- 性能提升：天然的AOT编译机制，将C#代码转换为C++并静态编译为机器码，相比Mono虚拟机的JIT，能显著减少运行时开销[^8]；
- 跨平台支持扩展：IL2CPP支持更多新平台（PS5、Xbox Series X/S、Switch）和架构（ARM64）；
- 安全性增强：转换后的C++代码反编译难度高于C#的IL代码，降低被逆向的风险。

[^8]: [Unity 2021.2功能亮点](https://mp.weixin.qq.com/s?__biz=MzkyMTM5Mjg3NQ==&mid=2247537186&idx=1&sn=c04bda6e4084be873270e8136f9f6a94&chksm=c0791dfd467cf568d418269a8b1c68089ed61197cb026776b125a904976db5a983aab3768282#rd)

IL2CPP的缺点[^9] [^10]：

- 编译时间延长：较长的构建链条涉及多步转换（C# → IL → C++ → Native），大型项目构建时间可能增加数倍，影响开发迭代速度；
- 调试难度增加：崩溃日志指向生成的C++代码而非原始C#，需要通过符号文件（Symbols）进行映射，调试工具支持不如Mono直观；
- 反射和动态代码限制：动态生成代码（如`System.Reflection.Emit`）在IL2CPP中无法运行，可能会影响某些库（如JSON序列化工具、动态代理框架等）；
- 代码过度裁剪：IL2CPP可能剥离未显示调用的代码，导致反射调用失败，需通过`link.xml`手动保留；
- 原生不支持热更新，需要由其他热更新技术支持（例如HybirdCLR、Lua、ILRuntime等）。

[^9]: [小玉，Unity将来时：IL2CPP怎么用？，2015](https://zhuanlan.zhihu.com/p/19972666)
[^10]: [罗鹏，Unity之IL2CPP，2020](https://mp.weixin.qq.com/s?__biz=MzU1Nzk2NTcwNg==&mid=2247483853&idx=1&sn=602cdd10958efdd8fdd2ff759517d886&chksm=fdba0825bb18f2d6c38560654ef0a479cc71ec07d013f4da480a6f3837c1da79ca6ebfd26ac9#rd)

## 小结

本篇文章仅仅是作为个人的疑问的解答合集，毕竟你很难在接触这些陌生概念的时候脑子里不多打几个问号，但又常常因为更要紧的事情而耽误了清理问号的过程，问号积累的太久，这一片看不清的领域逐渐变得不可名状起来，有时会严重到甚至会让人不想更加深入探寻这本应该探寻的宝藏之地。但好在所有的问题并不会因为搁置而消失，拾起勇气直面其中一个问题，更多的问题自然会闻着味来到你面前，快刀斩乱麻，好不快哉！

上面各小节提到的概念介绍和内容仅仅是C#和.NET生态的冰山一角，可以作为初学者了解这些概念之间大致关系的粗糙版本的指南地图，如果内容有帮助到你，那是你我的幸运，如果你发现内容有纰漏、谬误或者缺失引用，可以在文章底部提交你的反馈，无论如何，感谢！

了解这些概念后，在接触一些语言表层逻辑下的优化、适配等工作的时候，会变得更加有方向感，最后，将韩愈的《增广贤文》的诗句赠予在C#和.NET的旅途上的各位前辈后辈：

> 书山有路勤为径，学海无涯苦作舟。
