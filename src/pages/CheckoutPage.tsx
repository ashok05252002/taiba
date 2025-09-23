import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import ShippingStep from '../components/checkout/ShippingStep';
import DeliveryStep from '../components/checkout/DeliveryStep';
import PaymentStep from '../components/checkout/PaymentStep';
import ReviewStep from '../components/checkout/ReviewStep';
import StoreSelectionStep from '../components/checkout/StoreSelectionStep';
import { useOrder } from '../contexts/OrderContext';
import GiftCardRedemption from '../components/checkout/GiftCardRedemption';

type CheckoutStep = 'shipping' | 'store' | 'delivery' | 'payment' | 'review';

const CheckoutPage: React.FC = () => {
    const { deliveryMode } = useOrder();
    const [giftCardDiscount, setGiftCardDiscount] = useState(0);
    
    const deliverySteps: CheckoutStep[] = ['shipping', 'delivery', 'payment', 'review'];
    const takeawaySteps: CheckoutStep[] = ['store', 'payment', 'review'];
    const steps = deliveryMode === 'delivery' ? deliverySteps : takeawaySteps;

    const [currentStep, setCurrentStep] = useState<CheckoutStep>(steps[0]);

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
            case 'store':
                return <StoreSelectionStep onNext={handleNext} />;
            case 'delivery':
                return <DeliveryStep onNext={handleNext} onBack={handleBack} />;
            case 'payment':
                return <PaymentStep onNext={handleNext} onBack={handleBack} />;
            case 'review':
                return <ReviewStep onBack={handleBack} giftCardDiscount={giftCardDiscount} />;
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
                <div className="flex justify-center items-center mb-8 max-w-full overflow-x-auto">
                    {steps.map((step, index) => (
                        <React.Fragment key={step}>
                            <div className="flex flex-col items-center text-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${steps.indexOf(currentStep) >= index ? 'bg-taiba-purple border-taiba-purple text-white' : 'bg-white border-gray-300 text-gray-500'}`}>
                                    {index + 1}
                                </div>
                                <p className={`mt-2 text-sm font-medium capitalize w-20 ${steps.indexOf(currentStep) >= index ? 'text-taiba-purple' : 'text-gray-500'}`}>{step}</p>
                            </div>
                            {index < steps.length - 1 && <div className={`flex-grow h-0.5 mx-2 w-8 md:w-16 ${steps.indexOf(currentStep) > index ? 'bg-taiba-purple' : 'bg-gray-300'}`}></div>}
                        </React.Fragment>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
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
                    <div className="md:col-span-1">
                        <GiftCardRedemption onApplyDiscount={setGiftCardDiscount} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
