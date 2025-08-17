var posts=["2025/08/17/hello-world/","2025/08/17/xLua-热更入门与实践指南/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };