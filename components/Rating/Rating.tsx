/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
enum Filled {
  full = 'full',
  half = 'half',
  empty = 'empty',
}

const Star = ({ filled }: { filled: Filled }) => {
  if (filled === 'full') {
    return (
      <svg className="w-5 h-5 text-purple" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.992h5.253c.97 0 1.371 1.24.588 1.81l-4.243 3.127 1.618 4.992c.3.921-.755 1.688-1.538 1.116L10 15.347l-4.243 3.127c-.782.572-1.838-.195-1.538-1.116l1.618-4.992-4.243-3.127c-.783-.57-.382-1.81.588-1.81h5.253l1.618-4.992z" />
      </svg>
    );
  } if (filled === 'half') {
    return (
      <svg className="w-5 h-5 text-purple" fill="currentColor" viewBox="0 0 20 20">
        <defs>
          <linearGradient id="halfGrad">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.992h5.253c.97 0 1.371 1.24.588 1.81l-4.243 3.127 1.618 4.992c.3.921-.755 1.688-1.538 1.116L10 15.347l-4.243 3.127c-.782.572-1.838-.195-1.538-1.116l1.618-4.992-4.243-3.127c-.783-.57-.382-1.81.588-1.81h5.253l1.618-4.992z" fill="url(#halfGrad)" />
      </svg>
    );
  }
 
    return (
      <svg className="w-5 h-5 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
      </svg>
    );
  
};

export const Rating = ({ rating = 0, reviews }: { rating: number, reviews: number }) => {
  const ratingTouse = rating / 2;
  const fullStars = Math.floor(ratingTouse);
  const halfStars = ratingTouse % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center gap-1 relative">
      <div className="absolute flex items-center gap-1">
        {Array(5).fill('').map((_, i) => <Star key={`empty-${i}`} filled={Filled.empty} />)}
      </div>
      {Array(fullStars).fill('').map((_, i) => <Star key={`full-${i}`} filled={Filled.full} />)}
      {Array(halfStars).fill('').map((_, i) => <Star key={`half-${i}`} filled={Filled.half} />)}
      {Array(emptyStars).fill('').map((_, i) => <Star key={`empty-${i}`} filled={Filled.empty} />)}
      <span className="text-xs text-gray-400">{`${rating.toFixed(2)} (${reviews} reviews)`}</span>
    </div>
  )
}