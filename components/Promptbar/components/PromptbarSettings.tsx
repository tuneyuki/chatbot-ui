import { IconTemplate } from '@tabler/icons-react';
import { useContext, useState } from 'react';

import HomeContext from '@/pages/api/home/home.context';
import { OpenAIModels } from '@/types/openai';

import { SidebarButton } from '../../Sidebar/SidebarButton';
import { savePrompts } from '@/utils/app/prompts';
import { Prompt } from '@/types/prompt';

import { v4 as uuidv4 } from 'uuid';

const promptTemplates = [
  {"name": "テンプレ1", "content": "テンプレート1の実体ですよ。{{item}}をどうぞ", "description": "テンプレ1の説明"},
  {"name": "テンプレ2", "content": "テンプレート2の実体ですよ。{{item}}をどうぞ", "description": "テンプレ2の説明"},
  {"name": "テンプレ3", "content": "テンプレート3の実体ですよ。{{item}}をどうぞ", "description": "テンプレ3の説明"},
]

export const PromptbarSettings = () => {

  const {
    state: { prompts, defaultModelId, showPromptbar },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const addPromptTemplate = () => {
    const updatedPrompts = [...prompts]

    if(defaultModelId){
      promptTemplates.forEach(template => {
        const newPrompt: Prompt = {
          id: uuidv4(),
          name: template.name,
          description: template.description,
          content: template.content,
          model: OpenAIModels[defaultModelId],
          folderId: null,
        };
        updatedPrompts.push(newPrompt)
      })
    }

    homeDispatch({ field: 'prompts', value: updatedPrompts });
    savePrompts(updatedPrompts);
  }

  const handleButtonClick = () => {
    const userConfirmed = window.confirm("便利なPromptテンプレートを3つ用意しています。導入しますか？");
    if (userConfirmed) {
      addPromptTemplate();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">

      <SidebarButton
        text={"Promptテンプレート導入"}
        icon={<IconTemplate size={18} />}
        onClick={handleButtonClick}
      />
    </div>
  );
};


