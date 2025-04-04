import { useState, useCallback } from 'react';
import { TERMS } from '@/constants/terms';

export interface TermAgreements {
  [key: string]: boolean;
}

export interface UseTermsAgreementReturn {
  agreements: TermAgreements;
  isAgreed: boolean;
  selectedTerm: { title: string; content: string } | null;
  handleAgreementChange: (termId: string) => void;
  handleAgreeAll: (value: boolean) => void;
  handleViewTerm: (title: string, content: string) => void;
  handleCloseTerm: () => void;
}

export function useTermsAgreement(): UseTermsAgreementReturn {
  const [agreements, setAgreements] = useState<TermAgreements>(
    TERMS.reduce((acc, term) => ({ ...acc, [term.id]: false }), {})
  );
  const [isAgreed, setIsAgreed] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<{ title: string; content: string } | null>(null);

  const checkRequiredTerms = useCallback((newAgreements: TermAgreements) => {
    return TERMS
      .filter(term => term.required)
      .every(term => newAgreements[term.id]);
  }, []);

  const handleAgreementChange = useCallback((termId: string) => {
    setAgreements(prev => {
      const newAgreements = { ...prev, [termId]: !prev[termId] };
      const requiredTermsAgreed = checkRequiredTerms(newAgreements);
      setIsAgreed(requiredTermsAgreed);
      return newAgreements;
    });
  }, [checkRequiredTerms]);

  const handleAgreeAll = useCallback((value: boolean) => {
    setAgreements(prev => {
      const newAgreements = Object.keys(prev).reduce(
        (acc, key) => ({ ...acc, [key]: value }),
        {}
      );
      const requiredTermsAgreed = checkRequiredTerms(newAgreements);
      setIsAgreed(requiredTermsAgreed);
      return newAgreements;
    });
  }, [checkRequiredTerms]);

  const handleViewTerm = useCallback((title: string, content: string) => {
    setSelectedTerm({ title, content });
  }, []);

  const handleCloseTerm = useCallback(() => {
    setSelectedTerm(null);
  }, []);

  return {
    agreements,
    isAgreed,
    selectedTerm,
    handleAgreementChange,
    handleAgreeAll,
    handleViewTerm,
    handleCloseTerm,
  };
} 