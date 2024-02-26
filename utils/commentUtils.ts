export const generateUniqueUserId = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const storeUserId = (userId: string) => {
  localStorage.setItem('kalapaikka-userId', userId);
};

export const getUserId = () => {
  return localStorage.getItem('kalapaikka-userId');
};
