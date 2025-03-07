import React, { useState } from 'react';
import { Button, Select, Space, message, Divider } from 'antd';
import {
  AlignCenterOutlined,
  FontSizeOutlined,
  BgColorsOutlined,
  FormatPainterOutlined,
} from '@ant-design/icons';

const { Option } = Select;

interface StyleTemplate {
  id: string;
  name: string;
  description: string;
}

const styleTemplates: StyleTemplate[] = [
  {
    id: 'academic',
    name: '学术论文',
    description: 'Times New Roman字体，双倍行距，标准学术格式'
  },
  {
    id: 'report',
    name: '工作报告',
    description: '清晰的层级结构，适合商务报告'
  },
  {
    id: 'creative',
    name: '创意写作',
    description: '现代简约风格，适合创意内容'
  }
];

const FormattingPanel: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('academic');

  const applyTemplate = async () => {
    setLoading(true);
    try {
      await Word.run(async (context) => {
        const document = context.document;
        const selection = document.getSelection();
        
        // 加载必要的属性
        selection.load('text');
        await context.sync();
        
        // 根据模板应用样式
        switch (selectedTemplate) {
          case 'academic':
            selection.font.name = 'Times New Roman';
            selection.font.size = 12;
            selection.paragraphFormat.lineSpacing = 2;
            selection.paragraphFormat.firstLineIndent = 28;
            break;
            
          case 'report':
            selection.font.name = 'Arial';
            selection.font.size = 11;
            selection.paragraphFormat.lineSpacing = 1.15;
            selection.paragraphFormat.spaceBefore = 6;
            selection.paragraphFormat.spaceAfter = 6;
            break;
            
          case 'creative':
            selection.font.name = 'Calibri';
            selection.font.size = 11.5;
            selection.paragraphFormat.lineSpacing = 1.5;
            selection.paragraphFormat.spaceBefore = 8;
            selection.paragraphFormat.spaceAfter = 8;
            break;
        }
        
        await context.sync();
        message.success('样式已应用');
      });
    } catch (error) {
      message.error('应用样式时出错');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cleanFormatting = async () => {
    setLoading(true);
    try {
      await Word.run(async (context) => {
        const selection = context.document.getSelection();
        selection.clear();
        await context.sync();
        message.success('格式已清除');
      });
    } catch (error) {
      message.error('清除格式时出错');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formatting-panel">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <h4>选择样式模板</h4>
          <Select
            value={selectedTemplate}
            onChange={setSelectedTemplate}
            style={{ width: '100%' }}
          >
            {styleTemplates.map(template => (
              <Option key={template.id} value={template.id}>
                <div>
                  <strong>{template.name}</strong>
                  <p className="template-description">{template.description}</p>
                </div>
              </Option>
            ))}
          </Select>
        </div>
        
        <Divider />
        
        <Space>
          <Button
            type="primary"
            icon={<FormatPainterOutlined />}
            loading={loading}
            onClick={applyTemplate}
          >
            应用样式
          </Button>
          <Button
            danger
            icon={<BgColorsOutlined />}
            loading={loading}
            onClick={cleanFormatting}
          >
            清除格式
          </Button>
        </Space>
        
        <div className="formatting-tips">
          <h4>使用提示：</h4>
          <ol>
            <li>选择要格式化的文本</li>
            <li>从上方选择合适的样式模板</li>
            <li>点击"应用样式"按钮</li>
            <li>如需恢复原始格式，使用"清除格式"按钮</li>
          </ol>
        </div>
      </Space>
    </div>
  );
};

export default FormattingPanel; 