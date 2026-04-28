// src/components/AiAssistant.jsx
import React from 'react';
import { IconRobotHead, IconArrowRight, IconClipboard } from './Icons';

const AiActionItem = ({ text }) => (
  <button
    type="button"
    className="flex min-h-[92px] w-full items-center gap-6 rounded-3xl bg-slate-100 p-6 text-left transition hover:bg-slate-200"
  >
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-600 ring-2 ring-slate-200">
      <IconClipboard />
    </div>

    <span className="flex-1 text-[26px] font-black leading-snug text-slate-800">
      {text}
    </span>

    <IconArrowRight />
  </button>
);

const AiAssistant = () => {
  const aiActions = [
    'Summarize tenant issues and generate property management notes.',
    'Suggest the next actions, like assigning Apex Plumbing.',
    'Detect overdue payments and promote scheduler follow-up.',
    'Generate owner reports for property management.',
  ];

  return (
    <div className="dashboard-card p-8">
      <div className="mb-7 flex items-center gap-5 text-slate-900">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 ring-2 ring-blue-200">
          <IconRobotHead />
        </div>

        <h3 className="text-[34px] font-black leading-tight text-slate-950">
          Property AI Assistant
        </h3>
      </div>

      <div className="space-y-5">
        {aiActions.map((action) => (
          <AiActionItem key={action} text={action} />
        ))}
      </div>

      <div className="relative mt-7">
        <input
          type="text"
          placeholder="Type or ask AI assistant..."
          className="h-20 w-full rounded-full border-2 border-slate-200 bg-slate-50 pl-8 pr-20 text-[26px] font-bold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        <button className="absolute right-3 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-3xl font-black text-white hover:bg-blue-700">
          ↵
        </button>
      </div>
    </div>
  );
};

export default AiAssistant;