# 北航本科毕业论文排版软件

用于排版北航本科毕业论文

# 在线使用

https://ianpas.github.io/auto-format/

# 使用手册

* [软件简介](https://github.com/ianpas/auto-format/issues/8)
* [如何写摘要](https://github.com/ianpas/auto-format/issues/1)
* [如何写新的一章/节/条](https://github.com/ianpas/auto-format/issues/2)
* [如何使用图片](https://github.com/ianpas/auto-format/issues/3)
* [如何使用表格](https://github.com/ianpas/auto-format/issues/4)
* [如何使用公式](https://github.com/ianpas/auto-format/issues/5)
* [如何使用款和项](https://github.com/ianpas/auto-format/issues/6)
* [如何写参考文献](https://github.com/ianpas/auto-format/issues/7)
* [如何添加封面](https://github.com/ianpas/auto-format/issues/10)

# 本地设置

在本地把项目跑起来，需要依次运行以下命令：

* `npm install` ：安装lerna，用于管理多个npm包
* `npm run bootstrap`：安装各个模块（npm包）的依赖
* `npm run build`：构建各个模块
* `npm run start`：启动排版论文的网站

运行各模块单元测试：

* `npm run test`

# 实现原理

其实，实现原理部分，最好的做法就是把论文也上传上来，因为对于这个毕设来说，论文就是写这个软件怎么实现的最好文档。

不过论文现在还是不上传好了。。这里打算写核心的思路。

你操作word文件，做了一些修改，最后文件保存了，下次打开你还能看到修改过的地方，这是因为你对word文件的操作，都凝结在文件里了（最后都以文件的形式保存下来了）。也就是说，每一个操作都会对应一个文件的变化，比如你设置一级标题，那么必然word文件某个部分就会改变，所以，反过来说，只要你修改这个文件，那么就相当于你设置了一级标题样式。

所以，把没排版的论文变成排版好的论文，实际上就是对文件的处理。要处理一个文件，就要知道它的格式，docx格式的文档是遵循OpenXML规范的，所以就只需要去看OpenXML规范。所以最后整个项目最重要的就是读规范，比如实际上word文件是一个zip压缩包，里面是一堆xml文件，那么实际上读规范就是去看这些xml文件每个是起什么作用的，如果都搞清楚了，你其实可以用代码轻易地进行等价的word操作，这样排版就不是什么麻烦的事情了。

只要你也去读了那个规范，就会发现实现的思路很直白。其实我的代码写的不是很好，算法、架构、代码组织那些都做得不太好。过了几个月我自己再看都发现很多问题。上传上来，希望整个处理过程能作个参考，最有价值的反而是那些测试用例。

# 开源许可证
MIT
