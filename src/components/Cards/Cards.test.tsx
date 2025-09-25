import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ErrorCard, MessageCard } from "./Cards";
import { Smile } from "lucide-react";

describe("ErrorCard", () => {
  it("renders the error message", () => {
    const error = { code: 404, message: "Not Found" };
    render(<ErrorCard error={error} />);
    const errorMessage = screen.getByText("Not Found");
    expect(errorMessage).toBeInTheDocument();
  });
});

describe("MessageCard", () => {
  it("renders the message and icon", () => {
    render(<MessageCard message="Hello, World!" icon={Smile} />);
    const message = screen.getByText("Hello, World!");
    expect(message).toBeInTheDocument();

    const icon = document.querySelector(".lucide-smile");
    expect(icon).toBeInTheDocument();
  });
});
