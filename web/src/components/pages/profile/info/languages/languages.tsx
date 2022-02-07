import * as React from 'react';
import { useState } from 'react';
import { Localized } from '@fluent/react';

import { useAPI } from '../../../../../hooks/store-hooks';
import { DownIcon } from '../../../../ui/icons';
import { Button } from '../../../../ui/ui';
import { Accent, UserAccentLocale } from 'common';
import { useEffect } from 'react';

import InputLanguageAccents from './input-language-accents';
import InputLanguageName from './input-language-name';

export type AccentsAll = {
  [locale: string]: {
    default: Accent;
    userGenerated: { [id: string]: Accent };
    preset: { [id: string]: Accent };
  };
};

interface Props {
  languages: UserAccentLocale[];
  setLanguages: any;
}

function ProfileInfoLanguages({ languages, setLanguages }: Props) {
  const api = useAPI();
  const [accentsAll, setAccentsAll] = useState<AccentsAll>({});
  const [showAccentInfo, setShowAccentInfo] = useState(false);
  const [hasAccentDataLoaded, setHasAccentDataLoaded] = useState(false);
  const hasLanguages = languages.length > 0;
  const hasNewEmptyLanguage =
    hasLanguages && !languages[languages.length - 1].locale;

  useEffect(() => {
    if (hasAccentDataLoaded) {
      return;
    }

    api.getAccents().then(accents => {
      setAccentsAll(accents);
      setHasAccentDataLoaded(true);
    });
  }, []);

  if (!hasAccentDataLoaded) {
    return null;
  }

  return (
    <>
      <h2>Languages</h2>

      <div className="form-fields">
        {languages.map(({ locale, accents }) => (
          <div className="language-wrap" key={locale}>
            <InputLanguageName
              locale={locale}
              accentsAll={accentsAll}
              languages={languages}
              setLanguages={setLanguages}
            />

            <InputLanguageAccents
              locale={locale}
              accentsAll={accentsAll}
              accents={accents}
              languages={languages}
              setLanguages={setLanguages}
            />
          </div>
        ))}
      </div>

      <div>
        {hasLanguages && (
          <div
            className={'profile-toggle ' + (showAccentInfo ? 'expanded' : '')}>
            <button
              type="button"
              onClick={() => setShowAccentInfo(!showAccentInfo)}>
              <Localized id="help-accent">
                <span />
              </Localized>

              <DownIcon />
            </button>
            <Localized id="help-accent-explanation">
              <div className="explanation" />
            </Localized>
          </div>
        )}

        <Button
          className="add-language"
          outline
          disabled={hasNewEmptyLanguage}
          onClick={() => {
            if (hasNewEmptyLanguage) {
              return;
            }
            setLanguages(languages.concat({ locale: '', accents: [] }));
          }}>
          <Localized id="add-language">
            <span />
          </Localized>
          <span aria-hidden={true}>+</span>
        </Button>

        {!hasLanguages && (
          <Localized id="profile-select-language">
            <span className="no-languages" />
          </Localized>
        )}
      </div>
    </>
  );
}

export default ProfileInfoLanguages;
