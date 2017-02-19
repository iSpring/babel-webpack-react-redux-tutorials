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
  <p align="center">Google Trend: AJAX从2005年开始得到开发人员的广泛关注</p>
</p>

## 前端兼容性Framework的出现
IE在第一次浏览器大战中击败Netscape赢得胜利，垄断了浏览器市场。作为独裁者，IE并不遵循W3C的标准，IE成了事实标准。

Netscape于1998年被AOL收购前创建了Mozilla社区，Firefox于2004年11月首次发布，并且9个月内下载量超过6000万，获取了巨大的成功，IE的主导地位首次受到了挑战，Firefox被认为是Netscape的精神续作。

之后Firefox浏览器一路奋起直追，逐渐蚕食IE市场份额，这引发了第二次浏览器战争。在2008年底时，Firefox的市场份额达到了25%以上，IE则跌至65%以下。

第二次浏览器战争中，随着以Firefox和Opera为首的W3C阵营与IE对抗程度的加剧，浏览器碎片化问题越来越严重，不同的浏览器执行不同的标准，对于开发人员来说这是一个恶梦。

为了解决浏览器兼容性问题，Dojo、jQuery、YUI、ExtJS、MooTools等前端Framework相继诞生。前端开发人员用这些Framework频繁发送AJAX请求到后台，在得到数据后，再用这些Framework更新DOM树。

其中，jQuery独领风骚，几乎成了所有网站的标配。Dojo、YUI、ExtJS等提供了很多组件，这使得开发复杂的企业级Web应用成为可能。

<p align="center">
  <img width="80%" src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/web-brief-history/images/libs.png">
  <p align="center">Google Trend: 蓝色jQuery，红色Dojo，绿色YUI，紫色ExtJS，黄色MooTools</p>
</p>

## 前端MV*架构和SPA
随着AJAX和jQuery等的流行，前端不再是人们眼中的小玩意，以前在C/S中实现的桌面软件的功能逐步迁移到了前端，前端的代码逻辑逐渐变得复杂起来。

以前只用于后台的`MV*`等架构在前端逐渐使用起来，以下列举了部分常用的`MV*`框架.

框架 | 架构 | 最初发布时间 | GitHub Stars
------ | ------ | ------ | ------
Knockout | MVVM | 2010年7月 | [![Knockout Repo](https://img.shields.io/github/stars/knockout/knockout.svg)](https://github.com/knockout/knockout)
Backbone | MVP | 2010年10月 | [![Backbone Repo](https://img.shields.io/github/stars/jashkenas/backbone.svg)](https://github.com/jashkenas/backbone)
Angular | MVC->MVVM | 2010年10月 | [![Angular Repo](https://img.shields.io/github/stars/angular/angular.svg)](https://github.com/angular/angular.js)
Ember | MVVM | 2011年12月 | [![Ember Repo](https://img.shields.io/github/stars/emberjs/ember.js.svg)](https://github.com/emberjs/ember.js)
Meteor | MVC | 2012年1月 | [![Meteor Repo](https://img.shields.io/github/stars/meteor/meteor.svg)](https://github.com/meteor/meteor)
Vue | MVVM | 2014年7月 |[![Vue Repo](https://img.shields.io/github/stars/vuejs/vue.svg)](https://github.com/vuejs/vue)

随着这些MV*框架的出现，网页逐渐由Web Site演变成了Web App，最终导致了单页应用（ Single Page Application）的出现。

## HTML5
1999年，W3C发布了HTML 4.0.1版本，在之后的几年，没有再发布更新的Web标准。随着Web的迅猛发展，旧的Web标准已不能满足Web应用的快速增长。

2004年6月，Mozilla基金会和Opera软件公司在万维网联盟（W3C）所主办的研讨会上提出了一份联合建议书，其中包括Web Forms 2.0的初步规范草案。建议举行一次投票，以表决W3C是否应该扩展HTML和DOM，从而满足Web应用中的新需求。研讨会最后以8票赞成，14票反对否决此建议，这引起一些人的不满，不久后，部分浏览器厂商宣布成立网页超文本技术工作小组（WHATWG），以继续推动该规范的开发工作，该组织再度提出Web Applications 1.0规范草案，后来这两种规范合并形成HTML5。2007年，获得W3C接纳，并成立了新的HTML工作团队。2008年1月22日，第一份正式草案发布。

HTML5草案发布不久，Google在2008年12月发布了Chrome浏览器，加入了第二次浏览器大战当中。Chrome使用了Safari开源的WebKit作为布局引擎，并且研发了高效的JavaScript引擎V8。

尽管HTML5在网络开发人员中非常出名了，但是它成为主流媒体的一个话题是在2010年的4月，当时苹果公司的CEO乔布斯发表一篇题为“对Flash的思考”的文章，指出随着HTML5的发展，观看视频或其它内容时，Adobe Flash将不再是必须的。这引发了开发人员间的争论，包括HTML5虽然提供了加强的功能，但开发人员必须考虑到不同浏览器对标准不同部分的支持程度的不同，以及HTML5和Flash间的功能差异。

在第二次浏览器大战中，各个浏览器厂商都以提升JavaScript运行效率和支持HTML5各种新特性为主要目标，这促进了浏览器的良性竞争。在这一场战争中，Chrome攻城略地，抢夺IE市场份额。2013年，Chrome超过IE，成为市场份额最高的浏览器。2016年，Chrome占据了浏览器市场的半壁江山。

<p align="center">
  <img src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/web-brief-history/images/StatCounter-browser-200901-201701.png">
  <p align="center">全球浏览器市场份额（2009-2017）</p>
</p>


自2008年以来，浏览器中不断支持的HTML5新特性让开发者激动不已：WebWorker可以让JavaScript运行在多线程中，WebSocket可以在前端实现与后台的双工通信，WebGL可以创建Web3D网页游戏...


<p align="center">
  <img src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/web-brief-history/images/h5-destokp.png">
  <p align="center">桌面浏览器对HTML5支持程度（2009-2017）</p>
</p>

2014年10月28日，W3C正式发布HTML 5.0推荐标准。

## 移动Web和Hybrid

随着iOS和Android等智能手机的广泛使用，移动浏览器也逐步加强了对HTML5特性的支持力度。


<p align="center">
  <img src="https://github.com/iSpring/react-step-by-step-tutorials/blob/master/tutorials/web-brief-history/images/h5-mobile.png">
  <p align="center">移动浏览器对HTML5支持程度（2009-2017）</p>
</p>


移动浏览器的发展，导致了流量入口逐渐从PC分流到移动平台，这是Web发展的新机遇。移动Web面临着更大的碎片化和兼容性问题，相应的移动Web框架也随之出现。

相比于Native App，移动Web开发成本低、跨平台、发布周期短的优势愈发明显，但是Native App的性能和UI体验要远胜于移动Web。移动Web与Native App孰优孰劣的争论愈演愈烈，在无数开发者的实践中，人们发现两者不是替代关系，而是应该将两者结合起来，取长补短，Hybrid技术逐渐得到认同。

## Node.js

## ES6

参考：

[1] W3C, [A history of HTML](https://www.w3.org/People/Raggett/book4/ch02.html)

[2] W3C, [A Short History of JavaScript](https://www.w3.org/community/webed/wiki/A_Short_History_of_JavaScript)

[3] Wikipedia, [Browser wars](https://en.wikipedia.org/wiki/Browser_wars)

[4] Wikipedia, [Netscape Navigator usage data](https://en.wikipedia.org/wiki/File:Netscape-navigator-usage-data.svg)

[5] WittyCookie, [What are the major differences among Web 1.0, 2.0 and 3.0?](https://wittycookie.wordpress.com/2012/06/04/what-are-the-major-differences-among-web-1-0-2-0-and-3-0/)

[6] Wikipedia, [Firefox](https://zh.wikipedia.org/wiki/Firefox)

[7] InfoQ, [Top JavaScript MVC Frameworks](https://www.infoq.com/research/top-javascript-mvc-frameworks)

[8] Wikipedia, [HTML5](https://zh.wikipedia.org/wiki/HTML5)

[9] HTML5Test, [Desktop Browsers](https://html5test.com/results/desktop.html)

[10] HTML5Test, [Mobile Browsers](https://html5test.com/results/mobile.html)

[8] [Total number of Websites](http://www.internetlivestats.com/total-number-of-websites/)

[9] [Browser Wars](https://36kr.com/p/114876.html)