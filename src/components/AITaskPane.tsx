import React, { useState } from 'react';
import { Tabs } from 'antd';
import {
  MessageOutlined,
  TranslationOutlined,
  FileSearchOutlined,
  FormatPainterOutlined,
} from '@ant-design/icons';
import ChatPanel from './features/ChatPanel';
import TranslationPanel from './features/TranslationPanel';
import PaperSearchPanel from './features/PaperSearchPanel';
import FormattingPanel from './features/FormattingPanel';

const { TabPane } = Tabs;

const AITaskPane: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="ai-taskpane">
      <Tabs
        defaultActiveKey="chat"
        onChange={(key) => setActiveTab(key)}
        style={{ width: '100%' }}
      >
        <TabPane
          tab={
            <span>
              <MessageOutlined />
              对话
            </span>
          }
          key="chat"
        >
          <ChatPanel />
        </TabPane>
        <TabPane
          tab={
            <span>
              <TranslationOutlined />
              翻译
            </span>
          }
          key="translation"
        >
          <TranslationPanel />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FileSearchOutlined />
              论文查找
            </span>
          }
          key="paper-search"
        >
          <PaperSearchPanel />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FormatPainterOutlined />
              排版美化
            </span>
          }
          key="formatting"
        >
          <FormattingPanel />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AITaskPane; 