import { useMutation } from '@tanstack/react-query';

import { ResponseType } from '../types';

import { makeFetch } from '../customFetch/customFetch';

export interface User {
  firstName?: string;
  lastName?: string;
  imageUrl: string;
  city: string;
  district: string;
  birthdate: string;
}

const getProfile = (): Promise<ResponseType<User>> => {
  return makeFetch.get('profile');
};

export function useProfile({ cb }: { cb: (user: User) => void }) {
  return useMutation({
    mutationFn: getProfile,
    onSuccess: (payload: ResponseType<User>) => {
      cb(payload.payload);
    }
  });
}
