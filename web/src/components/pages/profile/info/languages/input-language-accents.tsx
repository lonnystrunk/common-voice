import * as React from 'react';
import {
  Localized,
  withLocalization,
  WithLocalizationProps,
} from '@fluent/react';
import Downshift from 'downshift';

import { LabeledInput } from '../../../../ui/ui';
import { AccentsAll } from './languages';
import { CloseIcon } from '../../../../ui/icons';
import { UserAccentLocale } from 'common';

// Types for Downshift haven't caught up yet. Can be removed in the future
const Input = LabeledInput as any;

function stateReducer(state: any, changes: any) {
  // this clears out the Downshift input upon selecting an accent
  switch (changes.type) {
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.clickItem:
      return {
        ...changes,
        inputValue: '',
      };
    default:
      return changes;
  }
}

interface AccentListProps {
  locale?: string;
  accents: Array<{ name: string }>; // TODO: fix
  removeAccent: any; // TODO: fix
}

const AccentList = ({ locale, accents, removeAccent }: AccentListProps) => {
  if (!locale || locale.length === 0) {
    return null;
  }

  return (
    <>
      {accents.map((accent, index) => {
        if (accent.name?.length === 0) {
          return null;
        }

        return (
          <span key={`accent-${index}`} className="selected-accent">
            <CloseIcon black onClick={() => removeAccent(locale, index)} />
            {accent.name}
          </span>
        );
      })}
    </>
  );
};

interface InputLanguageAccentsProps {
  locale: string;
  accentsAll: AccentsAll;
  accents: any; // TODO: fix
  languages: UserAccentLocale[];
  setLanguages: any;
}

const InputLanguageAccents = ({
  locale,
  accentsAll,
  accents,
  languages,
  setLanguages,
  getString,
}: InputLanguageAccentsProps & WithLocalizationProps) => {
  const removeAccent = (locale: string, accentIndex: number) => {
    const newLanguages = languages.slice();
    const languageIndex = newLanguages.findIndex(language => {
      return language.locale === locale;
    });
    newLanguages[languageIndex].accents.splice(accentIndex, 1);
    setLanguages(newLanguages);
  };

  const getAutocompleteAccents = (locale: string) => {
    return accentsAll[locale]
      ? Object.entries({
          ...accentsAll[locale].userGenerated,
          ...accentsAll[locale].preset,
        }).reduce((acc, [_, accent]) => {
          return acc.concat(accent);
        }, [])
      : [];
  };

  const updateCustomAccent = (accent: any, locale: string) => {
    const accentName = typeof accent === 'string' ? accent : accent.name;
    const accentId = typeof accent === 'string' ? null : accent.id;

    const newLanguages = languages.slice();
    const languageIndex = newLanguages.findIndex(language => {
      return language.locale === locale;
    });

    const accentExists =
      newLanguages[languageIndex].accents.filter(accentObj => {
        return accentObj.name === accentName;
      }).length > 0;

    if (accentExists) return;

    // if this is new custom accent, input value will be string
    // otherwise it will be Accent
    newLanguages[languageIndex] = {
      locale,
      accents: (newLanguages[languageIndex].accents || []).concat({
        name: accentName,
        id: accentId,
      }),
    };

    setLanguages(newLanguages);
  };

  return (
    <>
      <Localized id="profile-form-accent" attrs={{ label: true }} />
      <Downshift
        id="accent-selection"
        onChange={selection => {
          updateCustomAccent(selection, locale);
        }}
        stateReducer={stateReducer}
        itemToString={item => (item ? item.name : '')}>
        {({
          getInputProps,
          getItemProps,
          openMenu,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectItem,
        }) => {
          const clean = (text: string) => {
            return text ? text.trim().toLowerCase() : '';
          };

          const options = getAutocompleteAccents(locale).filter(item =>
            clean(item.name).includes(clean(inputValue))
          );

          return (
            <div>
              <Localized
                id="profile-form-custom-accent-help-text"
                attrs={{ label: true }}>
                <Input
                  disabled={locale.length === 0}
                  {...getInputProps({
                    onFocus: openMenu,
                    type: 'text',
                    value: inputValue || '',
                    onKeyDown: (e: any) => {
                      if (e.key === 'Enter') {
                        selectItem(e.target.value, {
                          type: Downshift.stateChangeTypes.keyDownEnter,
                        });
                      }
                    },
                  })}
                  placeholder={getString(
                    'profile-form-custom-accent-placeholder-2'
                  )}
                />
              </Localized>

              {isOpen ? (
                <ul
                  {...getMenuProps()}
                  className={isOpen ? 'downshift-open' : ''}>
                  {options.map((item, index) => (
                    <li
                      key={item.name}
                      {...getItemProps({
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index
                              ? 'var(--light-grey)'
                              : 'initial',
                        },
                      })}>
                      {item.name}
                    </li>
                  ))}
                  {inputValue?.length > 0 && options.length == 0 && (
                    <li
                      {...getItemProps({ item: inputValue })}
                      className="add-new-accent">
                      <Localized
                        id="profile-form-add-accent"
                        vars={{ inputValue }}
                      />
                    </li>
                  )}
                </ul>
              ) : null}
            </div>
          );
        }}
      </Downshift>

      <AccentList
        locale={locale}
        accents={accents}
        removeAccent={removeAccent}
      />
    </>
  );
};

export default withLocalization(InputLanguageAccents);
