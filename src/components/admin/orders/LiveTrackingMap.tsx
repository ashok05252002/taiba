import React from 'react';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

const LiveTrackingMap: React.FC = () => {
    return (
        <div className="w-full h-full bg-gray-200 rounded-md overflow-hidden relative">
            {/* Mock map background */}
            <img src="/assets/images/maps/oman-map-placeholder.png" alt="Map" className="w-full h-full object-cover opacity-50" />
            
            {/* Mock route line */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
                <motion.path
                    d="M 20 80 Q 80 80, 100 50 T 180 20"
                    fill="none"
                    stroke="#108BFA"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
            </svg>

            {/* Delivery truck icon animating along the path */}
            <motion.div
                className="absolute"
                style={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                <div 
                    className="bg-taiba-blue text-white p-1.5 rounded-full shadow-lg"
                    style={{ offsetPath: 'path("M 20 80 Q 80 80, 100 50 T 180 20")' }}
                >
                    <Truck size={16} />
                </div>
            </motion.div>

             {/* Start and End points */}
            <div className="absolute" style={{ top: '75%', left: '8%' }}>
                <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                <span className="text-xs font-semibold -ml-2">Branch</span>
            </div>
             <div className="absolute" style={{ top: '15%', left: '88%' }}>
                <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                <span className="text-xs font-semibold -ml-2">Home</span>
            </div>

            <div className="absolute bottom-2 left-2 bg-white/80 p-2 rounded-md text-xs">
                <p><strong>ETA:</strong> 15 mins</p>
            </div>
        </div>
    );
};

export default LiveTrackingMap;
