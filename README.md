# Word AI 助手

一个强大的 Word 插件，集成了多种 AI 功能，帮助您更高效地处理文档。

## 功能特点

1. **AI 对话**
   - 与 AI 助手进行实时对话
   - 智能文本生成和修改
   - 上下文理解和连续对话

2. **智能翻译**
   - 支持多种语言之间的互译
   - 保持原文格式
   - 专业术语准确翻译

3. **论文查找**
   - 学术论文智能搜索
   - 自动生成引用格式
   - 支持多种学术数据库

4. **排版美化**
   - 预设多种专业排版模板
   - 一键应用格式
   - 支持自定义样式

## 安装要求

- Microsoft Word 2016 或更高版本
- Windows 10 或更高版本
- Node.js 14.0 或更高版本
- npm 6.0 或更高版本

## 快速开始

1. 克隆项目：
   ```bash
   git clone https://github.com/your-username/word-ai-assistant.git
   cd word-ai-assistant
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 配置环境变量：
   - 创建 `.env` 文件
   - 添加必要的 API 密钥：
     ```
     OPENAI_API_KEY=your_api_key
     ```

4. 启动开发服务器：
   ```bash
   npm start
   ```

5. 在 Word 中加载插件：
   - 打开 Word
   - 转到"插入"选项卡
   - 点击"我的加载项"
   - 选择"管理我的加载项"
   - 浏览到项目目录中的 manifest.xml 文件

## 使用说明

1. **AI 对话**
   - 点击工具栏中的"AI 助手"图标
   - 在对话框中输入您的问题
   - AI 将根据上下文提供相关回答

2. **翻译功能**
   - 选择需要翻译的文本
   - 在插件面板中选择目标语言
   - 点击"翻译"按钮

3. **论文查找**
   - 在搜索框中输入关键词
   - 选择感兴趣的论文
   - 点击"插入引用"将引用添加到文档中

4. **排版美化**
   - 选择要格式化的文本
   - 在模板列表中选择合适的样式
   - 点击"应用样式"即可

## 注意事项

- 首次使用需要配置 API 密钥
- 建议在使用排版功能前备份文档
- 部分功能需要联网使用

## 技术支持

如果您在使用过程中遇到任何问题，请：
1. 查看我们的[常见问题解答](https://example.com/faq)
2. 在 GitHub 上提交 Issue
3. 发送邮件至 support@example.com

## 许可证

MIT License
