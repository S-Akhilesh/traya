export type QuestionType =
  | 'multiple-choice'
  | 'single-choice'
  | 'input'
  | 'image'
  | 'image-upload';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required?: boolean;
}

export interface ChoiceOption {
  id: string;
  label: string;
  value: string;
  imageUrl?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: ChoiceOption[];
  maxSelections?: number;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single-choice';
  options: ChoiceOption[];
}

export interface InputQuestion extends BaseQuestion {
  type: 'input';
  inputType?: 'text' | 'email' | 'number' | 'tel' | 'url';
  placeholder?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface ImageQuestion extends BaseQuestion {
  type: 'image';
  imageUrl: string;
  altText?: string;
  caption?: string;
}

export interface ImageUploadQuestion extends BaseQuestion {
  type: 'image-upload';
  maxSizeMB?: number;
  acceptedFormats?: string[];
}

export type Question =
  | MultipleChoiceQuestion
  | SingleChoiceQuestion
  | InputQuestion
  | ImageQuestion
  | ImageUploadQuestion;

export interface FormAnswer {
  questionId: string;
  value: string | string[] | null;
}

export interface FormState {
  currentQuestionIndex: number;
  answers: Record<string, FormAnswer>;
  isComplete: boolean;
  showOverview: boolean;
  isLoading: boolean;
}
