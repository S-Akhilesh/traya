import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ImageUploadQuestion as ImageUploadQuestionType } from '../../types/question';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ImageUploadQuestionProps {
  question: ImageUploadQuestionType;
  value: string | null;
  onChange: (value: string) => void;
}

export default function ImageUploadQuestion({
  question,
  value,
  onChange,
}: ImageUploadQuestionProps) {
  const [preview, setPreview] = useState<string | null>(value);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeMB = question.maxSizeMB || 5;
  const acceptedFormats = question.acceptedFormats || [
    'image/jpeg',
    'image/png',
    'image/webp',
  ];

  const handleFileSelect = (file: File) => {
    setError('');

    if (!acceptedFormats.includes(file.type)) {
      setError(
        `Please select a valid image format (${acceptedFormats
          .map((f) => f.split('/')[1])
          .join(', ')})`
      );
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      onChange(dataUrl);
    };
    reader.onerror = () => {
      setError('Failed to read the file');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
        {maxSizeMB && (
          <p className='text-sm text-gray-500 mt-2'>
            Maximum file size: {maxSizeMB}MB
          </p>
        )}
      </div>

      <div className='space-y-4'>
        <AnimatePresence mode='wait'>
          {preview ? (
            <motion.div
              key='preview'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='relative rounded-lg overflow-hidden border-2 border-gray-200'
            >
              <img
                src={preview}
                alt='Preview'
                className='w-full h-auto max-h-96 object-contain'
              />
              <button
                onClick={removeImage}
                className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg'
                aria-label='Remove image'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key='no-preview'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='border-2 border-dashed border-gray-300 rounded-lg p-12 text-center min-h-[300px] flex flex-col items-center justify-center'
            >
              <svg
                className='w-16 h-16 mx-auto text-gray-400 mb-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              <p className='text-gray-500 mb-4'>No image selected</p>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-sm text-red-600 bg-red-50 p-3 rounded-lg'
          >
            {error}
          </motion.p>
        )}

        <div className='flex flex-wrap gap-3 justify-center'>
          <input
            ref={fileInputRef}
            type='file'
            accept={acceptedFormats.join(',')}
            onChange={handleFileInputChange}
            className='hidden'
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant='primary'
          >
            <svg
              className='w-5 h-5 inline-block mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              />
            </svg>
            Upload Image
          </Button>
        </div>
      </div>
    </Card>
  );
}
