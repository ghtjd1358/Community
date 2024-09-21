import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query를 사용해 검색 API 생성
export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    fetchSearch: builder.query({
      query: ({ query, type }) => `get/search?query=${query}&type=${type}`, // API 경로 설정
    }),
  }),
});

export const { useFetchSearchQuery } = searchApi;
