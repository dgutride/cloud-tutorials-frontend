import React from 'react';
import { KeycloakInstance, KeycloakProfile } from 'keycloak-js';
import { getKeyCloakToken, getParsedKeyCloakToken } from '@app/auth/keycloak/keycloakAuth';
import { AuthContext, IAuthContext } from '@app/auth/AuthContext';

// This is a context which can manage the keycloak
export interface IKeycloakContext {
  keycloak?: KeycloakInstance | undefined
  profile?: KeycloakProfile | undefined
}

export const KeycloakContext = React.createContext<IKeycloakContext>({ keycloak: undefined });

export const KeycloakAuthProvider = (props) => {

  const getUsername = () => {
    return getParsedKeyCloakToken().then(token => token['username']);
  }

  const authTokenContext = {
    getToken: getKeyCloakToken,
    getUsername: getUsername
  } as IAuthContext;
  return (
    <AuthContext.Provider value={authTokenContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
