require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 83;

// 验证必需的环境变量
const requiredEnvVars = ['API_BASE_URL', 'API_BEARER_TOKEN'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ 错误：缺少必需的环境变量:');
  missingEnvVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('请检查.env文件配置');
  process.exit(1);
}

// 中间件：解析JSON和提供静态文件
app.use(express.json());
app.use(express.static('public'));

// API配置路由 - 为前端提供配置信息
app.get('/api/config', (req, res) => {
  res.json({
    apiBaseUrl: process.env.API_BASE_URL,
    apiEndpoint: process.env.API_ENDPOINT || '/v1/chat-messages',
    apiToken: process.env.API_BEARER_TOKEN,
    responseMode: process.env.RESPONSE_MODE || 'streaming',
    defaultUser: process.env.DEFAULT_USER || 'web-user'
  });
});

// 根路径重定向到index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🤖 Chatbot server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API Base URL: ${process.env.API_BASE_URL}`);
  console.log(`📡 API Endpoint: ${process.env.API_ENDPOINT || '/v1/chat-messages'}`);
  console.log(`👤 Default User: ${process.env.DEFAULT_USER || 'web-user'}`);
  console.log(`🔄 Response Mode: ${process.env.RESPONSE_MODE || 'streaming'}`);
  console.log('✅ Server started successfully');
});