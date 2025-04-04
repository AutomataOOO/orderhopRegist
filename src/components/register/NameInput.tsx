import React from 'react';

interface NameInputProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export const NameInput: React.FC<NameInputProps> = ({
  value,
  error,
  onChange,
  onBlur,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div>
      <label
        htmlFor="name"
        className="block text-body-sm text-secondary-700 dark:text-secondary-300"
      >
        이름
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        className={`input mt-1.5 w-full bg-white dark:bg-secondary-900 dark:text-secondary-50 ${
          error ? 'border-red-500' : ''
        }`}
        placeholder="홍길동"
        required
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}; 