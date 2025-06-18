import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ConfirmationDialog from "./ConfirmationDialog";

describe("ConfirmationDialog", () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: "Supprimer un élément",
    description: "Êtes-vous sûr de vouloir supprimer cet élément ?",
  };

  it("displays title and description", () => {
    render(<ConfirmationDialog {...defaultProps} />);

    expect(screen.getByText("Supprimer un élément")).toBeInTheDocument();
    expect(
      screen.getByText("Êtes-vous sûr de vouloir supprimer cet élément ?")
    ).toBeInTheDocument();
  });

  it("displays buttons with default texts", () => {
    render(<ConfirmationDialog {...defaultProps} />);
    expect(screen.getByText("Annuler")).toBeInTheDocument();
    expect(screen.getByText("Confirmer")).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", () => {
    render(<ConfirmationDialog {...defaultProps} />);
    fireEvent.click(screen.getByText("Annuler"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onConfirm when Confirm is clicked", () => {
    render(<ConfirmationDialog {...defaultProps} />);
    fireEvent.click(screen.getByText("Confirmer"));
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it("displays an error message if supplied", () => {
    render(
      <ConfirmationDialog {...defaultProps} error="Une erreur s'est produite" />
    );
    expect(screen.getByText("Une erreur s'est produite")).toBeInTheDocument();
  });

  it("disables buttons and displays ‘Loading...’ when loading is true", () => {
    render(<ConfirmationDialog {...defaultProps} loading />);
    expect(screen.getByText("Annuler")).toBeDisabled();
    expect(screen.getByText("Chargement...")).toBeDisabled();
  });
});
