## 背景

在日常开发中，我们往往会遇到一些繁琐的小问题，这些小问题虽然解决起来花不了多少时间，但是聚沙成塔，最终还是会影响到我们的开发效率。
比如：

我们创建 React 组件，新建文件的时候，往往是用小写单词拼接去命名这个文件:`one-test-react-component.tsx`

而我们在该文件里定义这个组件时，我们又需要写成 Pascal 的形式:
`OneTestReactComponent`

这时候我就会想，啊，有没有一个快捷的工具，能够直接将`one-test-react-component`转换为`OneTestReactComponent`，而省去我手动一个个修改单词首字母呢？

再比如，我们往往在开发单页应用的时候，会给该应用的每张 page 设置不同的路由和权限 code
而根据命名规范，我们往往会将一张 HomePage 组件的路由设置为`HOME_PAGE_ROUTE_PATH`,权限 code 设置为`HOME_PAGE_ROUTE_AUTH_CODE`。

这时候我也会想，啊，一个个去变成大写字母，在一个个去按下划线让他们接起来，也很痛苦，有没有一个快捷的工具能救救我？

于是这个插件就诞生啦！！😄

## 功能描述

本插件支持几种快速的字符格式转换，不过这些转换有一些规则的限制，如下：

1. 全部转换为小写：`l HELLO WORLD`=> `hello world`
2. 全部转换为大写：`c hello world`=> `HELLO WORLD`
3. 小写字符串下划线拼接(拼接的内容以空格分割):`u hello world`=> `hello_world`
4. 大写字符串下划线拼接(拼接的内容以空格分割):`uc hello world`=> `HELLO_WORLD`
5. 字符转为 Pascal(拼接的内容以`" "`或者`"_"`分割):`p hello_world`=> `HelloWorld`
6. 默认不加任何的标识，则全部转换为大写:`hello world`=> `HELLO WORLD`
7. 输入`mwf`后（mwf: Modal with Form），按下快捷键，即可获取带有 Form 表单的弹窗组件的模版代码
8. 输入`pm`后（mwf: Pure Modal），按下快捷键，即可获取弹窗组件的模版代码
