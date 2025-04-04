interface SubmitButtonProps {
  isDisabled: boolean;
  isLoading: boolean;
  onClick: (e?: React.FormEvent) => void;
}

export function SubmitButton({ isDisabled, isLoading, onClick }: SubmitButtonProps) {
  return (
    <div className="sticky bottom-0 z-[100] border-t border-secondary-200 bg-white px-4 py-4 shadow-md dark:border-secondary-700 dark:bg-secondary-900">
      <div className="mx-auto max-w-[480px]">
        <button
          type="button"
          onClick={onClick}
          disabled={isDisabled}
          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? '가입 중...' : '가입하기'}
        </button>
      </div>
    </div>
  );
} 