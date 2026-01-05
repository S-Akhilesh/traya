import { motion } from 'framer-motion';
import type { MultipleChoiceQuestion as MultipleChoiceQuestionType } from '../../types/question';
import Card from '../ui/Card';

interface MultipleChoiceQuestionProps {
  question: MultipleChoiceQuestionType;
  value: string[];
  onChange: (value: string[]) => void;
}

export default function MultipleChoiceQuestion({
  question,
  value = [],
  onChange,
}: MultipleChoiceQuestionProps) {
  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      if (question.maxSelections && value.length >= question.maxSelections) {
        return;
      }
      onChange([...value, optionValue]);
    }
  };

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          {question.title}
        </h2>
        {question.description && (
          <p className='text-gray-600'>{question.description}</p>
        )}
        {question.maxSelections && (
          <p className='text-sm text-gray-500 mt-2'>
            Select up to {question.maxSelections} option
            {question.maxSelections > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className='space-y-3'>
        {question.options.map((option, index) => {
          const isSelected = value.includes(option.value);
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleToggle(option.value)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-primary-600 bg-primary-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50/50'
              }`}
            >
              <div className='flex items-center gap-3'>
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                    isSelected
                      ? 'border-primary-600 bg-primary-600'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {isSelected && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className='w-3 h-3 text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </motion.svg>
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
