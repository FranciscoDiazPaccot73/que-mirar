export const useLocalStorage = () => {
  const storage = {
    set: (key: string, value: any) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    get: (key: string) => {
      const value = localStorage.getItem(key);

      return value ? JSON.parse(value) : null;
    }
  }

  return { storage }
}