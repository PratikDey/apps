import { Provider } from '@dailydotdev/shared/src/components/auth/common';
import ProviderButton from '@dailydotdev/shared/src/components/auth/ProviderButton';
import React, { ReactElement, ReactNode } from 'react';
import AccountContentSection from '../AccountContentSection';

interface AccountLoginSectionProps {
  providers: Provider[];
  title: string;
  description: string;
  action?: ReactNode;
}

function AccountLoginSection({
  providers,
  title,
  description,
  action,
}: AccountLoginSectionProps): ReactElement {
  return (
    <AccountContentSection title={title} description={description}>
      <div className="grid grid-cols-1 gap-4 mt-6 w-64">
        {providers.map(({ provider, ...rest }) => (
          <ProviderButton
            key={provider}
            label="Connect with"
            provider={provider}
            {...rest}
          />
        ))}
        {action}
      </div>
    </AccountContentSection>
  );
}

export default AccountLoginSection;
