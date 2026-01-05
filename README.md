# Traya - Dynamic Form Builder

A modern, interactive form builder application built with React, TypeScript, and Vite. This project provides a step-by-step form experience with multiple question types, validation, progress tracking, and a beautiful UI with smooth animations.

## Features

- 🎯 **Multiple Question Types**: Support for input fields, single-choice, multiple-choice, image display, and image upload questions
- ✅ **Form Validation**: Built-in validation for required fields and input constraints
- 📊 **Progress Tracking**: Visual progress bar showing completion status
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- ✨ **Smooth Animations**: Page transitions powered by Framer Motion
- 📋 **Form Overview**: Review all answers before final submission
- 🔄 **Navigation**: Easy navigation between questions with Previous/Next buttons

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16 or higher)
- **npm** (version 7 or higher) or **yarn**

You can check your versions by running:

```bash
node --version
npm --version
```

## Installation

Follow these steps to set up the project on your local machine:

### Step 1: Clone the Repository

If you haven't already, clone or download the project to your local machine:

```bash
git clone <repository-url>
cd traya
```

### Step 2: Install Dependencies

Install all required dependencies using npm:

```bash
npm install
```

This will install all the packages listed in `package.json`, including:

- React and React DOM
- TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- React Hook Form (form handling)

### Step 3: Verify Installation

After installation completes, verify that everything is set up correctly by checking for any error messages. The installation should complete without errors.

## Running the Project

### Development Mode

To start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is occupied). The terminal will display the exact URL.

The development server includes:

- Hot module replacement (changes reflect immediately)
- Fast refresh for React components
- Source maps for debugging

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This command will:

1. Type-check the code using TypeScript
2. Build the application using Vite
3. Output the production-ready files to the `dist` directory

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

This serves the production build from the `dist` directory, allowing you to test how the app will behave in production.

### Linting

To check for code quality and style issues:

```bash
npm run lint
```

## Project Structure

```
traya/
├── public/                 # Static assets
│   └── vite.svg
├── src/
│   ├── assets/            # Images and other assets
│   │   └── react.svg
│   ├── components/         # React components
│   │   ├── overview/      # Form overview component
│   │   │   └── FormOverview.tsx
│   │   ├── questions/     # Question type components
│   │   │   ├── QuestionRenderer.tsx
│   │   │   ├── InputQuestion.tsx
│   │   │   ├── SingleChoiceQuestion.tsx
│   │   │   ├── MultipleChoiceQuestion.tsx
│   │   │   ├── ImageQuestion.tsx
│   │   │   └── ImageUploadQuestion.tsx
│   │   └── ui/            # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── ProgressBar.tsx
│   ├── data/              # Sample data
│   │   └── sampleQuestions.ts
│   ├── hooks/             # Custom React hooks
│   │   └── useFormState.ts
│   ├── types/             # TypeScript type definitions
│   │   └── question.ts
│   ├── App.tsx            # Main application component
│   ├── App.css            # Application styles
│   ├── index.css          # Global styles
│   └── main.tsx           # Application entry point
├── index.html             # HTML template
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # This file
```

## Question Types

The application supports five different question types:

### 1. Input Question

Text input fields with validation support:

- Types: `text`, `email`, `number`, `tel`, `url`
- Validation: min/max length, pattern matching
- Example: Name, phone number, age

### 2. Single Choice Question

Radio button selection (one option only):

- Multiple options displayed as selectable cards
- Only one option can be selected
- Example: Gender, hair loss stage

### 3. Multiple Choice Question

Checkbox selection (multiple options):

- Multiple options can be selected
- Optional max selections limit
- Example: Health conditions, treatments tried

### 4. Image Question

Display an image with optional caption:

- Shows an image to the user
- Can include alt text and caption
- No user input required

### 5. Image Upload Question

File upload functionality:

- Users can upload images
- Configurable file size limits
- Configurable accepted file formats
- Example: Scalp picture upload

## Customizing Questions

To customize the questions in your form, edit the `src/data/sampleQuestions.ts` file:

1. **Add a new question**: Add a new question object to the `sampleQuestions` array
2. **Modify existing questions**: Edit the properties of any question object
3. **Change question order**: Reorder items in the array

Example question structure:

```typescript
{
  id: 'unique-id',
  type: 'input', // or 'single-choice', 'multiple-choice', 'image', 'image-upload'
  title: 'Question Title',
  description: 'Optional description',
  required: true,
  // Type-specific properties...
}
```

For detailed question type structures, refer to `src/types/question.ts`.

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form state management

## Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Development Tips

1. **Hot Module Replacement**: Changes to your code will automatically reflect in the browser
2. **TypeScript**: The project uses TypeScript for type safety - check the console for type errors
3. **Component Structure**: Each question type has its own component in `src/components/questions/`
4. **State Management**: Form state is managed by the `useFormState` hook in `src/hooks/useFormState.ts`
5. **Styling**: Uses Tailwind CSS - modify `tailwind.config.js` to customize the design system

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port. Check the terminal output for the actual URL.

### Build Errors

If you encounter build errors:

1. Ensure all dependencies are installed: `npm install`
2. Check TypeScript errors: `npm run build`
3. Verify Node.js version is 16 or higher

### Styling Issues

If styles aren't loading:

1. Ensure Tailwind CSS is properly configured
2. Check that `index.css` imports Tailwind directives
3. Restart the dev server

## License

This project is private and proprietary.

## Support

For issues or questions, please refer to the project documentation or contact the development team.
