export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export function getElapsedDays(startDate: Date): number {
  const msInDay = 24 * 60 * 60 * 1000;

  return Math.floor((new Date().getTime() - startDate.getTime()) / msInDay);
}

export function formatDate(date: string) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatDateForCard(date: string) {
  const formatCurrentDate = formatDate(date);
  const month = formatCurrentDate.substring(0, 3);
  const day = formatCurrentDate.split(',')[0].slice(-2);
  return `${month} ${day}`;
}
