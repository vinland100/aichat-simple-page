# 设计文档

## 概述

创建一个单页面HTML应用，使用原生JavaScript实现聊天功能，通过fetch API调用后端接口获取流式响应。

## 架构

### 技术栈
- 前端：纯HTML + CSS + JavaScript（无框架）
- 服务器：Node.js + Express（最小配置）
- 部署：监听83端口

### 文件结构
```
chatbot/
├── server.js          # Express服务器
├── public/
    └── index.html      # 单页面应用（包含CSS和JS）
```

## 组件和接口

### 1. HTML结构
- 聊天容器：显示对话消息
- 输入框：用户输入问题
- 发送按钮：提交消息

### 2. JavaScript功能
- `sendMessage()`: 发送用户消息并调用API
- `displayMessage()`: 显示消息到聊天容器
- `handleStream()`: 处理流式响应数据

### 3. API调用
- 端点：`http://182.96.17.140:81/v1/chat-messages`
- 方法：POST
- 头部：
  - `Authorization: Bearer app-weMHk3oB9TITzqhdFsM1KktJ`
  - `Content-Type: application/json`
- 请求体：
```json
{
  "inputs": {},
  "query": "用户输入的问题",
  "response_mode": "streaming",
  "conversation_id": "",
  "user": "web-user"
}
```

## 数据模型

### 消息对象
```javascript
{
  type: 'user' | 'bot',
  content: string,
  timestamp: Date
}
```

### 流式响应处理
- 解析 `data:` 开头的SSE格式数据
- 提取 `event: "message"` 类型的数据
- 从 `answer` 字段获取文本内容

## 错误处理

### 基本错误处理
- 网络错误：显示"连接失败"消息
- API错误：显示"服务暂不可用"消息
- 空输入：阻止发送

## 测试策略

### 手动测试
1. 打开页面测试基本UI
2. 发送消息测试API调用
3. 验证流式响应显示
4. 测试错误场景处理

## 实现要点

### 最小化代码
- 所有代码写在单个HTML文件中
- 使用内联CSS和JavaScript
- 避免复杂的状态管理
- 使用最基本的DOM操作

### 流式响应处理
- 使用fetch的ReadableStream
- 逐行解析SSE数据
- 实时更新DOM显示内容