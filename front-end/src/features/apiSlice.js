import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut }  from '../features/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

 /* const baseQueryWithReauth = async (args, api, extraOptions) => {
     console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions)

    // If you want, handle other status codes, too
    if (result?.error?.status === 403) {
        console.log('sending refresh token')

        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

        if (refreshResult?.data) {

            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult
        }
    }

    return result
}*/


  /*const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    const { accessTokenExpiry } = api.getState().auth;
    if (Date.now() > accessTokenExpiry) {
        // O token expirou; tente atualizar.
        const refreshResult = await baseQuery({
            url: '/auth/refresh',
            method: 'POST',
            body: { refreshToken: api.getState().auth.refreshToken }
        }, api, extraOptions);

        if (refreshResult?.data && refreshResult?.meta?.response?.status === 200) {
            const { accessToken, refreshToken, expiresIn } = refreshResult.data;
            // Atualiza o estado com os novos tokens e a data de expiração
            api.dispatch(setCredentials({ accessToken, refreshToken, expiresIn }));

            // Tenta a requisição original novamente com o novo token
            result = await baseQuery(args, api, { ...extraOptions, headers: { Authorization: `Bearer ${accessToken}` } });
        } else {
            // Falha ao atualizar o token; deslogar o usuário.
            // Isso pode ser ajustado para tratar diferentes códigos de status, se necessário.
            api.dispatch(logOut());
        }
    }

    return result;
};*/

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Verifica se o resultado contém um erro de autorização (ex: 401 Unauthorized)
  if (result.error && result.error.status === 401) {
    // Tenta obter um novo accessToken usando o refreshToken
    const refreshResult = await baseQuery({
      url: '/auth/refresh',
      method: 'POST',
      body: {}
    }, api, extraOptions);

    if (refreshResult?.data) {
      const { accessToken, refreshToken, expiresIn } = refreshResult.data;
      // Atualiza o estado com os novos tokens
      api.dispatch(setCredentials({ accessToken, refreshToken, expiresIn }));

      // Repete a requisição original com o novo accessToken
      result = await baseQuery({
        ...args,
        headers: {
          ...args.headers,
          'Authorization': `Bearer ${accessToken}`
        }
      }, api, extraOptions);
    } else {
      // Falha ao atualizar o token, possivelmente deslogar o usuário
      api.dispatch(logOut());
    }
  }

  return result;
};

/*const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
  
    // Verifica se a requisição falhou devido a um token de acesso expirado.
    if (result.error && result.error.status === 401) {
      // Aqui, ao invés de tentar renovar o token, simplesmente deslogamos o usuário.
      api.dispatch(logOut());
    }
  
    return result;
  };*/

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Serie', 'User', 'Workout'],
    endpoints: builder => ({})
})