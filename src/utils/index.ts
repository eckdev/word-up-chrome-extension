export const getFormattedDate = (date: Date) => {
  if (date) {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(d);
    return formattedDate;
  }
  return "";
};

export const answerStatus = {
  passed: "passed",
  success: "success",
  failed: "failed"
}