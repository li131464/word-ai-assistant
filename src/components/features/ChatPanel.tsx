import React, { useState } from 'react';
import { Input, Button, List, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      role: 'user',
      content: inputText.trim()
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    setLoading(true);

    try {
      // 这里将来需要调用 AI API
      await Word.run(async (context) => {
        const selection = context.document.getSelection();
        selection.load('text');
        await context.sync();
        
        // 获取选中的文本
        const selectedText = selection.text;
        
        // TODO: 调用 AI API 处理文本
        const response = "这是 AI 的回复示例";
        
        const aiMessage: ChatMessage = {
          role: 'assistant',
          content: response
        };
        
        setMessages(prev => [...prev, aiMessage]);
        
        // 如果用户想要，可以将 AI 回复插入到文档中
        if (selectedText) {
          selection.insertText(response, 'Replace');
          await context.sync();
        }
      });
    } catch (error) {
      message.error('处理请求时出错');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-panel">
      <List
        className="chat-list"
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(msg) => (
          <List.Item className={`message ${msg.role}`}>
            <div className="message-content">{msg.content}</div>
          </List.Item>
        )}
      />
      <div className="input-area">
        <TextArea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="输入您的问题..."
          autoSize={{ minRows: 2, maxRows: 6 }}
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          loading={loading}
          onClick={handleSend}
        >
          发送
        </Button>
      </div>
    </div>
  );
};

export default ChatPanel; 