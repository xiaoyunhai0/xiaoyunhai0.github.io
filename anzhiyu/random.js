var posts=["2025/08/07/Flappy-Bird-XLua-Migration/","2025/07/22/Lua & xLua 语法教学（Unity向）/","2025/07/03/Hello-Hexo/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };