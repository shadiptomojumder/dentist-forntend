import { parseISO, compareAsc, isToday, isTomorrow } from 'date-fns';

// Custom sorting function
const SortByDate = (rowA:any, rowB:any) => {
  const dateA = parseISO(rowA.original.appointmentDate);
  const dateB = parseISO(rowB.original.appointmentDate);

  // Compare dates using date-fns for a more reliable comparison
  if (isToday(dateA)) return -1; // Today comes first
  if (isToday(dateB)) return 1;

  if (isTomorrow(dateA)) return -1; // Tomorrow comes after today
  if (isTomorrow(dateB)) return 1;

  // Otherwise, sort in ascending order
  return compareAsc(dateA, dateB);
};

export default SortByDate;