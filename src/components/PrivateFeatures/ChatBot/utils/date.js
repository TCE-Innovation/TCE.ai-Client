import { format as _format, getTime } from "date-fns";

export const formatDate = (date, format = "MM.dd.yyyy") => {
  return _format(new Date(date), format);
};

/**
 *
 * @param {Array} array
 * @param {String} property
 */
export const sortArray = (array, property) => {
  return array.sort((a, b) => {
    const d1 = getTime(new Date(a[property]));
    const d2 = getTime(new Date(b[property]));
    return d1 > d2 ? -1 : 1;
  });
};
