export const generateUniqueUserId = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const storeUserNickname = (userId: string) => {
  localStorage.setItem('kalakartta-userId', userId);
};

export const getUserNickname = () => {
  return localStorage.getItem('kalakartta-userId');
};
