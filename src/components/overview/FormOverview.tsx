import { motion } from 'framer-motion';
import type { Question, FormAnswer } from '../../types/question';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface FormOverviewProps {
  questions: Question[];
  answers: Record<string, FormAnswer>;
  onEdit: (questionIndex: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function FormOverview({
  questions,
  answers,
  onEdit,
  onSubmit,
  onBack,
}: FormOverviewProps) {
  const formatAnswer = (question: Question, answer: FormAnswer | undefined) => {
    if (!answer || answer.value === null || answer.value === '') {
      return <span className='text-gray-400 italic'>Not answered</span>;
    }

    switch (question.type) {
      case 'single-choice': {
        const option = question.options.find(
          (opt) => opt.value === answer.value
        );
        return (
          <div className='flex items-center gap-2'>
            <span className='text-gray-900 font-medium'>
              {option?.label || answer.value}
            </span>
          </div>
        );
      }

      case 'multiple-choice': {
        const values = answer.value as string[];
        if (values.length === 0) {
          return <span className='text-gray-400 italic'>No selections</span>;
        }
        const selectedOptions = question.options.filter((opt) =>
          values.includes(opt.value)
        );
        return (
          <div className='flex flex-wrap gap-2'>
            {selectedOptions.map((option) => (
              <span
                key={option.id}
                className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800'
              >
                {option.label}
              </span>
            ))}
          </div>
        );
      }

      case 'input': {
        return (
          <span className='text-gray-900 font-medium'>
            {answer.value as string}
          </span>
        );
      }

      case 'image-upload': {
        const imageUrl = answer.value as string;
        if (!imageUrl) {
          return (
            <span className='text-gray-400 italic'>No image uploaded</span>
          );
        }
        return (
          <div className='mt-2'>
            <img
              src={imageUrl}
              alt='Uploaded'
              className='w-full max-w-xs h-auto rounded-lg border-2 border-gray-200 object-cover'
            />
          </div>
        );
      }

      case 'image': {
        return null;
      }

      default:
        return <span className='text-gray-600'>{String(answer.value)}</span>;
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-8 text-center'
        >
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Review Your Answers
          </h1>
          <p className='text-gray-600'>
            Please review your responses before submitting
          </p>
        </motion.div>

        <div className='space-y-4 mb-8'>
          {questions.map((question, index) => {
            if (question.type === 'image') {
              return null;
            }

            const answer = answers[question.id];

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className='hover:shadow-lg transition-shadow'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-2'>
                        <span className='flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-semibold flex items-center justify-center text-sm'>
                          {index + 1}
                        </span>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          {question.title}
                        </h3>
                        {question.required && (
                          <span className='text-xs text-red-500 font-medium'>
                            Required
                          </span>
                        )}
                      </div>
                      {question.description && (
                        <p className='text-sm text-gray-600 mb-3 ml-10'>
                          {question.description}
                        </p>
                      )}
                      <div className='ml-10'>
                        {formatAnswer(question, answer)}
                      </div>
                    </div>
                    <Button
                      onClick={() => onEdit(index)}
                      variant='outline'
                      size='sm'
                      className='flex-shrink-0'
                    >
                      Edit
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='flex justify-between items-center gap-4 bg-white rounded-xl shadow-md p-6'
        >
          <Button onClick={onBack} variant='outline'>
            Back to Form
          </Button>
          <Button onClick={onSubmit} variant='primary' size='lg'>
            Submit Form
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
