import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RegisterForm } from "@/components/auth/RegisterForm";

const mockMutate = jest.fn();
jest.mock("@/hooks/useRegisterUser", () => ({
  useRegisterUser: () => ({ mutate: mockMutate, isPending: false, error: null }),
}));
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: jest.fn() }) }));

function fillForm(overrides: Record<string, string> = {}) {
  fireEvent.change(screen.getByPlaceholderText("Jane"), { target: { value: overrides.firstname ?? "Jane" } });
  fireEvent.change(screen.getByPlaceholderText("Doe"), { target: { value: overrides.lastname ?? "Doe" } });
  fireEvent.change(screen.getByPlaceholderText("you@workspace.com"), { target: { value: overrides.email ?? "user@test.com" } });
  const pwFields = screen.getAllByPlaceholderText("••••••••");
  fireEvent.change(pwFields[0], { target: { value: overrides.password ?? "Password1!" } });
  fireEvent.change(pwFields[1], { target: { value: overrides.confirmPassword ?? "Password1!" } });
}

describe("RegisterForm", () => {
  beforeEach(() => mockMutate.mockClear());

  it("shows error when passwords do not match", async () => {
    render(<RegisterForm />);
    fillForm({ confirmPassword: "Different1!" });
    fireEvent.click(screen.getByRole("button", { name: /create account/i }));
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it("calls mutate on valid form submission", async () => {
    render(<RegisterForm />);
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /create account/i }));
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { firstname: "Jane", lastname: "Doe", email: "user@test.com", password: "Password1!" },
        expect.any(Object),
      );
    });
  });
});
