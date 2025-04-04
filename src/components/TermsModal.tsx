interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export function TermsModal({ isOpen, onClose, title, content }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
      <div className="relative mx-4 max-h-[95vh] w-full max-w-2xl rounded-lg bg-white p-6 dark:bg-secondary-900">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-secondary-500 hover:text-secondary-700"
        >
          ✕
        </button>
        <h2 className="mb-4 text-xl font-bold text-secondary-900 dark:text-secondary-50">
          {title}
        </h2>
        <textarea
          readOnly
          value={content}
          className="h-[calc(95vh-10rem)] w-full resize-none rounded-lg border border-secondary-200 bg-white p-4 text-secondary-600 focus:outline-none dark:border-secondary-700 dark:bg-secondary-800 dark:text-secondary-300"
        />
      </div>
    </div>
  );
} 