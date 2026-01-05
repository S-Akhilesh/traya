import { motion } from 'framer-motion';
import type { ImageQuestion as ImageQuestionType } from '../../types/question';
import Card from '../ui/Card';

interface ImageQuestionProps {
  question: ImageQuestionType;
}

export default function ImageQuestion({ question }: ImageQuestionProps) {
  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          {question.title}
        </h2>
        {question.description && (
          <p className='text-gray-600 mb-4'>{question.description}</p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className='rounded-lg overflow-hidden'
      >
        <img
          src={question.imageUrl}
          alt={question.altText || question.title}
          className='w-full h-auto object-cover'
        />
        {question.caption && (
          <p className='mt-2 text-sm text-gray-600 text-center'>
            {question.caption}
          </p>
        )}
      </motion.div>
    </Card>
  );
}
