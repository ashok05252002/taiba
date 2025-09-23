import React from 'react';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';

interface Review {
    id: string;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
}

interface CustomerReviewsProps {
    reviews: Review[];
    averageRating: number;
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews, averageRating }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            
            <div className="flex items-center mb-6">
                <p className="text-4xl font-bold mr-4">{averageRating.toFixed(1)}</p>
                <div>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} className={i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                        ))}
                    </div>
                    <p className="text-sm text-taiba-grey">Based on {reviews.length} reviews</p>
                </div>
            </div>

            <div className="space-y-6 h-80 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {reviews.map((review, index) => (
                    <motion.div 
                        key={review.id} 
                        className="border-t pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <div className="flex items-center mb-2">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                <User className="text-gray-500" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{review.author}</p>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-xs text-taiba-grey ml-auto">{review.date}</p>
                        </div>
                        <p className="text-sm text-taiba-grey leading-relaxed">{review.comment}</p>
                    </motion.div>
                ))}
            </div>

            <button className="mt-6 w-full text-center text-taiba-blue font-semibold hover:underline">
                View All Reviews
            </button>
        </div>
    );
};

export default CustomerReviews;
