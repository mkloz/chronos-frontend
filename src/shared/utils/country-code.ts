import ky from 'ky';
import { toast } from 'sonner';

export enum CountryCode {
  ALBANIA = 'AL',
  ANDORRA = 'AD',
  ARGENTINA = 'AR',
  ARMENIA = 'AM',
  AUSTRALIA = 'AU',
  AUSTRIA = 'AT',
  BAHAMAS = 'BS',
  BARBADOS = 'BB',
  BELARUS = 'BY',
  BELGIUM = 'BE',
  BELIZE = 'BZ',
  BENIN = 'BJ',
  BOLIVIA = 'BO',
  BOSNIA_AND_HERZEGOVINA = 'BA',
  BOTSWANA = 'BW',
  BRAZIL = 'BR',
  BULGARIA = 'BG',
  CANADA = 'CA',
  CHILE = 'CL',
  CHINA = 'CN',
  COLOMBIA = 'CO',
  COSTA_RICA = 'CR',
  CROATIA = 'HR',
  CUBA = 'CU',
  CYPRUS = 'CY',
  CZECHIA = 'CZ',
  DENMARK = 'DK',
  DOMINICAN_REPUBLIC = 'DO',
  ECUADOR = 'EC',
  EGYPT = 'EG',
  EL_SALVADOR = 'SV',
  ESTONIA = 'EE',
  FAROE_ISLANDS = 'FO',
  FINLAND = 'FI',
  FRANCE = 'FR',
  GABON = 'GA',
  GAMBIA = 'GM',
  GEORGIA = 'GE',
  GERMANY = 'DE',
  GIBRALTAR = 'GI',
  GREECE = 'GR',
  GREENLAND = 'GL',
  GRENADA = 'GD',
  GUATEMALA = 'GT',
  GUERNSEY = 'GG',
  GUYANA = 'GY',
  HAITI = 'HT',
  HONDURAS = 'HN',
  HONG_KONG = 'HK',
  HUNGARY = 'HU',
  ICELAND = 'IS',
  INDONESIA = 'ID',
  IRELAND = 'IE',
  ISLE_OF_MAN = 'IM',
  ITALY = 'IT',
  JAMAICA = 'JM',
  JAPAN = 'JP',
  JERSEY = 'JE',
  KAZAKHSTAN = 'KZ',
  LATVIA = 'LV',
  LESOTHO = 'LS',
  LIECHTENSTEIN = 'LI',
  LITHUANIA = 'LT',
  LUXEMBOURG = 'LU',
  MADAGASCAR = 'MG',
  MALTA = 'MT',
  MEXICO = 'MX',
  MOLDOVA = 'MD',
  MONACO = 'MC',
  MONGOLIA = 'MN',
  MONTENEGRO = 'ME',
  MONTSERRAT = 'MS',
  MOROCCO = 'MA',
  MOZAMBIQUE = 'MZ',
  NAMIBIA = 'NA',
  NETHERLANDS = 'NL',
  NEW_ZEALAND = 'NZ',
  NICARAGUA = 'NI',
  NIGER = 'NE',
  NIGERIA = 'NG',
  NORTH_MACEDONIA = 'MK',
  NORWAY = 'NO',
  PANAMA = 'PA',
  PAPUA_NEW_GUINEA = 'PG',
  PARAGUAY = 'PY',
  PERU = 'PE',
  PHILIPPINES = 'PH',
  POLAND = 'PL',
  PORTUGAL = 'PT',
  PUERTO_RICO = 'PR',
  ROMANIA = 'RO',
  RUSSIA = 'RU',
  SAN_MARINO = 'SM',
  SERBIA = 'RS',
  SINGAPORE = 'SG',
  SLOVAKIA = 'SK',
  SLOVENIA = 'SI',
  SOUTH_AFRICA = 'ZA',
  SOUTH_KOREA = 'KR',
  SPAIN = 'ES',
  SURINAME = 'SR',
  SVALBARD_AND_JAN_MAYEN = 'SJ',
  SWEDEN = 'SE',
  SWITZERLAND = 'CH',
  TUNISIA = 'TN',
  TURKEY = 'TR',
  UKRAINE = 'UA',
  UNITED_KINGDOM = 'GB',
  UNITED_STATES = 'US',
  URUGUAY = 'UY',
  VATICAN_CITY = 'VA',
  VENEZUELA = 'VE',
  VIETNAM = 'VN',
  ZIMBABWE = 'ZW',
  ALAND_ISLANDS = 'AX'
}
const COUNTRY_CODE_API = 'https://ipapi.co/json/';

interface CountryCodeResponse {
  country_code: CountryCode | null;
}

export const getMyCountryCode = async (): Promise<CountryCode | string | null> => {
  try {
    const response = await ky<CountryCodeResponse>(COUNTRY_CODE_API).json();
    if (!response.country_code) {
      toast.error('Failed to fetch country code');
      return null;
    }
    return response.country_code || null;
  } catch (error) {
    return null;
  }
};
