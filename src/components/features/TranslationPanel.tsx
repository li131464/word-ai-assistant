import React, { useState } from 'react';
import { Select, Button, message } from 'antd';
import { TranslationOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: '英语' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日语' },
  { code: 'ko', name: '韩语' },
  { code: 'fr', name: '法语' },
  { code: 'de', name: '德语' },
  { code: 'es', name: '西班牙语' },
  { code: 'ru', name: '俄语' },
];

const TranslationPanel: React.FC = () => {
  const [targetLang, setTargetLang] = useState<string>('en');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    try {
      setLoading(true);
      await Word.run(async (context) => {
        const selection = context.document.getSelection();
        selection.load('text');
        await context.sync();

        const selectedText = selection.text;
        if (!selectedText.trim()) {
          message.warning('请先选择要翻译的文本');
          return;
        }

        // TODO: 调用翻译 API
        const translatedText = `这是翻译后的文本示例 (${targetLang})`;

        // 在选中文本后插入翻译结果
        selection.insertText(`\n[译文]：${translatedText}\n`, 'After');
        await context.sync();
        
        message.success('翻译完成');
      });
    } catch (error) {
      message.error('翻译过程中出错');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="translation-panel">
      <div className="controls">
        <Select
          value={targetLang}
          onChange={(value: string) => setTargetLang(value)}
          style={{ width: 200 }}
        >
          {languages.map((lang) => (
            <Option key={lang.code} value={lang.code}>
              {lang.name}
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          icon={<TranslationOutlined />}
          loading={loading}
          onClick={handleTranslate}
        >
          翻译选中文本
        </Button>
      </div>
      <div className="instructions">
        <p>使用说明：</p>
        <ol>
          <li>在文档中选择要翻译的文本</li>
          <li>选择目标语言</li>
          <li>点击"翻译选中文本"按钮</li>
        </ol>
      </div>
    </div>
  );
};

export default TranslationPanel; 