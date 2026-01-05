import { type HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

export interface CardProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    | 'onAnimationStart'
    | 'onAnimationEnd'
    | 'onDrag'
    | 'onDragStart'
    | 'onDragEnd'
  > {
  variant?: 'default' | 'elevated';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', className = '', ...props }, ref) => {
    const baseStyles = 'rounded-xl p-6 bg-white';
    const variants = {
      default: 'shadow-md',
      elevated: 'shadow-xl',
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
