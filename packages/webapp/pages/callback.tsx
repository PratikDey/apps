import { postWindowMessage } from '@dailydotdev/shared/src/lib/func';
import { AuthEvent } from '@dailydotdev/shared/src/lib/kratos';
import { ReactElement, useEffect } from 'react';
import usePersistentState from '@dailydotdev/shared/src/hooks/usePersistentState';
import usePersistentContext from '@dailydotdev/shared/src/hooks/usePersistentContext';

function CallbackPage(): ReactElement {
  const [authFlow, setAuthFlow] = usePersistentContext('auth-flow', null);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const eventKey = params.login
      ? AuthEvent.Login
      : AuthEvent.SocialRegistration;
    if (!window.opener && params.flow && params.settings) {
      const search = new URLSearchParams(params);
      window.location.replace(`/reset-password?${search}`);
      return;
    }

    // if (!window.opener) {
    console.log('no openeer');
    setAuthFlow(eventKey);
    // } else {
    postWindowMessage(eventKey, params);
    // }
    console.log('closing window??');
    window.close();
    window.open(window.location.href, '_self').close();
  }, []);

  return null;
}

export default CallbackPage;
