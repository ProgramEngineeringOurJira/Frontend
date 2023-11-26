import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import HttpService from '../services/main.services';

export type SendRequestReturnT = ReturnType<typeof useSendRequest>;

export const useSendRequest = (cb: (data?: any) => void, endpoint: string, formData?: boolean) => {
  const [queryResult, setQueryResult] = React.useState<string | null>(null);

  const {
    isPending,
    mutate: sendRequest,
    isError,
    isSuccess
  } = useMutation<AxiosResponse<any> | undefined, AxiosError, any>(
    
    {
      mutationFn: async(data) => {
        
          setQueryResult(null);
    
          return await HttpService.post(data, endpoint, formData);
        
      },

      onSuccess: (res) => {
        setQueryResult(res!.data);
        cb(res!.data);
      },
      onError: (err: AxiosError) => {
        setQueryResult(err.message);
      }
    }
  );

  return { queryResult, isLoading: isPending, sendRequest, isError, isSuccess };
};
