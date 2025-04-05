interface SubmitButtonProps {
  isDisabled: boolean;
  isLoading: boolean;
}

export function SubmitButton({ isDisabled, isLoading }: SubmitButtonProps) {
  return (
    <div className="mt-auto sticky bottom-0 left-0 right-0 z-[100] border-t border-secondary-200 bg-white px-4 py-4 shadow-md dark:border-secondary-700 dark:bg-secondary-900">
      <div className="mx-auto max-w-[480px]">
        <button
          type="submit"
          disabled={isDisabled}
          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? '가입 중...' : '가입하기'}
        </button>
      </div>
    </div>
  );
} 