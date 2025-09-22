import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import ShippingStep from '../components/checkout/ShippingStep';
import DeliveryStep from '../components/checkout/DeliveryStep';
import PaymentStep from '../components/checkout/PaymentStep';
import ReviewStep from '../components/checkout/ReviewStep';

type CheckoutStep = 'shipping' | 'delivery' | 'payment' | 'review';

const steps: CheckoutStep[] = ['shipping', 'delivery', 'payment', 'review'];

const CheckoutPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');

    const handleNext = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
        }
    };

    const handleBack = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 'shipping':
                return <ShippingStep onNext={handleNext} />;
            case 'delivery':
                return <DeliveryStep onNext={handleNext} onBack={handleBack} />;
            case 'payment':
                return <PaymentStep onNext={handleNext} onBack={handleBack} />;
            case 'review':
                return <ReviewStep onBack={handleBack} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 py-16 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">Checkout</h1>
                    <p className="text-taiba-grey text-center mb-8 flex items-center justify-center space-x-2">
                        <Lock size={16} />
                        <span>Secure Payment Gateway</span>
                    </p>
                </motion.div>

                {/* Step Indicator */}
                <div className="flex justify-between items-center mb-8">
                    {steps.map((step, index) => (
                        <React.Fragment key={step}>
                            <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${steps.indexOf(currentStep) >= index ? 'bg-taiba-purple border-taiba-purple text-white' : 'bg-white border-gray-300 text-gray-500'}`}>
                                    {index + 1}
                                </div>
                                <p className={`mt-2 text-sm font-medium capitalize ${steps.indexOf(currentStep) >= index ? 'text-taiba-purple' : 'text-gray-500'}`}>{step}</p>
                            </div>
                            {index < steps.length - 1 && <div className={`flex-grow h-0.5 mx-2 ${steps.indexOf(currentStep) > index ? 'bg-taiba-purple' : 'bg-gray-300'}`}></div>}
                        </React.Fragment>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderStep()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CheckoutPage;
