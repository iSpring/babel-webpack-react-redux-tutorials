时至今日，Web经过了二十多年的发展，历经了从无到有、从简到繁的各个阶段。

## 静态网页的诞生
1989年，在欧洲粒子物理实验室（European Laboratory for Particle Physics）的IT部门工作的Tim Berners-Lee向其领导提出了一项名为[Information Management: A Proposal](https://www.w3.org/History/1989/proposal.html)的提议：粒子物理研究通常与来自世界各地的研究所进行合作。 蒂姆有一个想法，使来自世界各地的远程站点的研究人员能够组织和汇集信息，使其能够将在个人计算机上访问大量的科研文献，并建议在文档中链接其他文档，这就是Web的原型。

<p align="center">
  <img width="80%" src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/web-brief-history/images/Tim.jpg">
  <p align="center">Tim Berners-Lee</p>
</p>

1990年，Tim以超文本语言HTML为基础在NeXT电脑上发明了最原始的Web浏览器。

1991年，Tim作为布道者在Internet上广泛推广Web的理念，与此同时，美国国家超算应用中心（National Center for Supercomputer Applications）对此表现出了浓厚的兴趣，并开发了名为*Mosaic*的浏览器，于1993年4月进行了发布。

1994年5月，第一届万维网大会在日内瓦召开。

<p align="center">
  <img src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/web-brief-history/images/WWWConference.jpg">
  <p align="center">从左至右依次为：Joseph Hardin,Robert Cailliau, Tim Berners-Lee, Dan Connolly</p>
</p>

1994年7月，HTML2规范发布。

1994年9月，因特网工程任务组（Internet Engineering Task Force）设立了HTML工作组。

1994年11月，*Mosaic*浏览器的开发人员创建了网景公司（Netscape Communications Corp.），并发布了*Mosaic Netscape 1.0 beta*浏览器，后改名为*Navigator*。

1994年底，由Tim牵头的万维网联盟（World Wide Web Consortium）成立，这标志着万维网的正式诞生。

<p align="center">
  <img src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/web-brief-history/images/WWWConsortium.jpg">
  <p align="center">万维网部分成员</p>
</p>

此时的网页以HTML为主，是纯静态的网页，网页是“只读”的，信息流只能通过服务器到客户端单向流通，由此世界进入了Web 1.0时代。

## JavaScript的诞生
1995年，网景工程师[Brendan Eich](https://en.wikipedia.org/wiki/Brendan_Eich)花了10天时间设计了JavaScript语言。起初这种脚本语言叫做Mocha，后改名LiveScript，后来为了借助Java语言创造良好的营销效果最终改名为JavaScript。网景公司把这种脚本语言嵌入到了Navigator 2.0之中，使其能在浏览器中运行。

与此相对的是，1996年，微软发布了[VBScript](https://en.wikipedia.org/wiki/VBScript)和[JScript](https://en.wikipedia.org/wiki/JScript)。JScript是对JavaScript进行逆向工程的实现，并内置于Internet Explorer 3中。但是JavaScript与JScript两种语言的实现存在差别，这导致了程序员开发的网页不能同时兼容Navigator和Internet Explorer浏览器。Internet Explorer开始抢夺Netscape的市场份额，这导致了第一次[浏览器战争](https://en.wikipedia.org/wiki/Browser_wars)。

<p align="center">
  <img width="80%" src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/web-brief-history/images/Netscape-navigator-usage-data.png">
  <p align="center">Netscape的市场份额逐年萎缩</p>
</p>

1996年11月，为了确保JavaScript的市场领导地位，网景将JavaScript提交到欧洲计算机制造商协会（European Computer Manufacturers Association）以便将其进行国际标准化。

1997年6月，ECMA以JavaScript语言为基础制定了ECMAScript标准规范ECMA-262。JavaScript是ECMAScript规范最著名的实现之一，除此之外，ActionScript和JScript也都是ECMAScript规范的实现语言。自此，浏览器厂商都开始逐步实现ECMAScript规范。

1998年6月，ECMAScript2规范发布，并通过ISO生成了正式的国际标准ISO/IEC 16262 。

1999年11月，ECMAScript3规范发布，在此后的十年间，ECMAScript规范基本没有发生变动。ECMAScript3成为当今主流浏览器最广泛使用和实现的语言规范基础。

第一次浏览器战争以IE浏览器完胜Netscape而结束，IE开始统领浏览器市场，份额的最高峰达到2002年的96%。随着第一轮大战的结束，浏览器的创新也随之减少。

## 动态页面的崛起
JavaScript诞生之后，可以用来更改前端DOM的样式，实现一些类似于时钟之类的小功能。那时候的JavaScript仅限于此，大部分的前端界面还很简单，显示的都是纯静态的文本和图片。这种静态页面不能读取后台数据库中的数据，为了使得Web更加充满活力，以PHP、JSP、ASP.NET为代表的动态页面技术相继诞生。

PHP（PHP：Hypertext Preprocessor）最初是由Rasmus Lerdorf在1995年开始开发的，现在PHP的标准由PHP Group维护。PHP是一种开源的通用计算机脚本语言，尤其适用于网络开发并可嵌入HTML中使用。PHP的语法借鉴吸收C语言、Java和Perl等流行计算机语言的特点，易于一般程序员学习。PHP的主要目标是允许网络开发人员快速编写动态页面。

JSP（JavaServer Pages）是由Sun公司倡导和许多公司参与共同创建的一种使软件开发者可以响应客户端请求，而动态生成HTML、XML或其他格式文档的Web网页的技术标准。JSP技术是以Java语言为基础的。1999年，JSP1.2规范随着J2EE1.2发布。

ASP（Active Server Pages）1.0 在1996年随着IIS 3.0 而发布。2002年，ASP.NET发布，用于替代ASP。

随着这些动态服务器页面技术的出现，页面不再是静止的，页面可以获取服务器数据信息并不断更新。以Google为代表的搜索引擎以及各种论坛相继出现，使得Web充满了活力。

随着动态页面技术的不断发展，后台代码变得庞大臃肿，后端逻辑也越来越复杂，逐渐难以维护。此时，后端的各种MVC框架逐渐发展起来，以JSP为例，Struct、Spring等框架层出不穷。

从Web诞生至2005年之前，一直处于后端重、前端轻的状态。

## AJAX的流行
在Web最初发展的阶段，前端页面要想获取后台信息需要刷新整个页面，这是很糟糕的用户体验。

Google分别在2004年和2005年先后发布了两款重量级的Web产品：Gmail和Google Map。这两款Web产品都大量使用了AJAX技术，不需要刷新页面就可以使得前端与服务器进行网络通信，这虽然在当今看来是理所应当的，但是在十几年前AJAX却是一项革命性的技术，颠覆了用户体验。

随着AJAX的流行，越来越多的网站使用AJAX动态获取数据，这使得动态网页内容变成可能，像Facebook这样的社交网络开始变得繁荣起来，前端一时间呈现出了欣欣向荣的局面。

AJAX使得浏览器客户端可以更方便地向服务器发送数据信息，这促进了Web 2.0的发展。

<p align="center">
  <img width="80%" src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/web-brief-history/images/AJAX.png">
  <p align="center">Google Trend: 从2005年开始流行起来</p>
</p>

## 前端兼容性Library的出现

## SPA和前端MVC
因为有了AJAX，前端不再是人们眼中的小玩意，许多以前只能在后台完成的功能逐步迁移到了前端，前端的代码逻辑逐渐变得复杂起来。

## HTML5和移动Web

## Node.js的诞生

## ES6

参考：

[1] W3C, [A history of HTML](https://www.w3.org/People/Raggett/book4/ch02.html)

[2] W3C, [A Short History of JavaScript](https://www.w3.org/community/webed/wiki/A_Short_History_of_JavaScript)

[3] Wikipedia, [Browser wars](https://en.wikipedia.org/wiki/Browser_wars)

[4] Wikipedia, [Netscape Navigator usage data](https://en.wikipedia.org/wiki/File:Netscape-navigator-usage-data.svg)

[5] WittyCookie, [What are the major differences among Web 1.0, 2.0 and 3.0?](https://wittycookie.wordpress.com/2012/06/04/what-are-the-major-differences-among-web-1-0-2-0-and-3-0/)

[6] [Total number of Websites](http://www.internetlivestats.com/total-number-of-websites/)