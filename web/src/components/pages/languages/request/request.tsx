import * as React from 'react';
import { useState } from 'react';
import { Localized } from '@fluent/react';
import classNames from 'classnames';

import URLS from '../../../../urls';
import {
  LabeledCheckbox,
  LabeledInput,
  LabeledTextArea,
  StyledLink,
  Button,
} from '../../../ui/ui';

import './request.css';

const LanguagesRequestFormPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [languageInfoValue, setLanguageInfoValue] = useState('');
  const [privacyAgreedChecked, setPrivacyAgreedChecked] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    setEmailValue(event.target.value);
  };

  const handleLanguageInfoTextAreaChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    setLanguageInfoValue(event.target.value);
  };

  const handlePrivacyAgreedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    setPrivacyAgreedChecked(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('hello?');
    console.log({ event });
  };

  return (
    <div className="languages-request-page">
      <div className="languages-request-page-wrapper">
        <div className="languages-request-page__content">
          <h1>
            <Localized id="request-language-heading" />
          </h1>

          <Localized
            id="request-language-explanation-1"
            elems={{
              languagesPageLink: <StyledLink to={URLS.LANGUAGES} />,
              strong: <strong />,
            }}>
            <p />
          </Localized>

          <Localized
            id="request-language-explanation-2"
            elems={{ strong: <strong /> }}>
            <p />
          </Localized>

          <form
            className={classNames('languages-request-page__content__form', {
              'languages-request-page__content__form--errors': hasErrors,
            })}
            onSubmit={handleSubmit}>
            <p className="languages-request-page__content__form__required">
              <Localized id="indicates-required" />
            </p>

            <Localized id="request-language-form-email" attrs={{ label: true }}>
              <LabeledInput
                value={emailValue}
                onChange={handleEmailInputChange}
                required
                type="email"
              />
            </Localized>

            <p>
              <Localized id="request-language-form-info-explanation" />
            </p>

            <ul>
              <li>
                <Localized id="request-language-form-info-explanation-list-1" />
              </li>
              <Localized
                id="request-language-form-info-explanation-list-2"
                elems={{
                  isoCodeLink: (
                    <StyledLink href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" />
                  ),
                }}>
                <li />
              </Localized>
              <li>
                <Localized id="request-language-form-info-explanation-list-3" />
              </li>
            </ul>

            <Localized id="request-language-form-info" attrs={{ label: true }}>
              <LabeledTextArea
                value={languageInfoValue}
                onChange={handleLanguageInfoTextAreaChange}
                style={{ minHeight: '150px' }}
                required
              />
            </Localized>

            <LabeledCheckbox
              label={
                <Localized
                  id="accept-privacy"
                  elems={{ privacyLink: <StyledLink to={URLS.PRIVACY} /> }}>
                  <span />
                </Localized>
              }
              checked={privacyAgreedChecked}
              onChange={handlePrivacyAgreedChange}
              required
            />

            <Localized id="submit-form-action">
              <Button type="submit" rounded isBig />
            </Localized>
          </form>
        </div>

        <div className="languages-request-page__image">
          <img
            src={require('./images/mars-request.svg')}
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default LanguagesRequestFormPage;
