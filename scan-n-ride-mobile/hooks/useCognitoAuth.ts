import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest, exchangeCodeAsync, revokeAsync, ResponseType, AccessTokenRequestConfig, TokenResponse } from 'expo-auth-session';
import { Button, Alert } from 'react-native';
import * as AuthSession from "expo-auth-session";
import { jwtDecode } from 'jwt-decode';

WebBrowser.maybeCompleteAuthSession();

const clientId = 'skkm6pfae00h22p1bad6s1qlq';
const userPoolUrl = 'https://prod-scan-n-ride.auth.us-east-1.amazoncognito.com';
const redirectUri = AuthSession.makeRedirectUri({path: "/"});

export const useCognitoAuth = () => {
  const [authTokens, setAuthTokens] = React.useState<TokenResponse | null>(null);

  const discoveryDocument = React.useMemo(() => ({
    authorizationEndpoint: userPoolUrl + '/oauth2/authorize',
    tokenEndpoint: userPoolUrl + '/oauth2/token',
    revocationEndpoint: userPoolUrl + '/oauth2/revoke',
  }), []);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      responseType: ResponseType.Code,
      redirectUri,
      usePKCE: true,
    },
    discoveryDocument
  );

  React.useEffect(() => {
    const exchangeFn = async (exchangeTokenReq: any) => {
      try {
        const exchangeTokenResponse = await exchangeCodeAsync(
          exchangeTokenReq,
          discoveryDocument
        );
        setAuthTokens(exchangeTokenResponse);
      } catch (error) {
        console.error(error);
      }
    };
    if (response) {
      if (response.error) {
        Alert.alert(
          'Authentication error',
          response.params.error_description || 'something went wrong'
        );
        return;
      }
      if (response.type === 'success') {
        exchangeFn({
          clientId,
          code: response.params.code,
          redirectUri,
          extraParams: {
            code_verifier: request.codeVerifier,
          },
        });
      }
    }
  }, [discoveryDocument, request, response]);

  const logout = async () => {
    const revokeResponse = await revokeAsync(
      {
        clientId: clientId,
        token: authTokens.refreshToken,
      },
      discoveryDocument
    );
    if (revokeResponse) {
      setAuthTokens(null);
    }
  };

  const username = React.useMemo(() => {
    if(!authTokens) {
      return undefined;
    }
    const decoded = jwtDecode(authTokens?.accessToken)
    // @ts-ignore
    return decoded['username']
  }, [authTokens])

  return { 
    login: promptAsync, 
    logout,
    authTokens,
    username
  };
}
