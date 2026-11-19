# Micro Voyage

游戏入口：`/games/microvoyage/`。

从用户提供的 `imports/MicroVoyage_public_source.zip` 中导入 `site/` 静态网页，保留原有游戏脚本、模型和 Three.js 模块。博客适配仅增加游戏室入口、返回链接和来源链接，并移除压缩包中不存在的备用模型路径。

来源：https://dry-scene-27f6.site2019.workers.dev/

压缩包说明：资源来自公开网页 HAR 提取，仅供个人查看、学习；原游戏代码和模型的再分发或商用授权未在包内提供。Three.js 文件保留原有 MIT 许可证标头。

运行需要支持 WebGL 2、浮点渲染目标和 `DecompressionStream('gzip')` 的浏览器。使用 Hexo HTTP 预览或 HTTPS 网站打开，不要通过 `file://` 直接打开。游戏为静态前端，不需要服务器端程序。

桌面操作：点击画面后用鼠标转向，WASD 移动，Shift 加速，Space/C 上升和下降，滚轮或 Q/E 缩小和放大，R 重置，H 切换帮助。触屏操作使用左侧摇杆、右侧视角与缩放/升降按钮。
