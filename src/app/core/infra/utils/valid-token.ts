import * as jose from "jose";

const isTokenValid = (token: string): boolean => {
  if (!token) return false;

  const decodedToken = jose.decodeJwt(token) as { exp: number } | null;

  if (!decodedToken) return false;

  const now = new Date().getTime();
  return decodedToken.exp * 1000 > now;
};

export default isTokenValid;
