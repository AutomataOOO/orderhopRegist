export interface RegisterFormData {
  phoneNumber: string;
  countryCode: string;
  name: string;
}

export interface FormErrors {
  phoneNumber?: string;
  name?: string;
}

export interface TermAgreements {
  [key: string]: boolean;
}

export interface RegisterRequestData {
  phoneNumber: string;
  name: string;
  storeName: string;
} 