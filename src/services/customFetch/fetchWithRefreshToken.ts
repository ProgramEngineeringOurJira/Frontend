import { LC_ACCESS_TOKEN, LC_REFRESH_TOKEN } from '../../utils/constants';
import dotenv from 'dotenv';
//dotenv.config();
export const redirectToStart = (): void => {
  const fromPath = encodeURIComponent(window.location.pathname);
  window.location.replace(`/event?fromPage=${fromPath}`);
};

export const baseUrl = import.meta.env.VITE_API_ENDPOINT;

const refresh = (accessToken: string | null, refreshToken: string | null) => {
  const body = JSON.stringify({
    accessToken,
    refreshToken,
  });

  return fetch(`${baseUrl}/refresh-token`, {
    method: 'POST',
    credentials: 'include',
    body,
  });
};

export const fetchWithRefreshToken = async (
  url: URL | RequestInfo,
  init?: RequestInit,
) => {
  let response = await fetch(url, init);

  if (response.status === 426) {
    try {
      const accessToken = localStorage.getItem(LC_ACCESS_TOKEN);
      const refreshToken = localStorage.getItem(LC_REFRESH_TOKEN);
      const refreshResponse = await refresh(accessToken, refreshToken);

      if (refreshResponse.status === 426 || refreshResponse.status === 400) {
        redirectToStart();
        localStorage.clear();
      } else {
        response = await fetch(url, init);
      }
    } catch (e) {
      localStorage.clear();
      // redirectToStart();
    }
  }

  return response;
};  