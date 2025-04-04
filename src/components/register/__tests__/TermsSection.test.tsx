import { render, screen, fireEvent } from '@testing-library/react';
import TermsSection from '../TermsSection';
import { TERMS } from '@/constants/terms';
import '@testing-library/jest-dom';

describe('TermsSection', () => {
  const mockAgreements = TERMS.reduce((acc, term) => ({ ...acc, [term.id]: false }), {});
  const mockOnAgreementChange = jest.fn();
  const mockOnAgreeAll = jest.fn();
  const mockOnViewTerm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all terms correctly', () => {
    render(
      <TermsSection
        agreements={mockAgreements}
        onAgreementChange={mockOnAgreementChange}
        onAgreeAll={mockOnAgreeAll}
        onViewTerm={mockOnViewTerm}
      />
    );

    TERMS.forEach(term => {
      expect(screen.getByLabelText(term.title, { exact: false })).toBeInTheDocument();
    });
    
    const viewButtons = screen.getAllByRole('button', { name: '보기' });
    expect(viewButtons).toHaveLength(TERMS.length);
  });

  it('handles individual term agreement changes', () => {
    render(
      <TermsSection
        agreements={mockAgreements}
        onAgreementChange={mockOnAgreementChange}
        onAgreeAll={mockOnAgreeAll}
        onViewTerm={mockOnViewTerm}
      />
    );

    const checkbox = screen.getByLabelText(TERMS[0].title, { exact: false });
    fireEvent.click(checkbox);

    expect(mockOnAgreementChange).toHaveBeenCalledWith(TERMS[0].id);
  });

  it('handles agree all button', () => {
    render(
      <TermsSection
        agreements={mockAgreements}
        onAgreementChange={mockOnAgreementChange}
        onAgreeAll={mockOnAgreeAll}
        onViewTerm={mockOnViewTerm}
      />
    );

    const agreeAllButton = screen.getByRole('button', { name: '전체 동의' });
    fireEvent.click(agreeAllButton);

    expect(mockOnAgreeAll).toHaveBeenCalledWith(true);
  });

  it('handles view term button clicks', () => {
    render(
      <TermsSection
        agreements={mockAgreements}
        onAgreementChange={mockOnAgreementChange}
        onAgreeAll={mockOnAgreeAll}
        onViewTerm={mockOnViewTerm}
      />
    );

    const viewButtons = screen.getAllByRole('button', { name: '보기' });
    fireEvent.click(viewButtons[0]);

    expect(mockOnViewTerm).toHaveBeenCalledWith(TERMS[0].title, TERMS[0].content);
  });
}); 