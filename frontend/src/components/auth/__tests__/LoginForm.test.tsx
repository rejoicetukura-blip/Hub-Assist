import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "@/components/auth/LoginForm";

// Mock the hook used by LoginForm
const mockMutate = jest.fn();
jest.mock("@/hooks/useLoginUser", () => ({
  useLoginUser: () => ({ mutate: mockMutate, isPending: false, error: null }),
}));

// Mock router
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: jest.fn() }) }));

describe("LoginForm", () => {
  beforeEach(() => mockMutate.mockClear());

  it("renders email and password fields", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText("you@workspace.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument();
    });
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("calls mutate with credentials on valid submit", async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText("you@workspace.com"), { target: { value: "user@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), { target: { value: "Password1!" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { email: "user@test.com", password: "Password1!" },
        expect.any(Object),
      );
    });
  });
});
