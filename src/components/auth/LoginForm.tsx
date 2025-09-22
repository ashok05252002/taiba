import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';

interface LoginFormProps {
    isModal?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isModal }) => {
    return (
        <div>
            {!isModal && <img className="mx-auto h-16 w-auto" src="https://taibarare.com/wp-content/themes/taiba/assets/img/home/footer/TAIBA%20ACCESS%20RARE%20FOOTER%20LOGO_.png" alt="Taiba Pharmacy" />}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
            </h2>
            <form className="mt-8 space-y-6" action="#" method="POST">
                <div className="rounded-md shadow-sm -space-y-px">
                    <div className="relative">
                        <input id="email-address" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-taiba-blue focus:border-taiba-blue focus:z-10 sm:text-sm pl-10" placeholder="Email address" />
                        <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    </div>
                    <div className="relative">
                        <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-taiba-blue focus:border-taiba-blue focus:z-10 sm:text-sm pl-10" placeholder="Password" />
                        <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-taiba-blue focus:ring-taiba-blue border-gray-300 rounded" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>

                    <div className="text-sm">
                        <a href="#" className="font-medium text-taiba-blue hover:text-taiba-purple">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div>
                    <motion.button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-taiba-blue hover:bg-taiba-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-taiba-purple"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Sign in
                    </motion.button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
