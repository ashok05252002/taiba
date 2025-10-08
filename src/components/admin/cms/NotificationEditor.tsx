import React from 'react';
import { NotificationTemplate } from '../../../pages/admin/CmsManagementPage';

interface NotificationEditorProps {
    templates: NotificationTemplate[];
    onUpdate: (template: NotificationTemplate) => void;
}

const NotificationEditor: React.FC<NotificationEditorProps> = ({ templates, onUpdate }) => {
    
    const handleToggle = (template: NotificationTemplate) => {
        onUpdate({ ...template, enabled: !template.enabled });
    };

    const handleContentChange = (template: NotificationTemplate, content: string) => {
        onUpdate({ ...template, content });
    };

    return (
        <div className="space-y-6">
            {templates.map(template => (
                <div key={template.id} className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{template.name}</h4>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Enabled</span>
                            <button
                                onClick={() => handleToggle(template)}
                                role="switch"
                                aria-checked={template.enabled}
                                className={`${template.enabled ? 'bg-taiba-blue' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                            >
                                <span className={`${template.enabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`} />
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={template.content}
                        onChange={(e) => handleContentChange(template, e.target.value)}
                        rows={3}
                        className="w-full p-2 border rounded-md text-sm"
                    />
                    <p className="text-xs text-gray-400 mt-1">Variables: {template.variables.join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default NotificationEditor;
