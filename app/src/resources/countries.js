import React from 'react';
import {
    List,
    Show,
    Edit,
    SimpleForm,
    Filter,
    TextInput,
    AutocompleteInput,
    BooleanInput,
    TextField,
    EditButton,
    ShowButton,
    Responsive,
    Datagrid,
    SimpleShowLayout,
    FunctionField,
    ChipField,
    DateField,
    SelectInput,
    SelectArrayInput,
    NumberInput,
    NumberField,
} from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ActionsWithExcel from '../component/ActionsWithExcel';
import PrintToPdf from '../component/PrintToPdf';
import FlagField from '../field/FlagField';
import { DateTimeInput } from 'react-admin-date-inputs';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { Globe as GrommetCountryIcon } from 'grommet-icons';
export { GrommetCountryIcon as CountryIcon }

export const alpha3s = [{ id: "XX1", name: "XX1 • Immarsat" }, { id: "XX2", name: "XX2 • Universal Personal Telecommunications" }, { id: "XX3", name: "XX3 • Global Mobile Satellite System Mobile" }, { id: "XX4", name: "XX4 • International Networks Special Services" }, { id: "XX5", name: "XX5 • International Networks" }, { id: "XX6", name: "XX6 • Disaster Relief" }, { id: "XKX", name: "XKX • Kosovo" }, { id: "AND", name: "AND • Andorra" }, { id: "ARE", name: "ARE • United Arab Emirates" }, { id: "AFG", name: "AFG • Afghanistan" }, { id: "ATG", name: "ATG • Antigua and Barbuda" }, { id: "AIA", name: "AIA • Anguilla" }, { id: "ALB", name: "ALB • Albania" }, { id: "ARM", name: "ARM • Armenia" }, { id: "AGO", name: "AGO • Angola" }, { id: "ATA", name: "ATA • Antarctica" }, { id: "ARG", name: "ARG • Argentina" }, { id: "ASM", name: "ASM • American Samoa" }, { id: "AUT", name: "AUT • Austria" }, { id: "AUS", name: "AUS • Australia" }, { id: "ABW", name: "ABW • Aruba" }, { id: "ALA", name: "ALA • Åland Islands" }, { id: "AZE", name: "AZE • Azerbaijan" }, { id: "BIH", name: "BIH • Bosnia and Herzegovina" }, { id: "BRB", name: "BRB • Barbados" }, { id: "BGD", name: "BGD • Bangladesh" }, { id: "BEL", name: "BEL • Belgium" }, { id: "BFA", name: "BFA • Burkina Faso" }, { id: "BGR", name: "BGR • Bulgaria" }, { id: "BHR", name: "BHR • Bahrain" }, { id: "BDI", name: "BDI • Burundi" }, { id: "BEN", name: "BEN • Benin" }, { id: "BLM", name: "BLM • Saint Barthélemy" }, { id: "BMU", name: "BMU • Bermuda" }, { id: "BRN", name: "BRN • Brunei Darussalam" }, { id: "BOL", name: "BOL • Bolivia (Plurinational State of)" }, { id: "BES", name: "BES • Bonaire, Sint Eustatius and Saba" }, { id: "BRA", name: "BRA • Brazil" }, { id: "BHS", name: "BHS • Bahamas" }, { id: "BTN", name: "BTN • Bhutan" }, { id: "BVT", name: "BVT • Bouvet Island" }, { id: "BWA", name: "BWA • Botswana" }, { id: "BLR", name: "BLR • Belarus" }, { id: "BLZ", name: "BLZ • Belize" }, { id: "CAN", name: "CAN • Canada" }, { id: "CCK", name: "CCK • Cocos (Keeling) Islands" }, { id: "COD", name: "COD • Congo (Democratic Republic of the)" }, { id: "CAF", name: "CAF • Central African Republic" }, { id: "COG", name: "COG • Congo" }, { id: "CHE", name: "CHE • Switzerland" }, { id: "CIV", name: "CIV • Côte d'Ivoire" }, { id: "COK", name: "COK • Cook Islands" }, { id: "CHL", name: "CHL • Chile" }, { id: "CMR", name: "CMR • Cameroon" }, { id: "CHN", name: "CHN • China" }, { id: "COL", name: "COL • Colombia" }, { id: "CRI", name: "CRI • Costa Rica" }, { id: "CUB", name: "CUB • Cuba" }, { id: "CPV", name: "CPV • Cabo Verde" }, { id: "CUW", name: "CUW • Curaçao" }, { id: "CXR", name: "CXR • Christmas Island" }, { id: "CYP", name: "CYP • Cyprus" }, { id: "CZE", name: "CZE • Czechia" }, { id: "DEU", name: "DEU • Germany" }, { id: "DJI", name: "DJI • Djibouti" }, { id: "DNK", name: "DNK • Denmark" }, { id: "DMA", name: "DMA • Dominica" }, { id: "DOM", name: "DOM • Dominican Republic" }, { id: "DZA", name: "DZA • Algeria" }, { id: "ECU", name: "ECU • Ecuador" }, { id: "EST", name: "EST • Estonia" }, { id: "EGY", name: "EGY • Egypt" }, { id: "ESH", name: "ESH • Western Sahara" }, { id: "ERI", name: "ERI • Eritrea" }, { id: "ESP", name: "ESP • Spain" }, { id: "ETH", name: "ETH • Ethiopia" }, { id: "FIN", name: "FIN • Finland" }, { id: "FJI", name: "FJI • Fiji" }, { id: "FLK", name: "FLK • Falkland Islands (Malvinas)" }, { id: "FSM", name: "FSM • Micronesia (Federated States of)" }, { id: "FRO", name: "FRO • Faroe Islands" }, { id: "FRA", name: "FRA • France" }, { id: "GAB", name: "GAB • Gabon" }, { id: "GBR", name: "GBR • United Kingdom of Great Britain and Northern Ireland" }, { id: "GRD", name: "GRD • Grenada" }, { id: "GEO", name: "GEO • Georgia" }, { id: "GUF", name: "GUF • French Guiana" }, { id: "GGY", name: "GGY • Guernsey" }, { id: "GHA", name: "GHA • Ghana" }, { id: "GIB", name: "GIB • Gibraltar" }, { id: "GRL", name: "GRL • Greenland" }, { id: "GMB", name: "GMB • Gambia" }, { id: "GIN", name: "GIN • Guinea" }, { id: "GLP", name: "GLP • Guadeloupe" }, { id: "GNQ", name: "GNQ • Equatorial Guinea" }, { id: "GRC", name: "GRC • Greece" }, { id: "SGS", name: "SGS • South Georgia and the South Sandwich Islands" }, { id: "GTM", name: "GTM • Guatemala" }, { id: "GUM", name: "GUM • Guam" }, { id: "GNB", name: "GNB • Guinea-Bissau" }, { id: "GUY", name: "GUY • Guyana" }, { id: "HKG", name: "HKG • Hong Kong" }, { id: "HMD", name: "HMD • Heard Island and McDonald Islands" }, { id: "HND", name: "HND • Honduras" }, { id: "HRV", name: "HRV • Croatia" }, { id: "HTI", name: "HTI • Haiti" }, { id: "HUN", name: "HUN • Hungary" }, { id: "IDN", name: "IDN • Indonesia" }, { id: "IRL", name: "IRL • Ireland" }, { id: "ISR", name: "ISR • Israel" }, { id: "IMN", name: "IMN • Isle of Man" }, { id: "IND", name: "IND • India" }, { id: "IOT", name: "IOT • British Indian Ocean Territory" }, { id: "IRQ", name: "IRQ • Iraq" }, { id: "IRN", name: "IRN • Iran (Islamic Republic of)" }, { id: "ISL", name: "ISL • Iceland" }, { id: "ITA", name: "ITA • Italy" }, { id: "JEY", name: "JEY • Jersey" }, { id: "JAM", name: "JAM • Jamaica" }, { id: "JOR", name: "JOR • Jordan" }, { id: "JPN", name: "JPN • Japan" }, { id: "KEN", name: "KEN • Kenya" }, { id: "KGZ", name: "KGZ • Kyrgyzstan" }, { id: "KHM", name: "KHM • Cambodia" }, { id: "KIR", name: "KIR • Kiribati" }, { id: "COM", name: "COM • Comoros" }, { id: "KNA", name: "KNA • Saint Kitts and Nevis" }, { id: "PRK", name: "PRK • Korea (Democratic People's Republic of)" }, { id: "KOR", name: "KOR • Korea (Republic of)" }, { id: "KWT", name: "KWT • Kuwait" }, { id: "CYM", name: "CYM • Cayman Islands" }, { id: "KAZ", name: "KAZ • Kazakhstan" }, { id: "LAO", name: "LAO • Lao People's Democratic Republic" }, { id: "LBN", name: "LBN • Lebanon" }, { id: "LCA", name: "LCA • Saint Lucia" }, { id: "LIE", name: "LIE • Liechtenstein" }, { id: "LKA", name: "LKA • Sri Lanka" }, { id: "LBR", name: "LBR • Liberia" }, { id: "LSO", name: "LSO • Lesotho" }, { id: "LTU", name: "LTU • Lithuania" }, { id: "LUX", name: "LUX • Luxembourg" }, { id: "LVA", name: "LVA • Latvia" }, { id: "LBY", name: "LBY • Libya" }, { id: "MAR", name: "MAR • Morocco" }, { id: "MCO", name: "MCO • Monaco" }, { id: "MDA", name: "MDA • Moldova (Republic of)" }, { id: "MNE", name: "MNE • Montenegro" }, { id: "MAF", name: "MAF • Saint Martin (French part)" }, { id: "MDG", name: "MDG • Madagascar" }, { id: "MHL", name: "MHL • Marshall Islands" }, { id: "MKD", name: "MKD • Macedonia (the former Yugoslav Republic of)" }, { id: "MLI", name: "MLI • Mali" }, { id: "MMR", name: "MMR • Myanmar" }, { id: "MNG", name: "MNG • Mongolia" }, { id: "MAC", name: "MAC • Macao" }, { id: "MNP", name: "MNP • Northern Mariana Islands" }, { id: "MTQ", name: "MTQ • Martinique" }, { id: "MRT", name: "MRT • Mauritania" }, { id: "MSR", name: "MSR • Montserrat" }, { id: "MLT", name: "MLT • Malta" }, { id: "MUS", name: "MUS • Mauritius" }, { id: "MDV", name: "MDV • Maldives" }, { id: "MWI", name: "MWI • Malawi" }, { id: "ROU", name: "ROU • Romania" }, { id: "SRB", name: "SRB • Serbia" }, { id: "MEX", name: "MEX • Mexico" }, { id: "MYS", name: "MYS • Malaysia" }, { id: "MOZ", name: "MOZ • Mozambique" }, { id: "NAM", name: "NAM • Namibia" }, { id: "NCL", name: "NCL • New Caledonia" }, { id: "NER", name: "NER • Niger" }, { id: "NFK", name: "NFK • Norfolk Island" }, { id: "NGA", name: "NGA • Nigeria" }, { id: "NIC", name: "NIC • Nicaragua" }, { id: "NLD", name: "NLD • Netherlands" }, { id: "NOR", name: "NOR • Norway" }, { id: "NPL", name: "NPL • Nepal" }, { id: "NRU", name: "NRU • Nauru" }, { id: "NIU", name: "NIU • Niue" }, { id: "NZL", name: "NZL • New Zealand" }, { id: "OMN", name: "OMN • Oman" }, { id: "PAN", name: "PAN • Panama" }, { id: "PER", name: "PER • Peru" }, { id: "PYF", name: "PYF • French Polynesia" }, { id: "PNG", name: "PNG • Papua New Guinea" }, { id: "PHL", name: "PHL • Philippines" }, { id: "PAK", name: "PAK • Pakistan" }, { id: "POL", name: "POL • Poland" }, { id: "SPM", name: "SPM • Saint Pierre and Miquelon" }, { id: "PCN", name: "PCN • Pitcairn" }, { id: "PRI", name: "PRI • Puerto Rico" }, { id: "PSE", name: "PSE • Palestine, State of" }, { id: "PRT", name: "PRT • Portugal" }, { id: "PLW", name: "PLW • Palau" }, { id: "PRY", name: "PRY • Paraguay" }, { id: "QAT", name: "QAT • Qatar" }, { id: "REU", name: "REU • Réunion" }, { id: "RUS", name: "RUS • Russian Federation" }, { id: "RWA", name: "RWA • Rwanda" }, { id: "SAU", name: "SAU • Saudi Arabia" }, { id: "SLB", name: "SLB • Solomon Islands" }, { id: "SYC", name: "SYC • Seychelles" }, { id: "SDN", name: "SDN • Sudan" }, { id: "SWE", name: "SWE • Sweden" }, { id: "SGP", name: "SGP • Singapore" }, { id: "SHN", name: "SHN • Saint Helena, Ascension and Tristan da Cunha" }, { id: "SVN", name: "SVN • Slovenia" }, { id: "SJM", name: "SJM • Svalbard and Jan Mayen" }, { id: "SVK", name: "SVK • Slovakia" }, { id: "SLE", name: "SLE • Sierra Leone" }, { id: "SMR", name: "SMR • San Marino" }, { id: "SEN", name: "SEN • Senegal" }, { id: "SOM", name: "SOM • Somalia" }, { id: "SUR", name: "SUR • Suriname" }, { id: "SSD", name: "SSD • South Sudan" }, { id: "STP", name: "STP • Sao Tome and Principe" }, { id: "SLV", name: "SLV • El Salvador" }, { id: "SXM", name: "SXM • Sint Maarten (Dutch part)" }, { id: "SYR", name: "SYR • Syrian Arab Republic" }, { id: "SWZ", name: "SWZ • Swaziland" }, { id: "TCA", name: "TCA • Turks and Caicos Islands" }, { id: "TCD", name: "TCD • Chad" }, { id: "ATF", name: "ATF • French Southern Territories" }, { id: "TGO", name: "TGO • Togo" }, { id: "THA", name: "THA • Thailand" }, { id: "TJK", name: "TJK • Tajikistan" }, { id: "TKL", name: "TKL • Tokelau" }, { id: "TLS", name: "TLS • Timor-Leste" }, { id: "TKM", name: "TKM • Turkmenistan" }, { id: "TUN", name: "TUN • Tunisia" }, { id: "TON", name: "TON • Tonga" }, { id: "TUR", name: "TUR • Turkey" }, { id: "TTO", name: "TTO • Trinidad and Tobago" }, { id: "TUV", name: "TUV • Tuvalu" }, { id: "TWN", name: "TWN • Taiwan, Province of China" }, { id: "TZA", name: "TZA • Tanzania, United Republic of" }, { id: "UKR", name: "UKR • Ukraine" }, { id: "UGA", name: "UGA • Uganda" }, { id: "UMI", name: "UMI • United States Minor Outlying Islands" }, { id: "USA", name: "USA • United States of America" }, { id: "URY", name: "URY • Uruguay" }, { id: "UZB", name: "UZB • Uzbekistan" }, { id: "VAT", name: "VAT • Holy See" }, { id: "VCT", name: "VCT • Saint Vincent and the Grenadines" }, { id: "VEN", name: "VEN • Venezuela (Bolivarian Republic of)" }, { id: "VGB", name: "VGB • Virgin Islands (British)" }, { id: "VIR", name: "VIR • Virgin Islands (U.S.)" }, { id: "VNM", name: "VNM • Viet Nam" }, { id: "VUT", name: "VUT • Vanuatu" }, { id: "WLF", name: "WLF • Wallis and Futuna" }, { id: "WSM", name: "WSM • Samoa" }, { id: "YEM", name: "YEM • Yemen" }, { id: "MYT", name: "MYT • Mayotte" }, { id: "ZAF", name: "ZAF • South Africa" }, { id: "ZMB", name: "ZMB • Zambia" }, { id: "ZWE", name: "ZWE • Zimbabwe" }]
export const regions = [{ id: "Europe", name: "Europe" }, { id: "Asia", name: "Asia" }, { id: "North America", name: "North America" }, { id: "Africa", name: "Africa" }, { id: "Antarctica", name: "Antarctica" }, { id: "South America", name: "South America" }, { id: "Australia", name: "Australia" }];
export const subregions = [{ id: "Southern Europe", name: "Southern Europe" }, { id: "Western Asia", name: "Western Asia" }, { id: "Southern Asia", name: "Southern Asia" }, { id: "Caribbean", name: "Caribbean" }, { id: "Middle Africa", name: "Middle Africa" }, { id: "", name: "" }, { id: "South America", name: "South America" }, { id: "Polynesia", name: "Polynesia" }, { id: "Western Europe", name: "Western Europe" }, { id: "Australia and New Zealand", name: "Australia and New Zealand" }, { id: "Northern Europe", name: "Northern Europe" }, { id: "Western Africa", name: "Western Africa" }, { id: "Eastern Europe", name: "Eastern Europe" }, { id: "Eastern Africa", name: "Eastern Africa" }, { id: "Northern America", name: "Northern America" }, { id: "South-Eastern Asia", name: "South-Eastern Asia" }, { id: "Southern Africa", name: "Southern Africa" }, { id: "Central America", name: "Central America" }, { id: "Eastern Asia", name: "Eastern Asia" }, { id: "Northern Africa", name: "Northern Africa" }, { id: "Melanesia", name: "Melanesia" }, { id: "Micronesia", name: "Micronesia" }, { id: "Central Asia", name: "Central Asia" }];
export const worldRegions = [{ id: "EMEA", name: "EMEA" }, { id: "APAC", name: "APAC" }, { id: "AMER", name: "AMER" }];
export const currencies = [{ id: "EUR", name: "EUR • Euro" }, { id: "AED", name: "AED • United Arab Emirates Dirham" }, { id: "AFN", name: "AFN • Afghan Afghani" }, { id: "XCD", name: "XCD • East Caribbean Dollar" }, { id: "ALL", name: "ALL • Albanian Lek" }, { id: "AMD", name: "AMD • Armenian Dram" }, { id: "AOA", name: "AOA • Angolan Kwanza" }, { id: "USD", name: "USD • United States Dollar" }, { id: "ARS", name: "ARS • Argentine Peso" }, { id: "AUD", name: "AUD • Australian Dollar" }, { id: "AWG", name: "AWG • Aruban Florin" }, { id: "AZN", name: "AZN • Azerbaijani Manat" }, { id: "BAM", name: "BAM • Bosnia and Herzegovina Convertible Mark" }, { id: "BBD", name: "BBD • Barbadian Dollar" }, { id: "BDT", name: "BDT • Bangladeshi Taka" }, { id: "XOF", name: "XOF • West African Cfa Franc" }, { id: "BGN", name: "BGN • Bulgarian Lev" }, { id: "BHD", name: "BHD • Bahraini Dinar" }, { id: "BIF", name: "BIF • Burundian Franc" }, { id: "BMD", name: "BMD • Bermudian Dollar" }, { id: "BND", name: "BND • Brunei Dollar" }, { id: "BOB", name: "BOB • Bolivian Boliviano" }, { id: "BRL", name: "BRL • Brazilian Real" }, { id: "BSD", name: "BSD • Bahamian Dollar" }, { id: "BTN", name: "BTN • Bhutanese Ngultrum" }, { id: "NOK", name: "NOK • Norwegian Krone" }, { id: "BWP", name: "BWP • Botswana Pula" }, { id: "BZD", name: "BZD • Belize Dollar" }, { id: "CAD", name: "CAD • Canadian Dollar" }, { id: "CDF", name: "CDF • Congolese Franc" }, { id: "XAF", name: "XAF • Central African Cfa Franc" }, { id: "CHF", name: "CHF • Swiss Franc" }, { id: "NZD", name: "NZD • New Zealand Dollar" }, { id: "CLP", name: "CLP • Chilean Peso" }, { id: "CNY", name: "CNY • Chinese Renminbi Yuan" }, { id: "COP", name: "COP • Colombian Peso" }, { id: "CRC", name: "CRC • Costa Rican Colón" }, { id: "CUP", name: "CUP • Cuban Peso" }, { id: "CVE", name: "CVE • Cape Verdean Escudo" }, { id: "ANG", name: "ANG • Netherlands Antillean Gulden" }, { id: "CZK", name: "CZK • Czech Koruna" }, { id: "DJF", name: "DJF • Djiboutian Franc" }, { id: "DKK", name: "DKK • Danish Krone" }, { id: "DOP", name: "DOP • Dominican Peso" }, { id: "DZD", name: "DZD • Algerian Dinar" }, { id: "EGP", name: "EGP • Egyptian Pound" }, { id: "MAD", name: "MAD • Moroccan Dirham" }, { id: "ETB", name: "ETB • Ethiopian Birr" }, { id: "FKP", name: "FKP • Falkland Pound" }, { id: "GBP", name: "GBP • British Pound" }, { id: "GEL", name: "GEL • Georgian Lari" }, { id: "GHS", name: "GHS • Ghanaian Cedi" }, { id: "GIP", name: "GIP • Gibraltar Pound" }, { id: "GMD", name: "GMD • Gambian Dalasi" }, { id: "GNF", name: "GNF • Guinean Franc" }, { id: "GTQ", name: "GTQ • Guatemalan Quetzal" }, { id: "GYD", name: "GYD • Guyanese Dollar" }, { id: "HKD", name: "HKD • Hong Kong Dollar" }, { id: "HNL", name: "HNL • Honduran Lempira" }, { id: "HRK", name: "HRK • Croatian Kuna" }, { id: "HUF", name: "HUF • Hungarian Forint" }, { id: "IDR", name: "IDR • Indonesian Rupiah" }, { id: "ILS", name: "ILS • Israeli New Sheqel" }, { id: "IMP", name: "IMP • Isle of Man Pound" }, { id: "INR", name: "INR • Indian Rupee" }, { id: "IQD", name: "IQD • Iraqi Dinar" }, { id: "IRR", name: "IRR • Iranian Rial" }, { id: "ISK", name: "ISK • Icelandic Króna" }, { id: "JEP", name: "JEP • Jersey Pound" }, { id: "JMD", name: "JMD • Jamaican Dollar" }, { id: "JOD", name: "JOD • Jordanian Dinar" }, { id: "JPY", name: "JPY • Japanese Yen" }, { id: "KES", name: "KES • Kenyan Shilling" }, { id: "KGS", name: "KGS • Kyrgyzstani Som" }, { id: "KHR", name: "KHR • Cambodian Riel" }, { id: "KMF", name: "KMF • Comorian Franc" }, { id: "KPW", name: "KPW • North Korean Won" }, { id: "KRW", name: "KRW • South Korean Won" }, { id: "KWD", name: "KWD • Kuwaiti Dinar" }, { id: "KYD", name: "KYD • Cayman Islands Dollar" }, { id: "KZT", name: "KZT • Kazakhstani Tenge" }, { id: "LAK", name: "LAK • Lao Kip" }, { id: "LBP", name: "LBP • Lebanese Pound" }, { id: "LKR", name: "LKR • Sri Lankan Rupee" }, { id: "LRD", name: "LRD • Liberian Dollar" }, { id: "LSL", name: "LSL • Lesotho Loti" }, { id: "LYD", name: "LYD • Libyan Dinar" }, { id: "MDL", name: "MDL • Moldovan Leu" }, { id: "MGA", name: "MGA • Malagasy Ariary" }, { id: "MKD", name: "MKD • Macedonian Denar" }, { id: "MMK", name: "MMK • Myanmar Kyat" }, { id: "MNT", name: "MNT • Mongolian Tögrög" }, { id: "MOP", name: "MOP • Macanese Pataca" }, { id: "MRO", name: "MRO • Mauritanian Ouguiya" }, { id: "MUR", name: "MUR • Mauritian Rupee" }, { id: "MVR", name: "MVR • Maldivian Rufiyaa" }, { id: "MWK", name: "MWK • Malawian Kwacha" }, { id: "RON", name: "RON • Romanian Leu" }, { id: "RSD", name: "RSD • Serbian Dinar" }, { id: "MXN", name: "MXN • Mexican Peso" }, { id: "MYR", name: "MYR • Malaysian Ringgit" }, { id: "MZN", name: "MZN • Mozambican Metical" }, { id: "NAD", name: "NAD • Namibian Dollar" }, { id: "XPF", name: "XPF • Cfp Franc" }, { id: "NGN", name: "NGN • Nigerian Naira" }, { id: "NIO", name: "NIO • Nicaraguan Córdoba" }, { id: "NPR", name: "NPR • Nepalese Rupee" }, { id: "OMR", name: "OMR • Omani Rial" }, { id: "PAB", name: "PAB • Panamanian Balboa" }, { id: "PEN", name: "PEN • Peruvian Nuevo Sol" }, { id: "PGK", name: "PGK • Papua New Guinean Kina" }, { id: "PHP", name: "PHP • Philippine Peso" }, { id: "PKR", name: "PKR • Pakistani Rupee" }, { id: "PLN", name: "PLN • Polish Złoty" }, { id: "PYG", name: "PYG • Paraguayan Guaraní" }, { id: "QAR", name: "QAR • Qatari Riyal" }, { id: "RUB", name: "RUB • Russian Ruble" }, { id: "RWF", name: "RWF • Rwandan Franc" }, { id: "SAR", name: "SAR • Saudi Riyal" }, { id: "SBD", name: "SBD • Solomon Islands Dollar" }, { id: "SCR", name: "SCR • Seychellois Rupee" }, { id: "SDG", name: "SDG • Sudanese Pound" }, { id: "SEK", name: "SEK • Swedish Krona" }, { id: "SGD", name: "SGD • Singapore Dollar" }, { id: "SHP", name: "SHP • Saint Helenian Pound" }, { id: "SLL", name: "SLL • Sierra Leonean Leone" }, { id: "SOS", name: "SOS • Somali Shilling" }, { id: "SRD", name: "SRD • Surinamese Dollar" }, { id: "SSP", name: "SSP • South Sudanese Pound" }, { id: "STD", name: "STD • São Tomé and Príncipe Dobra" }, { id: "SYP", name: "SYP • Syrian Pound" }, { id: "SZL", name: "SZL • Swazi Lilangeni" }, { id: "THB", name: "THB • Thai Baht" }, { id: "TJS", name: "TJS • Tajikistani Somoni" }, { id: "TMT", name: "TMT • Turkmenistani Manat" }, { id: "TND", name: "TND • Tunisian Dinar" }, { id: "TOP", name: "TOP • Tongan Paʻanga" }, { id: "TRY", name: "TRY • Turkish Lira" }, { id: "TTD", name: "TTD • Trinidad and Tobago Dollar" }, { id: "TWD", name: "TWD • New Taiwan Dollar" }, { id: "TZS", name: "TZS • Tanzanian Shilling" }, { id: "UAH", name: "UAH • Ukrainian Hryvnia" }, { id: "UGX", name: "UGX • Ugandan Shilling" }, { id: "UYU", name: "UYU • Uruguayan Peso" }, { id: "UZS", name: "UZS • Uzbekistan Som" }, { id: "VEF", name: "VEF • Venezuelan Bolívar" }, { id: "VND", name: "VND • Vietnamese Đồng" }, { id: "VUV", name: "VUV • Vanuatu Vatu" }, { id: "YER", name: "YER • Yemeni Rial" }, { id: "ZAR", name: "ZAR • South African Rand" }, { id: "ZMW", name: "ZMW • Zambian Kwacha" }, { id: "BYR", name: "BYR • Belarusian Ruble" }];
export const timezones = [{ id: "Pacific/Pago_Pago", name: "UTC-1100 • Pacific/Pago_Pago" }, { id: "Pacific/Midway", name: "UTC-1100 • Pacific/Midway" }, { id: "Pacific/Midway", name: "UTC-1100 • Pacific/Midway" }, { id: "Pacific/Apia", name: "UTC-1100 • Pacific/Apia" }, { id: "Pacific/Honolulu", name: "UTC-1000 • Pacific/Honolulu" }, { id: "America/Juneau", name: "UTC-0900 • America/Juneau" }, { id: "America/Los_Angeles", name: "UTC-0800 • America/Los_Angeles" }, { id: "America/Tijuana", name: "UTC-0800 • America/Tijuana" }, { id: "America/Phoenix", name: "UTC-0700 • America/Phoenix" }, { id: "America/Chihuahua", name: "UTC-0700 • America/Chihuahua" }, { id: "America/Mazatlan", name: "UTC-0700 • America/Mazatlan" }, { id: "America/Denver", name: "UTC-0700 • America/Denver" }, { id: "America/Guatemala", name: "UTC-0600 • America/Guatemala" }, { id: "America/Chicago", name: "UTC-0600 • America/Chicago" }, { id: "America/Mexico_City", name: "UTC-0600 • America/Mexico_City" }, { id: "America/Mexico_City", name: "UTC-0600 • America/Mexico_City" }, { id: "America/Monterrey", name: "UTC-0600 • America/Monterrey" }, { id: "America/Regina", name: "UTC-0600 • America/Regina" }, { id: "America/Bogota", name: "UTC-0500 • America/Bogota" }, { id: "America/New_York", name: "UTC-0500 • America/New_York" }, { id: "America/Indiana/Indianapolis", name: "UTC-0500 • America/Indiana/Indianapolis" }, { id: "America/Lima", name: "UTC-0500 • America/Lima" }, { id: "America/Lima", name: "UTC-0500 • America/Lima" }, { id: "America/Halifax", name: "UTC-0400 • America/Halifax" }, { id: "America/Caracas", name: "UTC-0400 • America/Caracas" }, { id: "America/Guyana", name: "UTC-0400 • America/Guyana" }, { id: "America/La_Paz", name: "UTC-0400 • America/La_Paz" }, { id: "America/Santiago", name: "UTC-0400 • America/Santiago" }, { id: "America/St_Johns", name: "UTC-0330 • America/St_Johns" }, { id: "America/Sao_Paulo", name: "UTC-0300 • America/Sao_Paulo" }, { id: "America/Argentina/Buenos_Aires", name: "UTC-0300 • America/Argentina/Buenos_Aires" }, { id: "America/Godthab", name: "UTC-0300 • America/Godthab" }, { id: "America/Montevideo", name: "UTC-0300 • America/Montevideo" }, { id: "Atlantic/South_Georgia", name: "UTC-0200 • Atlantic/South_Georgia" }, { id: "Atlantic/Azores", name: "UTC-0100 • Atlantic/Azores" }, { id: "Atlantic/Cape_Verde", name: "UTC-0100 • Atlantic/Cape_Verde" }, { id: "Africa/Casablanca", name: "UTC+0000 • Africa/Casablanca" }, { id: "Europe/Dublin", name: "UTC+0000 • Europe/Dublin" }, { id: "Europe/London", name: "UTC+0000 • Europe/London" }, { id: "Europe/Lisbon", name: "UTC+0000 • Europe/Lisbon" }, { id: "Europe/London", name: "UTC+0000 • Europe/London" }, { id: "Africa/Monrovia", name: "UTC+0000 • Africa/Monrovia" }, { id: "Etc/UTC", name: "UTC+0000 • Etc/UTC" }, { id: "Europe/Amsterdam", name: "UTC+0100 • Europe/Amsterdam" }, { id: "Europe/Belgrade", name: "UTC+0100 • Europe/Belgrade" }, { id: "Europe/Berlin", name: "UTC+0100 • Europe/Berlin" }, { id: "Europe/Zurich", name: "UTC+0100 • Europe/Zurich" }, { id: "Europe/Bratislava", name: "UTC+0100 • Europe/Bratislava" }, { id: "Europe/Brussels", name: "UTC+0100 • Europe/Brussels" }, { id: "Europe/Budapest", name: "UTC+0100 • Europe/Budapest" }, { id: "Europe/Copenhagen", name: "UTC+0100 • Europe/Copenhagen" }, { id: "Europe/Rome", name: "UTC+0100 • Europe/Rome" }, { id: "Europe/Ljubljana", name: "UTC+0100 • Europe/Ljubljana" }, { id: "Europe/Madrid", name: "UTC+0100 • Europe/Madrid" }, { id: "Europe/Paris", name: "UTC+0100 • Europe/Paris" }, { id: "Europe/Prague", name: "UTC+0100 • Europe/Prague" }, { id: "Europe/Rome", name: "UTC+0100 • Europe/Rome" }, { id: "Europe/Sarajevo", name: "UTC+0100 • Europe/Sarajevo" }, { id: "Europe/Skopje", name: "UTC+0100 • Europe/Skopje" }, { id: "Europe/Stockholm", name: "UTC+0100 • Europe/Stockholm" }, { id: "Europe/Vienna", name: "UTC+0100 • Europe/Vienna" }, { id: "Europe/Warsaw", name: "UTC+0100 • Europe/Warsaw" }, { id: "Africa/Algiers", name: "UTC+0100 • Africa/Algiers" }, { id: "Europe/Zagreb", name: "UTC+0100 • Europe/Zagreb" }, { id: "Europe/Zurich", name: "UTC+0100 • Europe/Zurich" }, { id: "Europe/Athens", name: "UTC+0200 • Europe/Athens" }, { id: "Europe/Bucharest", name: "UTC+0200 • Europe/Bucharest" }, { id: "Africa/Cairo", name: "UTC+0200 • Africa/Cairo" }, { id: "Africa/Harare", name: "UTC+0200 • Africa/Harare" }, { id: "Europe/Helsinki", name: "UTC+0200 • Europe/Helsinki" }, { id: "Asia/Jerusalem", name: "UTC+0200 • Asia/Jerusalem" }, { id: "Europe/Kaliningrad", name: "UTC+0200 • Europe/Kaliningrad" }, { id: "Europe/Kiev", name: "UTC+0200 • Europe/Kiev" }, { id: "Africa/Johannesburg", name: "UTC+0200 • Africa/Johannesburg" }, { id: "Europe/Riga", name: "UTC+0200 • Europe/Riga" }, { id: "Europe/Sofia", name: "UTC+0200 • Europe/Sofia" }, { id: "Europe/Tallinn", name: "UTC+0200 • Europe/Tallinn" }, { id: "Europe/Vilnius", name: "UTC+0200 • Europe/Vilnius" }, { id: "Asia/Baghdad", name: "UTC+0300 • Asia/Baghdad" }, { id: "Europe/Istanbul", name: "UTC+0300 • Europe/Istanbul" }, { id: "Asia/Kuwait", name: "UTC+0300 • Asia/Kuwait" }, { id: "Europe/Minsk", name: "UTC+0300 • Europe/Minsk" }, { id: "Europe/Moscow", name: "UTC+0300 • Europe/Moscow" }, { id: "Africa/Nairobi", name: "UTC+0300 • Africa/Nairobi" }, { id: "Asia/Riyadh", name: "UTC+0300 • Asia/Riyadh" }, { id: "Europe/Moscow", name: "UTC+0300 • Europe/Moscow" }, { id: "Europe/Volgograd", name: "UTC+0300 • Europe/Volgograd" }, { id: "Asia/Tehran", name: "UTC+0330 • Asia/Tehran" }, { id: "Asia/Muscat", name: "UTC+0400 • Asia/Muscat" }, { id: "Asia/Baku", name: "UTC+0400 • Asia/Baku" }, { id: "Asia/Muscat", name: "UTC+0400 • Asia/Muscat" }, { id: "Europe/Samara", name: "UTC+0400 • Europe/Samara" }, { id: "Asia/Tbilisi", name: "UTC+0400 • Asia/Tbilisi" }, { id: "Asia/Yerevan", name: "UTC+0400 • Asia/Yerevan" }, { id: "Asia/Kabul", name: "UTC+0430 • Asia/Kabul" }, { id: "Asia/Yekaterinburg", name: "UTC+0500 • Asia/Yekaterinburg" }, { id: "Asia/Karachi", name: "UTC+0500 • Asia/Karachi" }, { id: "Asia/Karachi", name: "UTC+0500 • Asia/Karachi" }, { id: "Asia/Tashkent", name: "UTC+0500 • Asia/Tashkent" }, { id: "Asia/Kolkata", name: "UTC+0530 • Asia/Kolkata" }, { id: "Asia/Kolkata", name: "UTC+0530 • Asia/Kolkata" }, { id: "Asia/Kolkata", name: "UTC+0530 • Asia/Kolkata" }, { id: "Asia/Kolkata", name: "UTC+0530 • Asia/Kolkata" }, { id: "Asia/Colombo", name: "UTC+0530 • Asia/Colombo" }, { id: "Asia/Kathmandu", name: "UTC+0545 • Asia/Kathmandu" }, { id: "Asia/Almaty", name: "UTC+0600 • Asia/Almaty" }, { id: "Asia/Dhaka", name: "UTC+0600 • Asia/Dhaka" }, { id: "Asia/Dhaka", name: "UTC+0600 • Asia/Dhaka" }, { id: "Asia/Urumqi", name: "UTC+0600 • Asia/Urumqi" }, { id: "Asia/Rangoon", name: "UTC+0630 • Asia/Rangoon" }, { id: "Asia/Bangkok", name: "UTC+0700 • Asia/Bangkok" }, { id: "Asia/Bangkok", name: "UTC+0700 • Asia/Bangkok" }, { id: "Asia/Jakarta", name: "UTC+0700 • Asia/Jakarta" }, { id: "Asia/Krasnoyarsk", name: "UTC+0700 • Asia/Krasnoyarsk" }, { id: "Asia/Novosibirsk", name: "UTC+0700 • Asia/Novosibirsk" }, { id: "Asia/Shanghai", name: "UTC+0800 • Asia/Shanghai" }, { id: "Asia/Chongqing", name: "UTC+0800 • Asia/Chongqing" }, { id: "Asia/Hong_Kong", name: "UTC+0800 • Asia/Hong_Kong" }, { id: "Asia/Irkutsk", name: "UTC+0800 • Asia/Irkutsk" }, { id: "Asia/Kuala_Lumpur", name: "UTC+0800 • Asia/Kuala_Lumpur" }, { id: "Australia/Perth", name: "UTC+0800 • Australia/Perth" }, { id: "Asia/Singapore", name: "UTC+0800 • Asia/Singapore" }, { id: "Asia/Taipei", name: "UTC+0800 • Asia/Taipei" }, { id: "Asia/Ulaanbaatar", name: "UTC+0800 • Asia/Ulaanbaatar" }, { id: "Asia/Tokyo", name: "UTC+0900 • Asia/Tokyo" }, { id: "Asia/Tokyo", name: "UTC+0900 • Asia/Tokyo" }, { id: "Asia/Seoul", name: "UTC+0900 • Asia/Seoul" }, { id: "Asia/Tokyo", name: "UTC+0900 • Asia/Tokyo" }, { id: "Asia/Yakutsk", name: "UTC+0900 • Asia/Yakutsk" }, { id: "Australia/Adelaide", name: "UTC+0930 • Australia/Adelaide" }, { id: "Australia/Darwin", name: "UTC+0930 • Australia/Darwin" }, { id: "Australia/Brisbane", name: "UTC+1000 • Australia/Brisbane" }, { id: "Australia/Melbourne", name: "UTC+1000 • Australia/Melbourne" }, { id: "Pacific/Guam", name: "UTC+1000 • Pacific/Guam" }, { id: "Australia/Hobart", name: "UTC+1000 • Australia/Hobart" }, { id: "Australia/Melbourne", name: "UTC+1000 • Australia/Melbourne" }, { id: "Pacific/Port_Moresby", name: "UTC+1000 • Pacific/Port_Moresby" }, { id: "Australia/Sydney", name: "UTC+1000 • Australia/Sydney" }, { id: "Asia/Vladivostok", name: "UTC+1000 • Asia/Vladivostok" }, { id: "Asia/Magadan", name: "UTC+1100 • Asia/Magadan" }, { id: "Pacific/Noumea", name: "UTC+1100 • Pacific/Noumea" }, { id: "Pacific/Guadalcanal", name: "UTC+1100 • Pacific/Guadalcanal" }, { id: "Asia/Srednekolymsk", name: "UTC+1100 • Asia/Srednekolymsk" }, { id: "Pacific/Auckland", name: "UTC+1200 • Pacific/Auckland" }, { id: "Pacific/Fiji", name: "UTC+1200 • Pacific/Fiji" }, { id: "Asia/Kamchatka", name: "UTC+1200 • Asia/Kamchatka" }, { id: "Pacific/Majuro", name: "UTC+1200 • Pacific/Majuro" }, { id: "Pacific/Auckland", name: "UTC+1200 • Pacific/Auckland" }, { id: "Pacific/Chatham", name: "UTC+1245 • Pacific/Chatham" }, { id: "Pacific/Tongatapu", name: "UTC+1300 • Pacific/Tongatapu" }, { id: "Pacific/Fakaofo", name: "UTC+1300 • Pacific/Fakaofo" }];

var moment = require('moment');

const styles = theme => ({
    hiddenOnSmallScreens: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    table: {
        tableLayout: 'auto',
    }
});

const Filters = (props) => (
    <Filter {...props} >
        <TextInput label="Search" source="q" alwaysOn />
        <AutocompleteInput source="alpha3" choices={alpha3s} />
        <AutocompleteInput source="region" choices={regions} />
        <AutocompleteInput source="subregion" choices={subregions} />
        <AutocompleteInput source="world-region" choices={worldRegions} />
        <AutocompleteInput source="currency-code" choices={currencies} />
        <DateTimeInput label="Updated before (UTC)" source="updated-at-leq" alwaysOn providerOptions={{ utils: MomentUtils }} />
        <DateTimeInput label="Updated after (UTC)" source="updated-at-geq" alwaysOn providerOptions={{ utils: MomentUtils }} />        
    </Filter>
);

const PlainCountryList = ({ classes, ...props }) => (
    <List
        {...props}
        sort={{
            field: 'name',
            order: 'ASC'
        }}
        title="Countries"
        actions={<ActionsWithExcel />}
        filters={<Filters />}
        filterDefaultValues={{
            "updated-at-leq": moment().utc().endOf('day').toISOString(),
            "updated-at-geq": moment().utc().startOf('day').toISOString(),
        }}
    >
            <Responsive
                medium={
                    <Datagrid classes={{ table: classes.table }}>
                        <TextField source="name" />
                        <TextField 
                            source="region" 
                            headerClassName={classes.hiddenOnSmallScreens}
                            cellClassName={classes.hiddenOnSmallScreens}                             
                        />
                        <TextField 
                            source="subregion" 
                            headerClassName={classes.hiddenOnSmallScreens}
                            cellClassName={classes.hiddenOnSmallScreens}                            
                            />
                        <ChipField 
                            source="currency-code" 
                            label="Currency" />
                        <NumberField 
                            source="effective-exchange-rate" 
                            label="XCR" 
                            options={{ maximumFractionDigits: 6 }}
                            sortable={false} 
                        />                            
                        <FunctionField
                            label="Dial"
                            render={record => `${record["international-prefix"]}${record["country-code"]}`}
                        />
                        <ChipField 
                            source="alpha3" 
                            label="Alpha-3" 
                        />
                        <FlagField 
                            style={{ textAlign: 'center' }} 
                            source="alpha3" 
                            label="Flag" 
                            sortable={false} 
                        />
                        <DateField 
                            showTime 
                            source="updated-at" 
                            label="Last Update" 
                            headerClassName={classes.hiddenOnSmallScreens}
                            cellClassName={classes.hiddenOnSmallScreens}                             
                        />
                        <PrintToPdf />
                        <EditButton />
                        <ShowButton />
                    </Datagrid>
                }
            />
    </List>
);

export const CountryList = withStyles(styles)(PlainCountryList)

const CountryTitle = ({ record }) => record
    ? <span>{record.name}</span>
    : null;

export const CountryEdit = (props) => (
    <Edit
    title={<CountryTitle />}
    {...props}>
    <SimpleForm
        redirect={false}>           
        <DateField utc source="created-at" />
        <DateField utc source="updated-at" />    
        <TextInput source="name"/>
        <TextField source="international-prefix" />          
        <TextField source="country-code" />
        <TextField source="alpha3" />
        <TextField source="world-region" />
        <TextField source="region" />
        <TextField source="subregion" /> 
        <TextField source="currency-code" />        
        <TextField source="currency-name" />        
        <TextField source="currency-symbol" />  
        <SelectArrayInput source="timezones" choices={timezones} options={{ fullWidth: true, disabled: true }} /> 
    </SimpleForm>
  </Edit>
);

export const CountryShow = (props) => (
    <Show title={<CountryTitle />}{...props}>
        <SimpleShowLayout>
            <DateField utc showtime source="created-at" label="Created at" />
            <DateField utc showtime source="updated-at" label="Updated at" />
            <TextField source="international-prefix" label="International prefix" />
            <TextField source="country-code" label="Country code" />
            <TextField source="alpha3" label="Alpha3" />
            <TextField source="world-region" label="World region" />
            <TextField source="region" label="Region" />
            <TextField source="subregion" label="Subregion" />
            <TextField source="currency-code" label="Currency code" />
            <TextField source="currency-name" label="Currency name" />
            <TextField source="currency-symbol" label="Currency symbol" />
        </SimpleShowLayout>
    </Show>
);