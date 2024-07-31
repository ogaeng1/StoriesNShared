import moment from "moment";

export const getCreatedAt = (timestamp: number): string => {
  const now = moment();
  const postingDate = moment(timestamp * 1000);
  const minutesDiff = now.diff(postingDate, "minutes");
  const hoursDiff = now.diff(postingDate, "hours");
  const daysDiff = now.diff(postingDate, "days");
  const monthsDiff = now.diff(postingDate, "months");
  const yearsDiff = now.diff(postingDate, "years");

  if (minutesDiff < 1) {
    return "방금 전";
  } else if (minutesDiff >= 1 && minutesDiff < 60) {
    return `${minutesDiff}분 전`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff}시간 전`;
  } else if (daysDiff === 1) {
    return "하루 전";
  } else if (daysDiff > 1 && daysDiff < 30) {
    return `${daysDiff}일 전`;
  } else if (monthsDiff < 12) {
    return `${monthsDiff}달 전`;
  } else {
    return `${yearsDiff}년 전`;
  }
};
