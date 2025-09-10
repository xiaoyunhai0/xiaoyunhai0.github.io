var posts=["2025/08/07/Flappy-Bird-XLua-Migration/","2025/07/03/Hello-Hexo/","2025/08/08/3DRacing/","2025/07/22/Lua & xLua 语法教学（Unity向）/","2025/08/22/Git使用SSH的Push和Pull/","2025/09/10/个人实习项目—SandBox/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };