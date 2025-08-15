# 简单聊天机器人
123
一个极简的聊天机器人网页应用，支持流式响应。

## 功能特点

- 简洁的聊天界面
- 实时流式响应
- 响应式设计
- 环境变量配置
- 最小化代码实现

## 环境要求

- Node.js (版本 14.0 或更高)
- npm (Node.js 包管理器)

## 快速开始

### 手动设置
如果需要手动配置，请按照以下步骤：

## 安装步骤

### 1. 克隆项目
```bash
git clone <your-repository-url>
cd aichat-simple-page
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置环境变量

复制环境变量配置模板：
```bash
cp .env.example .env
```

编辑 `.env` 文件，设置你的API配置：
```bash
# 服务器配置
PORT=83

# API 配置  
API_BASE_URL=http://your-api-server:port  # 替换为你的API服务器地址
API_ENDPOINT=/v1/chat-messages             # API端点路径
API_BEARER_TOKEN=your-bearer-token-here    # 替换为你的API密钥

# 聊天配置
RESPONSE_MODE=streaming                     # 响应模式：streaming 或 blocking
DEFAULT_USER=web-user                       # 默认用户标识
```

⚠️ **重要提醒**：
- 必须正确配置 `API_BASE_URL` 和 `API_BEARER_TOKEN`
- 不要将 `.env` 文件提交到版本控制系统
- `.env` 文件包含敏感信息，请妥善保管


### 5. 启动服务器
```bash
npm start
```

### 6. 访问应用
打开浏览器访问：`http://localhost:83`

## 常见问题解决

### 问题1：依赖安装失败
```bash
# 清除npm缓存
npm cache clean --force

# 删除node_modules重新安装
rm -rf node_modules package-lock.json
npm install
```

### 问题2：端口被占用
如果默认端口83被占用，可以修改 `.env` 文件中的 `PORT` 值：
```bash
PORT=3000  # 修改为其他可用端口
```

### 问题3：API连接失败
- 检查 `.env` 文件中的 `API_BASE_URL` 是否正确
- 确认 `API_BEARER_TOKEN` 是否有效
- 检查网络连接和防火墙设置

### 问题4：配置加载失败
如果前端显示"配置加载失败"：
- 确保服务器正常启动
- 检查 `.env` 文件是否存在且格式正确
- 查看浏览器控制台的错误信息

## 生产环境部署

### 使用PM2部署
```bash
# 安装PM2
npm install -g pm2

# 启动应用
pm2 start server.js --name chatbot

# 查看状态
pm2 status

# 查看日志
pm2 logs chatbot
```

### 使用Docker部署
创建 `Dockerfile`：
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 83
CMD ["npm", "start"]
```

构建和运行：
```bash
docker build -t simple-chatbot .
docker run -d -p 83:83 --env-file .env simple-chatbot
```

## 项目结构

```
aichat-simple-page/
├── server.js              # Express服务器主文件
├── package.json           # 项目依赖和脚本配置
├── package-lock.json      # 依赖版本锁定文件
├── .env                   # 环境变量配置（不提交到Git）
├── .env.example           # 环境变量配置模板
├── .gitignore             # Git忽略文件配置
├── README.md              # 项目说明文档
└── public/
    └── index.html         # 前端单页面应用
```

## 技术栈和架构

- **前端**：HTML + CSS + JavaScript（原生，无框架依赖）
- **后端**：Node.js + Express.js
- **配置管理**：dotenv
- **API通信**：流式响应处理
- **部署**：支持PM2、Docker等多种方式

## 核心特性

### 环境变量管理
- 使用 `.env` 文件管理配置
- 前端通过API获取配置，无硬编码
- 支持多环境配置

### 流式响应
- 支持Server-Sent Events (SSE)
- 实时显示AI回复内容
- 优化用户体验

### 安全特性
- API密钥通过环境变量管理
- 前端配置动态加载
- 敏感信息不暴露在客户端代码中

## 使用说明

1. **配置检查**：确保已正确配置 `.env` 文件中的API信息
2. **启动应用**：运行 `npm start` 启动服务器
3. **访问界面**：在浏览器中打开 `http://localhost:83`
4. **开始聊天**：在输入框中输入问题，点击发送或按回车键
5. **查看回复**：机器人会实时流式返回回复内容

## 开发指南

### 本地开发
```bash
# 开发模式启动（文件变更自动重启）
npm install -g nodemon
nodemon server.js
```

### 代码结构说明
- `server.js`：服务器主文件，处理API配置和静态文件服务
- `public/index.html`：前端页面，包含完整的聊天界面和逻辑
- `.env`：环境变量配置，包含API密钥等敏感信息
- `.env.example`：环境变量模板，用于新环境配置参考

### API接口说明
- `GET /api/config`：获取前端配置信息
- `GET /`：服务静态页面

## 部署注意事项

1. **环境变量**：确保生产环境中设置了正确的环境变量
2. **安全**：不要将 `.env` 文件提交到版本控制系统
3. **性能**：在生产环境中使用 `NODE_ENV=production` 环境变量
4. **端口**：确保配置的端口在服务器上可用
5. **网络**：确保API服务器地址可从部署环境访问

## 许可证

本项目采用 MIT 许可证。
