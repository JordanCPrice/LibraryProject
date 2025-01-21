const LOCAL_STORAGE_KEY = "loggedInUser";

export const saveUserToLocalStorage = (user: any) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
};

export const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : { userId: 0, email: "" };
};

export const clearUserFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
