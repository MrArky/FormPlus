# FormPlus
一个用于PC端表单设计的插件
![1630565218(1)](https://user-images.githubusercontent.com/32703528/131796215-894f22a5-6ddb-4d2d-afb3-aefa8fdcd922.jpg)

> 技术栈：React+AntDesign+TinyEditor

[demo](https://mrarky.github.io/FormPlus/build/index.html)

#### 注意：

* 本着组件依赖尽可能少的初衷，因此在组件中没有引入类似Redux等状态管理工具，如果想进行改造，自行引入习惯的状态管理。
* TinyEditor需要配置**apiKey**，该Key需要在其官网上注册后获取，如图：
![image](https://user-images.githubusercontent.com/32703528/132271672-5d8c77ec-02f6-4c46-91df-408b9227bbef.png)
**apiKey**会影响编辑器组件的使用，见src/components/FormPlus/components/DesignerBoard.tsx中引入的Editor组件plugins属性。
配置见src/components/FormPlus/components/DesignerBoard.tsx中引入的Editor组件apiKey属性。
  


