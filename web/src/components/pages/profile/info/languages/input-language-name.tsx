import * as React from 'react';
import { Localized } from '@fluent/react';

import { LabeledSelect } from '../../../../ui/ui';
import { NATIVE_NAMES } from '../../../../../services/localization';
import { UserAccentLocale } from 'common';
import { AccentsAll } from './languages';

interface InputLanguageNameProps {
  locale: string;
  accentsAll: AccentsAll;
  languages: UserAccentLocale[];
  setLanguages: any;
}

const InputLanguageName = ({
  locale,
  accentsAll,
  languages,
  setLanguages,
}: InputLanguageNameProps) => {
  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguages = languages.slice();
    const languageIndex = newLanguages.findIndex(language => {
      return language.locale === locale;
    });

    newLanguages[languageIndex] = {
      locale: value,
      accents: accentsAll[value] ? [accentsAll[value]?.default] : [],
    };

    if (!value) {
      newLanguages.splice(languageIndex, 1);
    }

    setLanguages(
      newLanguages.filter(({ locale }, index) => {
        return index === languageIndex || locale !== value;
      })
    );
  };

  return (
    <Localized id="profile-form-language" attrs={{ label: true }}>
      <LabeledSelect value={locale} onChange={handleChange}>
        <option value="" />
        {Object.entries(NATIVE_NAMES).map(([locale, name]) => (
          <option key={locale} value={locale}>
            {name}
          </option>
        ))}
      </LabeledSelect>
    </Localized>
  );
};

export default InputLanguageName;
