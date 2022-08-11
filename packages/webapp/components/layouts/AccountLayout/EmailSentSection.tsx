import AlertContainer from '@dailydotdev/shared/src/components/alert/AlertContainer';
import { Button } from '@dailydotdev/shared/src/components/buttons/Button';
import React, { ReactElement } from 'react';

interface EmailSentSectionProps {
  onResend?: (e: React.MouseEvent) => void;
  onCancel?: (e: React.MouseEvent) => void;
}

function EmailSentSection({
  onResend,
  onCancel,
}: EmailSentSectionProps): ReactElement {
  return (
    <AlertContainer
      className={{
        container: 'mt-6 border-theme-status-warning',
        overlay: 'bg-overlay-quaternary-bun',
      }}
    >
      <p>
        We sent an email to verify your account. Please check your spam folder
        if you {`don't`} see the email.
      </p>
      <span className="flex flex-row gap-4 mt-4">
        {onResend && (
          <Button
            onClick={onResend}
            buttonSize="xsmall"
            className="w-fit btn-primary"
          >
            Resend
          </Button>
        )}
        {onCancel && (
          <Button
            onClick={onCancel}
            buttonSize="xsmall"
            className="w-fit btn-secondary"
          >
            Cancel Request
          </Button>
        )}
      </span>
    </AlertContainer>
  );
}

export default EmailSentSection;
