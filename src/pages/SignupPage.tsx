import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MedicalBackground from '../components/background/MedicalBackground';
import SignupForm from '../components/auth/SignupForm';

const SignupPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <MedicalBackground theme="default" />
            <motion.div 
                className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl relative z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <SignupForm />
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-taiba-blue hover:text-taiba-purple">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default SignupPage;
