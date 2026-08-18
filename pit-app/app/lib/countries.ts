import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'

countries.registerLocale(en)

export const countryCodes = Object.keys(countries.getAlpha2Codes()) as [string, ...string[]]

export const countryOptions = countries.getNames('en', { select: 'official' })
// NL: Netherlands, USA: United States of America
