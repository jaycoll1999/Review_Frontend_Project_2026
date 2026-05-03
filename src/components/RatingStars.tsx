import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  onRate: (rating: number) => void;
  initialRating?: number;
}

export const RatingStars = ({ onRate, initialRating = 0 }: RatingStarsProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (val: number) => {
    setRating(val);
    onRate(val);
  };

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform active:scale-90"
        >
          <Star 
            className={`w-10 h-10 ${
              (hover || rating) >= star 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-slate-200'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
};
