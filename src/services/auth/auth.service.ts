import { useMutation } from '@tanstack/react-query';

import { makeFetch } from '../customFetch/customFetch';
import { ResponseType } from '../types';
import { LC_ACCESS_TOKEN, LC_EXP_TIME, LC_REFRESH_TOKEN } from '../../utils/constants';

type AuthPayload = {
  accessToken: string;
  refreshToken: string;
  rocketchatUserId: string;
  rocketchatAuthToken: string;
  exp: string;
};

const registration = (props: {
  email: string;
  password: string;
}): Promise<ResponseType<AuthPayload>> => {
  const body = JSON.stringify({ ...props });
  return makeFetch.post('registration', { body });
};

export function useRegistration(registrationCb?: () => void) {
  return useMutation({
    mutationKey: ['registration'],
    mutationFn: registration,
    onSuccess: (value) => {
      localStorage.setItem(LC_ACCESS_TOKEN, value.payload.accessToken);
      localStorage.setItem(LC_REFRESH_TOKEN, value.payload.refreshToken);
      localStorage.setItem(LC_EXP_TIME, value.payload.exp);

      if (registrationCb) {
        registrationCb();
      }
    },
  });
}

const login = (props: {
  email: string;
  password: string;
}): Promise<ResponseType<AuthPayload>> => {
  const body = JSON.stringify({ ...props });
  return makeFetch.post('login', { body });
};

export function useLogin(loginCb?: () => void) {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: (value) => {
      localStorage.setItem(LC_ACCESS_TOKEN, value.payload.accessToken);
      localStorage.setItem(LC_REFRESH_TOKEN, value.payload.refreshToken);
      localStorage.setItem(LC_EXP_TIME, value.payload.exp);

      if (loginCb) {
        loginCb();
      }
    },
  });
}