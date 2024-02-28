// src/localization/i18n.js
import * as RNLocalize from 'react-native-localize';
import {I18n} from 'i18n-js';
import translation from './index'

const i18n = new I18n(translation)

i18n.translations = translation;
i18n.locale = RNLocalize.getLocales()[0].languageCode;
i18n.fallbacks = true;

export default i18n;
