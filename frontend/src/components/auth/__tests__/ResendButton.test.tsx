import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ResendButton } from "@/components/auth/ResendButton";
import * as apiClient from "@/lib/apiClient";

jest.mock("@/lib/apiClient", () => ({ post: jest.fn().mockResolvedValue({}) }));

// Mock CountDownTimer so we can control expiry without real timers
jest.mock("@/components/ui/CountDownTimer", () => ({
  CountDownTimer: ({ onExpire }: { onExpire: () => void }) => (
    <button data-testid="expire-timer" onClick={onExpire}>expire</button>
  ),
}));

describe("ResendButton", () => {
  const mockPost = apiClient.post as jest.Mock;
  beforeEach(() => mockPost.mockClear());

  it("shows countdown timer initially", () => {
    render(<ResendButton email="user@test.com" />);
    expect(screen.getByText(/resend code in/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /resend code/i })).not.toBeInTheDocument();
  });

  it("shows resend button after countdown expires", async () => {
    render(<ResendButton email="user@test.com" />);
    await act(async () => { fireEvent.click(screen.getByTestId("expire-timer")); });
    expect(screen.getByRole("button", { name: /resend code/i })).toBeInTheDocument();
  });

  it("calls post and restarts countdown after clicking resend", async () => {
    render(<ResendButton email="user@test.com" />);
    await act(async () => { fireEvent.click(screen.getByTestId("expire-timer")); });
    await act(async () => { fireEvent.click(screen.getByRole("button", { name: /resend code/i })); });
    expect(mockPost).toHaveBeenCalledWith("/auth/resend-otp", { email: "user@test.com" });
    expect(screen.queryByRole("button", { name: /resend code/i })).not.toBeInTheDocument();
  });
});
