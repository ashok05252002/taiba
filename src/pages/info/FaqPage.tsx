import React from 'react';
import { motion } from 'framer-motion';
import Accordion from '../../components/common/Accordion';

const faqs = {
    "Orders & Delivery": [
        { q: "How long does delivery take?", a: "We typically deliver within 2-4 hours in Muscat and within 24 hours to other major cities in Oman." },
        { q: "How can I track my order?", a: "Once your order is dispatched, you can track it in real-time from the 'My Orders' section in your profile." },
    ],
    "Prescriptions": [
        { q: "How do I upload a prescription?", a: "You can upload a prescription on the product page for restricted items, or directly through the 'Upload Prescription' page. We accept images (JPG, PNG) and PDF files." },
        { q: "How long does prescription verification take?", a: "Our pharmacists typically verify prescriptions within 30 minutes of upload." },
    ],
    "Payments": [
        { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, Cash on Delivery (COD), and payments through our integrated digital wallet." },
        { q: "Is my payment information secure?", a: "Yes, all transactions are processed through a secure, encrypted payment gateway to ensure your data is safe." },
    ]
};

const FaqPage: React.FC = () => {
    return (
        <div className="bg-white py-16">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-taiba-purple mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-taiba-grey">Find answers to common questions about our services.</p>
                </motion.div>

                <div className="space-y-12">
                    {Object.entries(faqs).map(([category, questions], index) => (
                        <motion.div 
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
                            <div className="space-y-4">
                                {questions.map((faq, qIndex) => (
                                    <Accordion key={qIndex} title={faq.q}>
                                        {faq.a}
                                    </Accordion>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
