'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const COOKIE_EXPIRATION_DAYS = 90;

export const GoogleOneTapContext = createContext({ userData: null });

GoogleOneTapContext.displayName = 'GoogleOneTapContext';

const useGoogleOneTap = () => useContext(GoogleOneTapContext);

const GoogleOneTapProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => handleGoogleOneTap(), 2000);
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Essa função irá chamar os endpoints da Exame para fazer o login
  // Setei esse cookie one_tap apenas para simular o login
  const oneTapLogin = data => {
    const { token } = data;

    Cookies.set('one_tap', token, {
      expires: COOKIE_EXPIRATION_DAYS,
      path: '',
    });

    return jwtDecode(token);
  };

  const handleGoogleOneTap = () => {
    const isOneTapLogged = Cookies.get('one_tap');

    if (isOneTapLogged) {
      setUserData(jwtDecode(isOneTapLogged));
      return;
    }

    const { google } = window;

    if (google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: async response => {
          // Here we call our Provider with the token provided by google
          setGoogleOneTapToken(response.credential);
        },
      });

      // Aqui exibimos um console.log com algumas situações de erro ou alertas
      // e tratar possíveis erros no google one tap
      // google.accounts.id.prompt() => Exibe o prompt do Google One Tap sem printar nada no console
      google.accounts.id.prompt(notification => {
        console.log('🚀 ~ oneTap ~ notification:', notification);
        if (notification.isNotDisplayed()) {
          console.log(
            'getNotDisplayedReason ::',
            notification.getNotDisplayedReason(),
          );
          return;
        }

        if (notification.isSkippedMoment()) {
          console.log('getSkippedReason  ::', notification.getSkippedReason());
          return;
        }

        if (notification.isDismissedMoment()) {
          console.log(
            'getDismissedReason ::',
            notification.getDismissedReason(),
          );
          return;
        }
      });
    }
  };

  // Aqui recebemos o token do google e passamos pra função que irá chamar o endpoint de login
  const setGoogleOneTapToken = async token => {
    try {
      const response = await oneTapLogin({
        token,
      });

      setUserData(response);
    } catch (error) {
      console.error('🚀 ~ call ~ error:', error);
    }
  };

  return (
    <GoogleOneTapContext.Provider value={{ userData }}>
      {children}
    </GoogleOneTapContext.Provider>
  );
};

export default GoogleOneTapProvider;

export { useGoogleOneTap };
