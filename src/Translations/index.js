import i18n from 'react-native-i18n';
import en from './en';
import pl from './pl';

i18n.fallbacks = true;
i18n.missingTranslationPrefix = 'x';
i18n.translations = {
	"en": en,
	"pl": pl
};

export default i18n;
