import type { Question, FormAnswer } from '../../types/question';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import SingleChoiceQuestion from './SingleChoiceQuestion';
import InputQuestion from './InputQuestion';
import ImageQuestion from './ImageQuestion';
import ImageUploadQuestion from './ImageUploadQuestion';

interface QuestionRendererProps {
  question: Question;
  answer: FormAnswer | undefined;
  onAnswerChange: (answer: FormAnswer) => void;
}

export default function QuestionRenderer({
  question,
  answer,
  onAnswerChange,
}: QuestionRendererProps) {
  const handleAnswerChange = (value: string | string[]) => {
    onAnswerChange({
      questionId: question.id,
      value: value,
    });
  };

  switch (question.type) {
    case 'multiple-choice':
      return (
        <MultipleChoiceQuestion
          question={question}
          value={(answer?.value as string[]) || []}
          onChange={(value) => handleAnswerChange(value)}
        />
      );
    case 'single-choice':
      return (
        <SingleChoiceQuestion
          question={question}
          value={(answer?.value as string) || null}
          onChange={(value) => handleAnswerChange(value)}
        />
      );
    case 'input':
      return (
        <InputQuestion
          question={question}
          value={(answer?.value as string) || null}
          onChange={(value) => handleAnswerChange(value)}
        />
      );
    case 'image':
      return <ImageQuestion question={question} />;
    case 'image-upload':
      return (
        <ImageUploadQuestion
          question={question}
          value={(answer?.value as string) || null}
          onChange={(value) => handleAnswerChange(value)}
        />
      );
    default:
      return null;
  }
}
