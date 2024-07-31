import { DocumentData } from "firebase/firestore";

export const groupMessagesByDate = (messages: DocumentData[]) => {
  const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  return messages.reduce((groups, message) => {
    const date = formatter.format(
      new Date((message.timestamp?.seconds || 0) * 1000)
    );
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as { [key: string]: DocumentData[] });
};
