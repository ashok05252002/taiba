import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const SupportPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: 'Hello! I am the Taiba AI Assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;
        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Simulate bot response
        setTimeout(() => {
            const botResponse: Message = { sender: 'bot', text: 'Thank you for your message. A support agent will be with you shortly. For immediate assistance, please use our WhatsApp chat.' };
            setMessages(prev => [...prev, botResponse]);
        }, 1500);
    };

    return (
        <div className="bg-white py-16">
            <div className="max-w-3xl mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-taiba-purple mb-4">Support Chat</h1>
                    <p className="text-lg text-taiba-grey">Our team is here to assist you.</p>
                </motion.div>

                <div className="bg-gray-50 rounded-2xl shadow-lg h-[60vh] flex flex-col">
                    {/* Chat Messages */}
                    <div className="flex-grow p-6 space-y-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <motion.div 
                                key={index} 
                                className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {msg.sender === 'bot' && <div className="w-10 h-10 bg-taiba-blue text-white rounded-full flex items-center justify-center shrink-0"><Bot /></div>}
                                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-taiba-blue text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                                    {msg.text}
                                </div>
                                {msg.sender === 'user' && <div className="w-10 h-10 bg-taiba-purple text-white rounded-full flex items-center justify-center shrink-0"><User /></div>}
                            </motion.div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t bg-white rounded-b-2xl">
                        <div className="relative">
                            <input 
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message..."
                                className="w-full p-3 pr-12 border rounded-full focus:ring-2 focus:ring-taiba-blue"
                            />
                            <button onClick={handleSend} className="absolute right-2 top-1/2 -translate-y-1/2 bg-taiba-blue text-white w-9 h-9 rounded-full flex items-center justify-center">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
