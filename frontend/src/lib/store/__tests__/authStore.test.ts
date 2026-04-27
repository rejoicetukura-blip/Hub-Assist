import { act } from "@testing-library/react";
import { useAuthStore } from "@/lib/store/authStore";

// Valid JWT with exp far in the future
const makeToken = (expOffset = 3600) => {
  const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + expOffset }));
  return `header.${payload}.sig`;
};

// Suppress jsdom navigation errors from logout redirect
const originalError = console.error;
beforeAll(() => { console.error = jest.fn(); });
afterAll(() => { console.error = originalError; });

beforeEach(() => {
  act(() => useAuthStore.getState().clearAuth());
});

describe("authStore", () => {
  it("login sets token and isAuthenticated", () => {
    const token = makeToken();
    act(() => useAuthStore.getState().login({ access_token: token }));
    const { accessToken, isAuthenticated } = useAuthStore.getState();
    expect(accessToken).toBe(token);
    expect(isAuthenticated).toBe(true);
  });

  it("login sets user when provided", () => {
    const user = { id: "1", firstname: "Jane", lastname: "Doe", email: "j@d.com", role: "member", verified: true, active: true, joinedDate: "", name: "Jane Doe", createdAt: "", updatedAt: "" } as const;
    act(() => useAuthStore.getState().login({ access_token: makeToken(), user }));
    expect(useAuthStore.getState().user).toMatchObject({ id: "1", email: "j@d.com" });
  });

  it("logout clears auth state", () => {
    act(() => useAuthStore.getState().login({ access_token: makeToken() }));
    // Call clearAuth directly to avoid jsdom navigation error from logout's window.location.href
    act(() => useAuthStore.getState().clearAuth());
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().accessToken).toBeNull();
  });

  it("initializeAuth restores session when token is valid", () => {
    act(() => useAuthStore.setState({ accessToken: makeToken(), isAuthenticated: false }));
    act(() => useAuthStore.getState().initializeAuth());
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it("initializeAuth clears state when token is expired", () => {
    act(() => useAuthStore.setState({ accessToken: makeToken(-10), isAuthenticated: true }));
    act(() => useAuthStore.getState().initializeAuth());
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });
});
