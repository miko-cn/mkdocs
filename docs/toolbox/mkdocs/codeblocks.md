# Code Blocks - 代码块

```py
print("Hello, Code Blocks!")
```

---

添加标题`#!py title="title"`：

```py title="hello.py"
print("Hello, Code Blocks!")
```

```md
```py title="hello.py"
...
```

---

添加行号`#!py linenums="1"`：

``` py linenums="1"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

```md
```py linenums="1"
...
```

!!! note "更改起始行号"
    行号默认从1开始，更改`linenums`的值可以更改行号的起始值。

---

高亮代码行：

``` py linenums="1" hl_lines="2 3"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

```md
```py hl_lines="2 3"
...
```

还可以使用范围指定的模式：

``` py linenums="1" hl_lines="2-4"
def bubble_sort(items):
    for i in range(len(items)):
        for j in range(len(items) - 1 - i):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
```

```md
```py hl_lines="2-4"
...
```
