import * as React from 'react';
import { Localized } from '@fluent/react';

import { StyledLink } from '../../../ui/ui';

import './request.css';

const EMAIL_ADDRESS = 'commonvoice@mozilla.com';

const LanguagesRequestSuccessPage = () => {
  return (
    <div className="languages-request-page languages-request-page--success">
      <div className="languages-request-page-wrapper">
        <div className="languages-request-page__content">
          <h1>
            <Localized id="request-language-heading" />
          </h1>

          <h2>
            <Localized id="request-language-success-sub-heading" />
          </h2>

          <ul>
            <li>
              <Localized id="request-language-success-list-1" />
            </li>
            <li>
              <Localized id="request-language-success-list-2" />
            </li>

            <Localized
              id="request-language-success-list-3"
              elems={{
                emailLink: <StyledLink href={`mailto:${EMAIL_ADDRESS}`} />,
              }}
              vars={{ email: EMAIL_ADDRESS }}>
              <li />
            </Localized>
          </ul>
        </div>

        <div className="languages-request-page__image">
          <img
            src={require('./images/mars-email-success.svg')}
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default LanguagesRequestSuccessPage;
