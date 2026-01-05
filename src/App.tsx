import { AnimatePresence, motion } from 'framer-motion';
import { useFormState } from './hooks/useFormState';
import { sampleQuestions } from './data/sampleQuestions';
import QuestionRenderer from './components/questions/QuestionRenderer';
import Button from './components/ui/Button';
import ProgressBar from './components/ui/ProgressBar';
import FormOverview from './components/overview/FormOverview';

function App() {
  const {
    state,
    updateAnswer,
    goToNext,
    goToPrevious,
    goToQuestion,
    submitForm,
    canProceed,
    getCurrentQuestion,
    getCurrentAnswer,
  } = useFormState(sampleQuestions);

  const currentQuestion = getCurrentQuestion();
  const currentAnswer = getCurrentAnswer();

  const handleSubmit = () => {
    if (canProceed()) {
      goToNext();
    }
  };

  const goBackFromOverview = () => {
    goToQuestion(sampleQuestions.length - 1);
  };

  if (state.showOverview) {
    return (
      <FormOverview
        questions={sampleQuestions}
        answers={state.answers}
        onEdit={goToQuestion}
        onSubmit={submitForm}
        onBack={goBackFromOverview}
      />
    );
  }

  if (state.isComplete) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 p-4'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className='bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center'
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'
          >
            <svg
              className='w-10 h-10 text-green-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </motion.div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Form Completed!
          </h2>
          <p className='text-gray-600 mb-6'>
            Thank you for completing the form. Your responses have been
            recorded.
          </p>
          <Button onClick={() => window.location.reload()} variant='primary'>
            Start Over
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <ProgressBar
            current={state.currentQuestionIndex + 1}
            total={sampleQuestions.length}
          />
        </div>

        <div className='relative min-h-[400px]'>
          <AnimatePresence mode='wait'>
            {currentQuestion && (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <QuestionRenderer
                  question={currentQuestion}
                  answer={currentAnswer}
                  onAnswerChange={updateAnswer}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className='mt-8 flex justify-between items-center gap-4'>
          <Button
            onClick={goToPrevious}
            variant='outline'
            disabled={state.currentQuestionIndex === 0}
          >
            Previous
          </Button>

          <Button
            onClick={handleSubmit}
            variant='primary'
            disabled={!canProceed()}
          >
            {state.currentQuestionIndex === sampleQuestions.length - 1
              ? 'Submit'
              : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
