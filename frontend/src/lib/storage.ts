/**
 * Typed wrapper around localStorage with JSON serialization and SSR safety
 */

export interface StorageOptions {
  defaultValue?: any;
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
}

class Storage {
  private isClient = typeof window !== "undefined";

  /**
   * Get a value from localStorage
   */
  get<T = any>(key: string, options: StorageOptions = {}): T | null {
    if (!this.isClient) {
      return options.defaultValue ?? null;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return options.defaultValue ?? null;
      }

      const deserialize = options.deserialize || JSON.parse;
      return deserialize(item);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return options.defaultValue ?? null;
    }
  }

  /**
   * Set a value in localStorage
   */
  set<T = any>(key: string, value: T, options: StorageOptions = {}): boolean {
    if (!this.isClient) {
      return false;
    }

    try {
      const serialize = options.serialize || JSON.stringify;
      window.localStorage.setItem(key, serialize(value));
      return true;
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
      return false;
    }
  }

  /**
   * Remove a value from localStorage
   */
  remove(key: string): boolean {
    if (!this.isClient) {
      return false;
    }

    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  }

  /**
   * Clear all localStorage data
   */
  clear(): boolean {
    if (!this.isClient) {
      return false;
    }

    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.warn("Error clearing localStorage:", error);
      return false;
    }
  }

  /**
   * Check if a key exists in localStorage
   */
  has(key: string): boolean {
    if (!this.isClient) {
      return false;
    }

    return window.localStorage.getItem(key) !== null;
  }

  /**
   * Get all keys from localStorage
   */
  keys(): string[] {
    if (!this.isClient) {
      return [];
    }

    return Object.keys(window.localStorage);
  }

  /**
   * Get the number of items in localStorage
   */
  length(): number {
    if (!this.isClient) {
      return 0;
    }

    return window.localStorage.length;
  }
}

// Export singleton instance
export const storage = new Storage();

// Export individual methods for convenience
export const { get, set, remove, clear, has, keys, length } = storage;