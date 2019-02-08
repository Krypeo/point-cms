import moment from 'moment';

// TABLE HEIGHT SETTINGS
export const singleTableHeader = 'calc(100vh - 317px)';

// DATE FORMATS
export const todayDate = new Date();
export const currentDateTimestamp = Date.now();
export const DATETIME_FORMAT_API = 'YYYY-MM-DD HH:mm';
export const DATETIME_FORMAT = 'DD.MM.YYYY HH:mm';
export const DATE_FORMAT_API = 'YYYY-MM-DD';
export const DATE_FORMAT = 'DD.MM.YYYY';
export const TIME_FORMAT = 'HH:mm';
export const MONTH_FORMAT = 'MM.YYYY'

export const currentDate = () => moment(todayDate).format(DATE_FORMAT);
export const formatDatetimeTimestamp = (dateString) => Date.now(dateString);
export const formatDatetimeApi = (dateString) => moment(dateString).format(DATETIME_FORMAT_API);
export const formatDatetime = (dateString) => moment(dateString).format(DATETIME_FORMAT);
export const formatDateIso = (dateString) => new Date(dateString).toISOString();
export const formatDateApi = (dateString) => moment(dateString).format(DATE_FORMAT_API);
export const formatDate = (dateString) => moment(dateString).format(DATE_FORMAT);
export const formatTime = (dateString) => moment(dateString).format(TIME_FORMAT);
export const formatMonth = (dateString) => moment(dateString).format(MONTH_FORMAT);