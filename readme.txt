下载下来后 在任意目录 npm i -g 
安装king builder

拷贝gulpfile.js文件到需要打包的目录

cmd执行kpack就可以了

目录结构：

src/

index.html
css/xx.css
js/xx.js
img/ xx.jpg xx.png xx.svg xx.gif
conf_hand/xxx.json

目录名任意

命令：
kpack 
不带图片压缩

kpack imgmin
带图片压缩