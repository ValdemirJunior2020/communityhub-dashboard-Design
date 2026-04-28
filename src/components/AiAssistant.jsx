import React from 'react';
import { IconRobotHead, IconArrowRight, IconClipboard } from './Icons';

const AiActionItem = ({ text }) => (
    <div className="flex items-start p-4 rounded-xl bg-neutral-100 border border-neutral-200 cursor-pointer hover:bg-neutral-200">
        <div className="w-10 h-10 rounded-lg bg-neutral-200 border border-neutral-300 flex items-center justify-center mr-4 text-neutral-600">
            <IconClipboard />
        </div>
        <span className="text-md text-neutral-700 flex-1">{text}</span>
        <IconArrowRight />
    </div>
);

const AiAssistant = () => {
    const aiActions = [
        "Summarize the tenant issue issues and generate new property management...",
        "Suggest the next actions (e.g., Assign Apex Plumbing)",
        "Detects overdue payments to slnow and promote exceduler...",
        "Generate owner reports for property management..."
    ];

    return (
        <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm flex flex-col space-y-6">
            <div className="flex items-center space-x-3 text-xl font-bold text-neutral-900">
                <IconRobotHead />
                <h3>Property AI Assistant</h3>
            </div>
            
            <div className="space-y-3">
                {aiActions.map((action, index) => (
                    <AiActionItem key={index} text={action} />
                ))}
            </div>

            {/* AI Input Field */}
            <div className="relative mt-2">
                <input 
                    type="text" 
                    placeholder="Type or ask AI assistant..." 
                    className="w-full pl-6 pr-12 py-3 rounded-full bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-primary text-neutral-800"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold hover:bg-sky-700">
                    ↵
                </button>
            </div>
        </div>
    );
};

export default AiAssistant;