import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loading from "./Loading";

describe("Loading", () => {
  it("renders the HashLoader", () => {
    const { container } = render(<Loading />);
    const hashLoader = container.querySelector("#react-spinners-HashLoader");
    expect(hashLoader).toBeInTheDocument();
  });
});
