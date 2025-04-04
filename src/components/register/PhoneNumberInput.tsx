import React from 'react';
import { COUNTRIES } from '@/constants/countries';

interface PhoneNumberInputProps {
  value: string;
  countryCode: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  onCountryCodeChange: (value: string) => void;
}

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  countryCode,
  error,
  onChange,
  onBlur,
  onCountryCodeChange,
}) => {
  const selectedCountry = COUNTRIES[countryCode];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div>
      <label
        htmlFor="phoneNumber"
        className="block text-body-sm text-secondary-700 dark:text-secondary-300"
      >
        휴대폰 번호
      </label>
      <div className="mt-1.5 flex gap-2">
        <div className="relative w-24">
          <select
            value={countryCode}
            onChange={(e) => onCountryCodeChange(e.target.value)}
            className="input w-full appearance-none bg-secondary-50 pl-8 pr-2 dark:bg-secondary-900 dark:text-secondary-50"
            disabled
          >
            {Object.values(COUNTRIES).map((country) => (
              <option key={country.code} value={country.code}>
                {country.dialCode}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
            {selectedCountry.flag}
          </span>
        </div>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          className={`input flex-1 bg-white dark:bg-secondary-900 dark:text-secondary-50 ${
            error ? 'border-red-500' : ''
          }`}
          placeholder={selectedCountry.placeholder}
          required
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}; 