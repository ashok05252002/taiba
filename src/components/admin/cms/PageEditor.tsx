import React, { useState, useEffect } from 'react';

const pages = [
    { id: 'about', title: 'About Us' },
    { id: 'privacy', title: 'Privacy Policy' },
    { id: 'terms', title: 'Terms of Service' },
    { id: 'faq', title: 'FAQs' },
];

interface PageEditorProps {
    pagesContent: Record<string, string>;
    onSave: (pageId: string, content: string) => void;
}

const PageEditor: React.FC<PageEditorProps> = ({ pagesContent, onSave }) => {
    const [selectedPage, setSelectedPage] = useState(pages[0]);
    const [content, setContent] = useState('');

    useEffect(() => {
        setContent(pagesContent[selectedPage.id] || '');
    }, [selectedPage, pagesContent]);

    const handleSaveClick = () => {
        onSave(selectedPage.id, content);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
                <h3 className="font-semibold mb-4">Select a Page</h3>
                <ul className="space-y-2">
                    {pages.map(page => (
                        <li key={page.id}>
                            <button
                                onClick={() => setSelectedPage(page)}
                                className={`w-full text-left p-2 rounded-md text-sm ${
                                    selectedPage.id === page.id ? 'bg-blue-100 text-taiba-blue font-semibold' : 'hover:bg-gray-100'
                                }`}
                            >
                                {page.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="md:col-span-3">
                <h3 className="font-semibold mb-4">Editing: {selectedPage.title}</h3>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={15}
                    className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-taiba-blue"
                    placeholder="Enter page content here..."
                />
                <div className="text-right mt-4">
                    <button onClick={handleSaveClick} className="px-4 py-2 bg-taiba-blue text-white rounded-md text-sm font-semibold">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default PageEditor;
