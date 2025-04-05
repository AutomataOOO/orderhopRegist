export interface RegisterFormData {
  phoneNumber: string;
  name: string;
  countryCode: string;
}

export interface RegisterRequestData {
  phone_number: string;
  name: string;
  store_name: string;
  store_id: string;
  brand_id: string;
}

export interface FormErrors {
  phoneNumber?: string;
  name?: string;
}

export interface TermAgreements {
  [key: string]: boolean;
} 