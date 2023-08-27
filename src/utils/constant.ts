import TickGreen from '/@/assets/svg/tick-green.svg';
import IconCloseRed from '/@/assets/svg/close-red.svg';
import eyesYellow from '/@/assets/svg/eyes-yellow.svg';
import { SITE_CONFIG } from './siteConfig';

export const FORMAT_TIME = {
  FULL: 'YYYY-MM-DD HH:mm',
  DATE: 'MMMM D, YYYY',
};

export const SITE = { ...SITE_CONFIG };
export const LIST_TYPE_ADMIN = {
  1: {
    label: 'USER',
    key: 'USER',
    value: 'USER',
  },
  2: {
    label: 'VIEWER',
    key: 'VIEWER',
    value: 'VIEWER',
  },
  3: {
    label: 'SUPER ADMIN',
    key: 'SUPER_ADMIN',
    value: 'SUPER_ADMIN',
  },
  4: {
    label: 'BLOG MANAGER',
    key: 'BLOG_MANAGER',
    value: 'BLOG_MANAGER',
  },
  5: {
    label: 'USER MANAGER',
    key: 'USER_MANAGER',
    value: 'USER_MANAGER',
  },
  6: {
    label: 'TRANS MANAGER',
    key: 'TRANS_MANAGER',
    value: 'TRANS_MANAGER',
  },
};

export const LIST_CHAIN = {
  '0x0': {
    chainId: '0x0',
    name: 'Bitcoin Network',
    supported: 1,
    home: 'https://www.blockchain.com/explorer/assets/BTC',
    explorer: 'https://www.blockchain.com/explorer/transactions/btc/',
  },
  '0x1': {
    chainId: '0x1',
    name: 'Ethereum (ERC-20)',
    icon: '/icon/etherscan.png',
    supported: 3,
    home: 'https://etherscan.io',
    explorer: 'https://etherscan.io/tx/',
  },
  '0x38': {
    chainId: '0x38',
    name: 'BSC (BEP-20)',
    supported: 7,
    home: 'https://bscscan.com',
    explorer: 'https://bscscan.com/tx/',
  },
  '0x89': {
    chainId: '0x89',
    name: 'Polygon (MATIC)',
    supported: 0,
    home: 'https://polygonscan.com',
    explorer: 'https://polygonscan.com/tx/',
  },
};

export const LIST_TYPE_TRANSACTION_OBJECT = {
  deposit: {
    label: 'Deposit',
    value: 'deposit',
    key: 'deposit',
    color: '#00C566',
  },
  withdraw: {
    label: 'Withdraw',
    value: 'withdraw',
    key: 'withdraw',
    color: '#FF4747',
  },
  commission: {
    label: 'Commission',
    value: 'commission',
    key: 'commission',
    color: '#4188F1',
  },
  cashback: {
    label: 'Cashback',
    value: 'cashback',
    key: 'cashback',
    color: '#FACC15',
  },
  bonus: {
    label: 'Bonus',
    value: 'bonus',
    key: 'bonus',
    color: '#4188F1',
  },

  pending: {
    label: 'Pending',
    value: 'pending',
    key: 'pending',
    color: '#ffd700',
  },
  handling: {
    label: 'Handling',
    value: 'handling',
    key: 'handling',
    color: '#ffd700',
  },
  executing: {
    label: 'Executing',
    value: 'executing',
    key: 'executing',
    color: '#0072ce',
  },
  reward: {
    label: 'Reward',
    value: 'reward',
    key: 'reward',
    color: '#ffd700',
  },
  swap: {
    label: 'Swap',
    value: 'swap',
    key: 'swap',
    color: '#ffd700',
  },
  error: {
    label: 'Error',
    value: 'error',
    key: 'error',
    color: '#ed2939',
  },
};

export const LIST_TYPE_TRANSACTION_ARRAY = [
  {
    label: 'All',
    value: '',
    key: '',
  },
  {
    label: 'Deposit',
    value: 'deposit',
    key: 'deposit',
  },
  {
    label: 'Bonus',
    value: 'bonus',
    key: 'bonus',
  },
  {
    label: 'Withdraw',
    value: 'withdraw',
    key: 'withdraw',
  },
  {
    label: 'Pending Withdraw',
    value: 'pending',
    key: 'pending',
  },
  {
    label: 'Reward',
    value: 'reward',
    key: 'reward',
  },
  {
    label: 'Commission',
    value: 'commission',
    key: 'commission',
  },
  {
    label: 'Cashback',
    value: 'cashback',
    key: 'cashback',
  },
];

export const LIST_TYPE_STATUS_OBJECT = {
  success: {
    label: 'Success',
    value: 'success',
    key: 'success',
    color: '#00C566',
  },
  pending: {
    label: 'Pending',
    value: 'pending',
    key: 'pending',
    color: '#FACC15',
  },
  reject: {
    label: 'Rejected',
    value: 'rejected',
    key: 'rejected',
    color: '#FF4747',
  },
  executing: {
    label: 'Executing',
    value: 'executing',
    key: 'executing',
    color: '#9597B1',
  },
  handling: {
    label: 'Handling',
    value: 'handling',
    key: 'handling',
    color: '#FACC15',
  },
};

export const LIST_TYPE_STATUS_CASHBACK = {
  PAID: {
    label: 'Paid',
    value: 'paid',
    key: 'success',
    color: '#00C566',
  },
  REJECTED: {
    label: 'Rejected',
    value: 'rejected',
    key: 'rejected',
    color: '#FACC15',
  },
  PENDING: {
    label: 'Pending',
    value: 'pending',
    key: 'pending',
    color: '#006fb9',
  },
};

export const LIST_TYPE_STATUS_ARRAY = [
  {
    label: 'All',
    value: '',
    key: '',
  },
  {
    label: 'Success',
    value: 'success',
    key: 'success',
  },
  {
    label: 'Pending',
    value: 'pending',
    key: 'pending',
  },
  {
    label: 'Error',
    value: 'error',
    key: 'error',
  },
  {
    label: 'Executing',
    value: 'executing',
    key: 'executing',
  },
];

export const LIST_TYPE_RANK_ARRAY = [
  {
    label: 'All',
    value: '',
    key: '',
    dailyLimit: 100,
    maxAmount: 5.5,
    minAmount: 0.00001,
    cashback: 0,
  },
  {
    label: 'Default',
    value: 'default',
    key: 'default',
    dailyLimit: 100,
    maxAmount: 5,
    minAmount: 0.00001,
    cashback: 20,
  },
  {
    label: 'Diamond',
    value: 'diamond',
    key: 'diamond',
    dailyLimit: 100,
    maxAmount: 5,
    minAmount: 0.00001,
    cashback: 20,
  },
  {
    label: 'Vip5',
    value: 'vip5',
    key: 'vip5',
    dailyLimit: 100,
    maxAmount: 5,
    minAmount: 0.00001,
    cashback: 20,
  },
  {
    label: 'VipMax',
    value: 'vipMax',
    key: 'vipMax',
    dailyLimit: 100,
    maxAmount: 5,
    minAmount: 0.00001,
    cashback: 20,
  },
];
import SymbolSbg from '/@/assets/image-mock/sbg-symbol.png';
export const LIST_TOKEN_FAKE_ARRAY = [
  {
    label: 'SBG',
    value: 'sbg',
    key: 'sbg',
    icon: SymbolSbg,
  },
  {
    label: 'BTC',
    value: 'btc',
    key: 'btc',
    icon: SymbolSbg,
  },
  {
    label: 'ETH',
    value: 'eth',
    key: 'eth',
    icon: SymbolSbg,
  },
];

export const LIST_TYPE_TRANSACTION_ARRAY_1 = [
  {
    label: 'All',
    value: '',
    key: '',
  },
  {
    label: 'Deposit',
    value: 'deposit',
    key: 'deposit',
  },
  {
    label: 'Withdraw',
    value: 'withdraw',
    key: 'withdraw',
  },
  {
    label: 'Commission',
    value: 'commission',
    key: 'commission',
  },
  {
    label: 'Cashback',
    value: 'cashback',
    key: 'cashback',
  },
  {
    label: 'Bonus',
    value: 'bonus',
    key: 'bonus',
  },
];

export const LIST_TYPE_TRANSACTION_OBJECT_1 = {
  deposit: {
    label: 'Deposit',
    value: 'deposit',
    key: 'deposit',
    color: '#00C566',
  },
  withdraw: {
    label: 'Withdraw',
    value: 'withdraw',
    key: 'withdraw',
    color: '#FF4747',
  },
  commission: {
    label: 'Commission',
    value: 'commission',
    key: 'commission',
    color: '#4188F1',
  },
  cashback: {
    label: 'Cashback',
    value: 'cashback',
    key: 'cashback',
    color: '#FACC15',
  },
  bonus: {
    label: 'Bonus',
    value: 'bonus',
    key: 'bonus',
    color: '#4188F1',
  },
};

export const LIST_TYPE_PROMOTION = [
  {
    label: 'All',
    value: '',
    key: '',
  },
  {
    label: 'Link',
    value: 'link',
    key: 'link',
  },
  {
    label: 'Promotion',
    value: 'promotion',
    key: 'promotion',
  },
  {
    label: 'News',
    value: 'news',
    key: 'news',
  },
];

export const LIST_TYPE_PROMOTION_NO_ALL = [
  {
    label: 'Link',
    value: 'link',
    key: 'link',
  },
  {
    label: 'Promotion',
    value: 'promotion',
    key: 'promotion',
  },
  {
    label: 'News',
    value: 'news',
    key: 'news',
  },
];

export const LIST_TYPE_PROMOTION_OBJECT = {
  link: {
    label: 'Link',
    value: 'link',
    key: 'link',
  },
  promotion: {
    label: 'Promotion',
    value: 'promotion',
    key: 'promotion',
  },
  news: {
    label: 'News',
    value: 'news',
    key: 'news',
  },
};

export const LIST_TYPE_DISPLAY_PROMOTION = [
  {
    label: 'BANNER TITLE DESC',
    value: 'BANNER_TITLE_DESC',
    key: 'BANNER_TITLE_DESC',
  },
  {
    label: 'BANNER TITLE',
    value: 'BANNER_TITLE',
    key: 'BANNER_TITLE',
  },
];

export const LIST_ROLE_ADMIN_OBJECT = {
  superAdmin: {
    label: 'Supper Admin',
    value: 'supperAdmin',
    key: 'supperAdmin',
  },
  normalAdmin: {
    label: 'Normal Admin',
    value: 'normalAdmin',
    key: 'normalAdmin',
  },
};

export const LIST_ROLE_ICON_ADMIN = {
  1: eyesYellow,
  2: TickGreen,
  0: IconCloseRed,
};

export const LIST_ROLE_USER_ACCESS = [
  {
    label: 'Player',
    value: 1,
  },
  {
    label: 'Supervisor',
    value: 2,
  },
  {
    label: 'Super Admin',
    value: 3,
  },
  {
    label: 'Promotion manager',
    value: 4,
  },
  {
    label: 'User manager',
    value: 5,
  },
  {
    label: 'Transaction manager',
    value: 6,
  },
];

export const countryCodeList = [
  {
    code: '',
    Name: 'All',
    code_number: 'all',
  },
  {
    code: 'GB',
    Name: 'United Kingdom',
    code_number: 44,
  },
  {
    code: 'AF',
    Name: 'Afghanistan',
    code_number: 93,
  },
  {
    code: 'AL',
    Name: 'Albania',
    code_number: 355,
  },
  {
    code: 'DZ',
    Name: 'Algeria',
    code_number: 213,
  },
  {
    code: 'AS',
    Name: 'American Samoa',
    code_number: '1-684',
  },
  {
    code: 'AD',
    Name: 'Andorra',
    code_number: 376,
  },
  {
    code: 'AO',
    Name: 'Angola',
    code_number: 244,
  },
  {
    code: 'AI',
    Name: 'Anguilla',
    code_number: '1-264',
  },
  {
    code: 'AQ',
    Name: 'Antarctica',
    code_number: 672,
  },
  {
    code: 'AG',
    Name: 'Antigua and Barbuda',
    code_number: '1-268',
  },
  {
    code: 'AR',
    Name: 'Argentina',
    code_number: 54,
  },
  {
    code: 'AM',
    Name: 'Armenia',
    code_number: 374,
  },
  {
    code: 'AW',
    Name: 'Aruba',
    code_number: 297,
  },
  {
    code: 'AU',
    Name: 'Australia',
    code_number: 61,
  },
  {
    code: 'AT',
    Name: 'Austria',
    code_number: 43,
  },
  {
    code: 'AZ',
    Name: 'Azerbaijan',
    code_number: 994,
  },
  {
    code: 'BS',
    Name: 'Bahamas',
    code_number: '1-242',
  },
  {
    code: 'BH',
    Name: 'Bahrain',
    code_number: 973,
  },
  {
    code: 'BD',
    Name: 'Bangladesh',
    code_number: 880,
  },
  {
    code: 'BB',
    Name: 'Barbados',
    code_number: '1-246',
  },
  {
    code: 'BY',
    Name: 'Belarus',
    code_number: 375,
  },
  {
    code: 'BE',
    Name: 'Belgium',
    code_number: 32,
  },
  {
    code: 'BZ',
    Name: 'Belize',
    code_number: 501,
  },
  {
    code: 'BJ',
    Name: 'Benin',
    code_number: 229,
  },
  {
    code: 'BM',
    Name: 'Bermuda',
    code_number: '1-441',
  },
  {
    code: 'BT',
    Name: 'Bhutan',
    code_number: 975,
  },
  {
    code: 'BO',
    Name: 'Bolivia',
    code_number: 591,
  },
  {
    code: 'BA',
    Name: 'Bosnia and Herzegovina',
    code_number: 387,
  },
  {
    code: 'BW',
    Name: 'Botswana',
    code_number: 267,
  },
  {
    code: 'BR',
    Name: 'Brazil',
    code_number: 55,
  },
  {
    code: 'IO',
    Name: 'British Indian Ocean Territory',
    code_number: 246,
  },
  {
    code: 'VG',
    Name: 'British Virgin Islands',
    code_number: '1-284',
  },
  {
    code: 'BN',
    Name: 'Brunei',
    code_number: 673,
  },
  {
    code: 'BG',
    Name: 'Bulgaria',
    code_number: 359,
  },
  {
    code: 'BF',
    Name: 'Burkina Faso',
    code_number: 226,
  },
  {
    code: 'MM',
    Name: 'Myanmar',
    code_number: 95,
  },
  {
    code: 'BI',
    Name: 'Burundi',
    code_number: 257,
  },
  {
    code: 'KH',
    Name: 'Cambodia',
    code_number: 855,
  },
  {
    code: 'CM',
    Name: 'Cameroon',
    code_number: 237,
  },
  {
    code: 'CA',
    Name: 'Canada',
    code_number: 1,
  },
  {
    code: 'CV',
    Name: 'Cape Verde',
    code_number: 238,
  },
  {
    code: 'KY',
    Name: 'Cayman Islands',
    code_number: '1-345',
  },
  {
    code: 'CF',
    Name: 'Central African Republic',
    code_number: 236,
  },
  {
    code: 'TD',
    Name: 'Chad',
    code_number: 235,
  },
  {
    code: 'CL',
    Name: 'Chile',
    code_number: 56,
  },
  {
    code: 'CN',
    Name: 'China',
    code_number: 86,
  },
  {
    code: 'CX',
    Name: 'Christmas Island',
    code_number: 61,
  },
  {
    code: 'CC',
    Name: 'Cocos Islands',
    code_number: 61,
  },
  {
    code: 'CO',
    Name: 'Colombia',
    code_number: 57,
  },
  {
    code: 'KM',
    Name: 'Comoros',
    code_number: 269,
  },
  {
    code: 'CG',
    Name: 'Republic of the Congo',
    code_number: 242,
  },
  {
    code: 'CD',
    Name: 'Democratic Republic of the Congo',
    code_number: 243,
  },
  {
    code: 'CK',
    Name: 'Cook Islands',
    code_number: 682,
  },
  {
    code: 'CR',
    Name: 'Costa Rica',
    code_number: 506,
  },
  {
    code: 'HR',
    Name: 'Croatia',
    code_number: 385,
  },
  {
    code: 'CU',
    Name: 'Cuba',
    code_number: 53,
  },
  {
    code: 'CW',
    Name: 'Curacao',
    code_number: 599,
  },
  {
    code: 'CY',
    Name: 'Cyprus',
    code_number: 357,
  },
  {
    code: 'CZ',
    Name: 'Czech Republic',
    code_number: 420,
  },
  {
    code: 'DK',
    Name: 'Denmark',
    code_number: 45,
  },
  {
    code: 'DJ',
    Name: 'Djibouti',
    code_number: 253,
  },
  {
    code: 'DM',
    Name: 'Dominica',
    code_number: '1-767',
  },
  {
    code: 'DO',
    Name: 'Dominican Republic',
    code_number: '1-809, 1-829, 1-849',
  },
  {
    code: 'TL',
    Name: 'East Timor',
    code_number: 670,
  },
  {
    code: 'EC',
    Name: 'Ecuador',
    code_number: 593,
  },
  {
    code: 'EG',
    Name: 'Egypt',
    code_number: 20,
  },
  {
    code: 'SV',
    Name: 'El Salvador',
    code_number: 503,
  },
  {
    code: 'GQ',
    Name: 'Equatorial Guinea',
    code_number: 240,
  },
  {
    code: 'ER',
    Name: 'Eritrea',
    code_number: 291,
  },
  {
    code: 'EE',
    Name: 'Estonia',
    code_number: 372,
  },
  {
    code: 'ET',
    Name: 'Ethiopia',
    code_number: 251,
  },
  {
    code: 'FK',
    Name: 'Falkland Islands',
    code_number: 500,
  },
  {
    code: 'FO',
    Name: 'Faroe Islands',
    code_number: 298,
  },
  {
    code: 'FJ',
    Name: 'Fiji',
    code_number: 679,
  },
  {
    code: 'FI',
    Name: 'Finland',
    code_number: 358,
  },
  {
    code: 'FR',
    Name: 'France',
    code_number: 33,
  },
  {
    code: 'PF',
    Name: 'French Polynesia',
    code_number: 689,
  },
  {
    code: 'GA',
    Name: 'Gabon',
    code_number: 241,
  },
  {
    code: 'GM',
    Name: 'Gambia',
    code_number: 220,
  },
  {
    code: 'GS',
    Name: 'Georgia',
    code_number: 995,
  },
  {
    code: 'DE',
    Name: 'Germany',
    code_number: 49,
  },
  {
    code: 'GH',
    Name: 'Ghana',
    code_number: 233,
  },
  {
    code: 'GI',
    Name: 'Gibraltar',
    code_number: 350,
  },
  {
    code: 'GR',
    Name: 'Greece',
    code_number: 30,
  },
  {
    code: 'GL',
    Name: 'Greenland',
    code_number: 299,
  },
  {
    code: 'GD',
    Name: 'Grenada',
    code_number: '1-473',
  },
  {
    code: 'GU',
    Name: 'Guam',
    code_number: '1-671',
  },
  {
    code: 'GT',
    Name: 'Guatemala',
    code_number: 502,
  },
  {
    code: 'GG',
    Name: 'Guernsey',
    code_number: '44-1481',
  },
  {
    code: 'GN',
    Name: 'Guinea',
    code_number: 224,
  },
  {
    code: 'GW',
    Name: 'Guinea-Bissau',
    code_number: 245,
  },
  {
    code: 'GY',
    Name: 'Guyana',
    code_number: 592,
  },
  {
    code: 'HT',
    Name: 'Haiti',
    code_number: 509,
  },
  {
    code: 'HN',
    Name: 'Honduras',
    code_number: 504,
  },
  {
    code: 'HK',
    Name: 'Hong Kong',
    code_number: 852,
  },
  {
    code: 'HU',
    Name: 'Hungary',
    code_number: 36,
  },
  {
    code: 'IS',
    Name: 'Iceland',
    code_number: 354,
  },
  {
    code: 'IN',
    Name: 'India',
    code_number: 91,
  },
  {
    code: 'ID',
    Name: 'Indonesia',
    code_number: 62,
  },
  {
    code: 'IR',
    Name: 'Iran',
    code_number: 98,
  },
  {
    code: 'IQ',
    Name: 'Iraq',
    code_number: 964,
  },
  {
    code: 'IE',
    Name: 'Ireland',
    code_number: 353,
  },
  {
    code: 'IM',
    Name: 'Isle of Man',
    code_number: '44-1624',
  },
  {
    code: 'IL',
    Name: 'Israel',
    code_number: 972,
  },
  {
    code: 'IT',
    Name: 'Italy',
    code_number: 39,
  },
  {
    code: 'CI',
    Name: 'Ivory Coast',
    code_number: 225,
  },
  {
    code: 'JM',
    Name: 'Jamaica',
    code_number: '1-876',
  },
  {
    code: 'JP',
    Name: 'Japan',
    code_number: 81,
  },
  {
    code: 'JE',
    Name: 'Jersey',
    code_number: '44-1534',
  },
  {
    code: 'JO',
    Name: 'Jordan',
    code_number: 962,
  },
  {
    code: 'KZ',
    Name: 'Kazakhstan',
    code_number: 7,
  },
  {
    code: 'KE',
    Name: 'Kenya',
    code_number: 254,
  },
  {
    code: 'KI',
    Name: 'Kiribati',
    code_number: 686,
  },
  {
    code: 'XK',
    Name: 'Kosovo',
    code_number: 383,
  },
  {
    code: 'KW',
    Name: 'Kuwait',
    code_number: 965,
  },
  {
    code: 'KG',
    Name: 'Kyrgyzstan',
    code_number: 996,
  },
  {
    code: 'LA',
    Name: 'Laos',
    code_number: 856,
  },
  {
    code: 'LV',
    Name: 'Latvia',
    code_number: 371,
  },
  {
    code: 'LB',
    Name: 'Lebanon',
    code_number: 961,
  },
  {
    code: 'LS',
    Name: 'Lesotho',
    code_number: 266,
  },
  {
    code: 'LR',
    Name: 'Liberia',
    code_number: 231,
  },
  {
    code: 'LY',
    Name: 'Libya',
    code_number: 218,
  },
  {
    code: 'LI',
    Name: 'Liechtenstein',
    code_number: 423,
  },
  {
    code: 'LT',
    Name: 'Lithuania',
    code_number: 370,
  },
  {
    code: 'LU',
    Name: 'Luxembourg',
    code_number: 352,
  },
  {
    code: 'MO',
    Name: 'Macau',
    code_number: 853,
  },
  {
    code: 'MK',
    Name: 'Macedonia',
    code_number: 389,
  },
  {
    code: 'MG',
    Name: 'Madagascar',
    code_number: 261,
  },
  {
    code: 'MW',
    Name: 'Malawi',
    code_number: 265,
  },
  {
    code: 'MY',
    Name: 'Malaysia',
    code_number: 60,
  },
  {
    code: 'MV',
    Name: 'Maldives',
    code_number: 960,
  },
  {
    code: 'ML',
    Name: 'Mali',
    code_number: 223,
  },
  {
    code: 'MT',
    Name: 'Malta',
    code_number: 356,
  },
  {
    code: 'MH',
    Name: 'Marshall Islands',
    code_number: 692,
  },
  {
    code: 'MR',
    Name: 'Mauritania',
    code_number: 222,
  },
  {
    code: 'MU',
    Name: 'Mauritius',
    code_number: 230,
  },
  {
    code: 'YT',
    Name: 'Mayotte',
    code_number: 262,
  },
  {
    code: 'MX',
    Name: 'Mexico',
    code_number: 52,
  },
  {
    code: 'FM',
    Name: 'Micronesia',
    code_number: 691,
  },
  {
    code: 'MD',
    Name: 'Moldova',
    code_number: 373,
  },
  {
    code: 'MC',
    Name: 'Monaco',
    code_number: 377,
  },
  {
    code: 'MN',
    Name: 'Mongolia',
    code_number: 976,
  },
  {
    code: 'ME',
    Name: 'Montenegro',
    code_number: 382,
  },
  {
    code: 'MS',
    Name: 'Montserrat',
    code_number: '1-664',
  },
  {
    code: 'MA',
    Name: 'Morocco',
    code_number: 212,
  },
  {
    code: 'MZ',
    Name: 'Mozambique',
    code_number: 258,
  },
  {
    code: 'NA',
    Name: 'Namibia',
    code_number: 264,
  },
  {
    code: 'NR',
    Name: 'Nauru',
    code_number: 674,
  },
  {
    code: 'NP',
    Name: 'Nepal',
    code_number: 977,
  },
  {
    code: 'NL',
    Name: 'Netherlands',
    code_number: 31,
  },
  {
    code: 'AN',
    Name: 'Netherlands Antilles',
    code_number: 599,
  },
  {
    code: 'NC',
    Name: 'New Caledonia',
    code_number: 687,
  },
  {
    code: 'NZ',
    Name: 'New Zealand',
    code_number: 64,
  },
  {
    code: 'NI',
    Name: 'Nicaragua',
    code_number: 505,
  },
  {
    code: 'NE',
    Name: 'Niger',
    code_number: 227,
  },
  {
    code: 'NG',
    Name: 'Nigeria',
    code_number: 234,
  },
  {
    code: 'NU',
    Name: 'Niue',
    code_number: 683,
  },
  {
    code: 'MP',
    Name: 'Northern Mariana Islands',
    code_number: '1-670',
  },
  {
    code: 'KP',
    Name: 'North Korea',
    code_number: 850,
  },
  {
    code: 'NO',
    Name: 'Norway',
    code_number: 47,
  },
  {
    code: 'OM',
    Name: 'Oman',
    code_number: 968,
  },
  {
    code: 'PK',
    Name: 'Pakistan',
    code_number: 92,
  },
  {
    code: 'PW',
    Name: 'Palau',
    code_number: 680,
  },
  {
    code: 'PS',
    Name: 'Palestine',
    code_number: 970,
  },
  {
    code: 'PA',
    Name: 'Panama',
    code_number: 507,
  },
  {
    code: 'PG',
    Name: 'Papua New Guinea',
    code_number: 675,
  },
  {
    code: 'PY',
    Name: 'Paraguay',
    code_number: 595,
  },
  {
    code: 'PE',
    Name: 'Peru',
    code_number: 51,
  },
  {
    code: 'PH',
    Name: 'Philippines',
    code_number: 63,
  },
  {
    code: 'PN',
    Name: 'Pitcairn',
    code_number: 64,
  },
  {
    code: 'PL',
    Name: 'Poland',
    code_number: 48,
  },
  {
    code: 'PT',
    Name: 'Portugal',
    code_number: 351,
  },
  {
    code: 'PR',
    Name: 'Puerto Rico',
    code_number: '1-787, 1-939',
  },
  {
    code: 'QA',
    Name: 'Qatar',
    code_number: 974,
  },
  {
    code: 'RE',
    Name: 'Reunion',
    code_number: 262,
  },
  {
    code: 'RO',
    Name: 'Romania',
    code_number: 40,
  },
  {
    code: 'RU',
    Name: 'Russia',
    code_number: 7,
  },
  {
    code: 'RW',
    Name: 'Rwanda',
    code_number: 250,
  },
  {
    code: 'BL',
    Name: 'Saint Barthelemy',
    code_number: 590,
  },
  {
    code: 'WS',
    Name: 'Samoa',
    code_number: 685,
  },
  {
    code: 'SM',
    Name: 'San Marino',
    code_number: 378,
  },
  {
    code: 'ST',
    Name: 'Sao Tome and Principe',
    code_number: 239,
  },
  {
    code: 'SA',
    Name: 'Saudi Arabia',
    code_number: 966,
  },
  {
    code: 'SN',
    Name: 'Senegal',
    code_number: 221,
  },
  {
    code: 'RS',
    Name: 'Serbia',
    code_number: 381,
  },
  {
    code: 'SC',
    Name: 'Seychelles',
    code_number: 248,
  },
  {
    code: 'SL',
    Name: 'Sierra Leone',
    code_number: 232,
  },
  {
    code: 'SG',
    Name: 'Singapore',
    code_number: 65,
  },
  {
    code: 'SX',
    Name: 'Sint Maarten',
    code_number: '1-721',
  },
  {
    code: 'SK',
    Name: 'Slovakia',
    code_number: 421,
  },
  {
    code: 'SI',
    Name: 'Slovenia',
    code_number: 386,
  },
  {
    code: 'SB',
    Name: 'Solomon Islands',
    code_number: 677,
  },
  {
    code: 'SO',
    Name: 'Somalia',
    code_number: 252,
  },
  {
    code: 'ZA',
    Name: 'South Africa',
    code_number: 27,
  },
  {
    code: 'KR',
    Name: 'South Korea',
    code_number: 82,
  },
  {
    code: 'SS',
    Name: 'South Sudan',
    code_number: 211,
  },
  {
    code: 'ES',
    Name: 'Spain',
    code_number: 34,
  },
  {
    code: 'LK',
    Name: 'Sri Lanka',
    code_number: 94,
  },
  {
    code: 'SH',
    Name: 'Saint Helena',
    code_number: 290,
  },
  {
    code: 'KN',
    Name: 'Saint Kitts and Nevis',
    code_number: '1-869',
  },
  {
    code: 'LC',
    Name: 'Saint Lucia',
    code_number: '1-758',
  },
  {
    code: 'MF',
    Name: 'Saint Martin',
    code_number: 590,
  },
  {
    code: 'PM',
    Name: 'Saint Pierre and Miquelon',
    code_number: 508,
  },
  {
    code: 'VC',
    Name: 'Saint Vincent and the Grenadines',
    code_number: '1-784',
  },
  {
    code: 'SD',
    Name: 'Sudan',
    code_number: 249,
  },
  {
    code: 'SR',
    Name: 'Suriname',
    code_number: 597,
  },
  {
    code: 'SJ',
    Name: 'Svalbard and Jan Mayen',
    code_number: 47,
  },
  {
    code: 'SZ',
    Name: 'Swaziland',
    code_number: 268,
  },
  {
    code: 'SE',
    Name: 'Sweden',
    code_number: 46,
  },
  {
    code: 'CH',
    Name: 'Switzerland',
    code_number: 41,
  },
  {
    code: 'SY',
    Name: 'Syria',
    code_number: 963,
  },
  {
    code: 'TW',
    Name: 'Taiwan',
    code_number: 886,
  },
  {
    code: 'TJ',
    Name: 'Tajikistan',
    code_number: 992,
  },
  {
    code: 'TZ',
    Name: 'Tanzania',
    code_number: 255,
  },
  {
    code: 'TH',
    Name: 'Thailand',
    code_number: 66,
  },
  {
    code: 'TG',
    Name: 'Togo',
    code_number: 228,
  },
  {
    code: 'TK',
    Name: 'Tokelau',
    code_number: 690,
  },
  {
    code: 'TO',
    Name: 'Tonga',
    code_number: 676,
  },
  {
    code: 'TT',
    Name: 'Trinidad and Tobago',
    code_number: '1-868',
  },
  {
    code: 'TN',
    Name: 'Tunisia',
    code_number: 216,
  },
  {
    code: 'TR',
    Name: 'Turkey',
    code_number: 90,
  },
  {
    code: 'TM',
    Name: 'Turkmenistan',
    code_number: 993,
  },
  {
    code: 'TC',
    Name: 'Turks and Caicos Islands',
    code_number: '1-649',
  },
  {
    code: 'TV',
    Name: 'Tuvalu',
    code_number: 688,
  },
  {
    code: 'AE',
    Name: 'United Arab Emirates',
    code_number: 971,
  },
  {
    code: 'UG',
    Name: 'Uganda',
    code_number: 256,
  },
  {
    code: 'GB',
    Name: 'United Kingdom',
    code_number: 44,
  },
  {
    code: 'UA',
    Name: 'Ukraine',
    code_number: 380,
  },
  {
    code: 'UY',
    Name: 'Uruguay',
    code_number: 598,
  },
  {
    code: 'US',
    Name: 'United States',
    code_number: 1,
  },
  {
    code: 'UZ',
    Name: 'Uzbekistan',
    code_number: 998,
  },
  {
    code: 'VU',
    Name: 'Vanuatu',
    code_number: 678,
  },
  {
    code: 'VA',
    Name: 'Vatican',
    code_number: 379,
  },
  {
    code: 'VE',
    Name: 'Venezuela',
    code_number: 58,
  },
  {
    code: 'VN',
    Name: 'Vietnam',
    code_number: 84,
  },
  {
    code: 'VI',
    Name: 'U.S. Virgin Islands',
    code_number: '1-340',
  },
  {
    code: 'WF',
    Name: 'Wallis and Futuna',
    code_number: 681,
  },
  {
    code: 'EH',
    Name: 'Western Sahara',
    code_number: 212,
  },
  {
    code: 'YE',
    Name: 'Yemen',
    code_number: 967,
  },
  {
    code: 'ZM',
    Name: 'Zambia',
    code_number: 260,
  },
  {
    code: 'ZW',
    Name: 'Zimbabwe',
    code_number: 263,
  },
];
