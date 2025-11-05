var posts=["2025/08/07/Flappy-Bird-XLua-Migration/","2025/07/03/Hello-Hexo/","2025/08/08/3DRacing/","2025/07/22/Lua & xLua 语法教学（Unity向）/","2025/08/22/Git使用SSH的Push和Pull/","2025/08/20/ARSandBox/","2025/10/03/Unity常用插件/","2025/10/10/Unity_Framework/","2025/10/01/Unity常用工程目录/","2025/11/03/Komari探针/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };