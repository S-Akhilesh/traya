import { useState, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import type { InputQuestion as InputQuestionType } from '../../types/question';
import Card from '../ui/Card';

interface InputQuestionProps {
  question: InputQuestionType;
  value: string | null;
  onChange: (value: string) => void;
}

export default function InputQuestion({
  question,
  value = '',
  onChange,
}: InputQuestionProps) {
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (question.validation) {
      if (
        question.validation.minLength &&
        newValue.length < question.validation.minLength
      ) {
        setError(
          `Minimum length is ${question.validation.minLength} characters`
        );
      } else if (
        question.validation.maxLength &&
        newValue.length > question.validation.maxLength
      ) {
        setError(
          `Maximum length is ${question.validation.maxLength} characters`
        );
      } else if (
        question.validation.pattern &&
        !new RegExp(question.validation.pattern).test(newValue)
      ) {
        setError('Invalid format');
      } else {
        setError('');
      }
    } else {
      setError('');
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='space-y-2'
      >
        <input
          type={question.inputType || 'text'}
          value={value || ''}
          onChange={handleChange}
          placeholder={question.placeholder}
          className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            error
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-white hover:border-primary-300 focus:border-primary-500'
          }`}
        />
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-sm text-red-600'
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </Card>
  );
}
