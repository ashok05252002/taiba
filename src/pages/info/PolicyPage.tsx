import React from 'react';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';

interface PolicyPageProps {
    type: 'privacy' | 'terms' | 'refund';
}

const policyContent = {
    privacy: {
        title: 'Privacy Policy',
        content: [
            { heading: '1. Information We Collect', text: faker.lorem.paragraphs(3) },
            { heading: '2. How We Use Your Information', text: faker.lorem.paragraphs(2) },
            { heading: '3. Data Security', text: faker.lorem.paragraphs(2) },
        ]
    },
    terms: {
        title: 'Terms of Service',
        content: [
            { heading: '1. Acceptance of Terms', text: faker.lorem.paragraphs(2) },
            { heading: '2. User Accounts', text: faker.lorem.paragraphs(3) },
            { heading: '3. Prohibited Conduct', text: faker.lorem.paragraphs(2) },
        ]
    },
    refund: {
        title: 'Refund & Return Policy',
        content: [
            { heading: '1. General Policy', text: "Due to the nature of pharmaceutical products, we do not accept returns on most items to ensure safety and integrity. However, exceptions are made for damaged or incorrect items." },
            { heading: '2. Damaged or Incorrect Items', text: "If you receive a damaged or incorrect item, please contact our customer support within 24 hours of delivery with photographic evidence. We will arrange for a replacement or a full refund." },
            { heading: '3. Refund Process', text: "Approved refunds will be processed within 5-7 business days to the original method of payment." },
        ]
    }
};

const PolicyPage: React.FC<PolicyPageProps> = ({ type }) => {
    const { title, content } = policyContent[type];

    return (
        <div className="bg-white py-16">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-taiba-purple mb-4">{title}</h1>
                    <p className="text-lg text-taiba-grey">Last updated: {faker.date.past().toLocaleDateString()}</p>
                </motion.div>

                <div className="prose lg:prose-lg max-w-none text-taiba-grey">
                    {content.map((section, index) => (
                        <motion.div 
                            key={index}
                            className="mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900">{section.heading}</h2>
                            <p>{section.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PolicyPage;
