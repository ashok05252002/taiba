import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react';

interface SignupFormProps {
    isModal?: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ isModal }) => {
    return (
        <div>
            {!isModal && <img className="mx-auto h-16 w-auto" src="https://taibarare.com/wp-content/themes/taiba/assets/img/home/footer/TAIBA%20ACCESS%20RARE%20FOOTER%20LOGO_.png" alt="Taiba Pharmacy" />}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create a new account
            </h2>
            <form className="mt-8 space-y-6" action="#" method="POST">
                <div className="rounded-md shadow-sm space-y-4">
                    <div className="relative">
                        <input id="full-name" name="name" type="text" required className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-taiba-purple focus:border-taiba-purple sm:text-sm pl-10" placeholder="Full Name" />
                        <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    </div>
                    <div className="relative">
                        <input id="email-address" name="email" type="email" required className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-taiba-purple focus:border-taiba-purple sm:text-sm pl-10" placeholder="Email address" />
                        <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    </div>
                    <div className="relative">
                        <input id="password" name="password" type="password" required className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-taiba-purple focus:border-taiba-purple sm:text-sm pl-10" placeholder="Password" />
                        <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    </div>
                </div>

                <div>
                    <motion.button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-taiba-purple hover:bg-taiba-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-taiba-blue"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Create Account
                    </motion.button>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
