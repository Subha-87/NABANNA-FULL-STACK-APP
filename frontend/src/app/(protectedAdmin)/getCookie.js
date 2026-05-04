export const getClientSideCookie = (Auth) => {
  if (typeof document === 'undefined') {
    return undefined; // Handle server-side rendering gracefully
  }

  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${Auth}=`))
    ?.split('=')[1];

  return cookieValue;
};
