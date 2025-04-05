interface SubmitButtonProps {
  isDisabled: boolean;
  isLoading: boolean;
}

export function SubmitButton({ isDisabled, isLoading }: SubmitButtonProps) {
  return (
    <div className="sticky bottom-0 left-0 right-0 border-t border-secondary-200 bg-white shadow-md dark:border-secondary-700 dark:bg-secondary-900">
      <div className="mx-auto w-full max-w-[480px] px-4 py-4">
        <button
          type="submit"
          disabled={isDisabled}
          className="w-full rounded-lg bg-primary-600 px-4 py-3 text-center text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-secondary-300 dark:disabled:bg-secondary-700"
        >
          {isLoading ? '가입 중...' : '가입하기'}
        </button>
      </div>
    </div>
  );
} 