import { format as _format } from "date-fns";

export const formatDate = (date, format = "MM.dd.yyyy") => {
  return _format(new Date(date), format);
};
