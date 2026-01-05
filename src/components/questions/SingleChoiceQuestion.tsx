import { motion } from 'framer-motion';
import type { SingleChoiceQuestion as SingleChoiceQuestionType } from '../../types/question';
import Card from '../ui/Card';

interface SingleChoiceQuestionProps {
  question: SingleChoiceQuestionType;
  value: string | null;
  onChange: (value: string) => void;
}

export default function SingleChoiceQuestion({
  question,
  value,
  onChange,
}: SingleChoiceQuestionProps) {
  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          {question.title}
        </h2>
        {question.description && (
          <p className='text-gray-600'>{question.description}</p>
        )}
      </div>

      <div className='space-y-3'>
        {question.options.map((option, index) => {
          const isSelected = value === option.value;
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(option.value)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50/50'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? 'border-primary-600 bg-primary-600'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className='w-2 h-2 rounded-full bg-white'
                    />
                  )}
                </div>
                <div className='flex-1'>
                  {option.imageUrl && (
                    <img
                      src={option.imageUrl}
                      alt={option.label}
                      className='w-full h-32 object-cover rounded mb-2'
                    />
                  )}
                  <span className='text-gray-900 font-medium'>
                    {option.label}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </Card>
  );
}
