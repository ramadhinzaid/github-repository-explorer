import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ButtonSubmit } from "./Buttons";

describe("ButtonSubmit", () => {
  it("renders the button with the correct title", () => {
    render(<ButtonSubmit title="Submit" />);
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toBeInTheDocument();
  });

  it("disables the button when isLoading is true", () => {
    render(<ButtonSubmit title="Submit" isLoading={true} />);
    const button = screen.getByRole("button", { name: "Loading" });
    expect(button).toBeDisabled();
  });

  it("shows 'Loading' text when isLoading is true", () => {
    render(<ButtonSubmit title="Submit" isLoading={true} />);
    const button = screen.getByRole("button", { name: "Loading" });
    expect(button).toHaveTextContent("Loading");
  });

  it("calls the onClick handler when clicked", () => {
    const onClick = vi.fn();
    render(<ButtonSubmit title="Submit" onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
