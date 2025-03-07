import React, { useState } from 'react';
import { Input, Button, Card, List, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

interface Paper {
  title: string;
  authors: string[];
  abstract: string;
  year: number;
  url: string;
}

const PaperSearchPanel: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      message.warning('请输入搜索关键词');
      return;
    }

    setLoading(true);
    try {
      // TODO: 调用论文搜索 API
      const mockPapers: Paper[] = [
        {
          title: '示例论文标题',
          authors: ['作者1', '作者2'],
          abstract: '这是一个示例论文摘要...',
          year: 2024,
          url: 'https://example.com/paper'
        }
      ];

      setPapers(mockPapers);
    } catch (error) {
      message.error('搜索论文时出错');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const insertPaperReference = async (paper: Paper) => {
    try {
      await Word.run(async (context) => {
        const selection = context.document.getSelection();
        
        // 生成引用文本
        const reference = `${paper.authors.join(', ')} (${paper.year}). ${paper.title}.`;
        
        // 插入引用
        selection.insertText(reference, 'End');
        await context.sync();
        
        message.success('引用已插入');
      });
    } catch (error) {
      message.error('插入引用时出错');
      console.error(error);
    }
  };

  return (
    <div className="paper-search-panel">
      <Search
        placeholder="输入关键词搜索论文..."
        enterButton={<SearchOutlined />}
        size="large"
        loading={loading}
        onSearch={handleSearch}
      />
      <List
        className="paper-list"
        dataSource={papers}
        renderItem={(paper) => (
          <List.Item
            actions={[
              <Button
                key="cite"
                type="link"
                onClick={() => insertPaperReference(paper)}
              >
                插入引用
              </Button>,
              <Button
                key="view"
                type="link"
                href={paper.url}
                target="_blank"
              >
                查看原文
              </Button>
            ]}
          >
            <Card title={paper.title} size="small">
              <p><strong>作者：</strong>{paper.authors.join(', ')}</p>
              <p><strong>年份：</strong>{paper.year}</p>
              <p><strong>摘要：</strong>{paper.abstract}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PaperSearchPanel; 