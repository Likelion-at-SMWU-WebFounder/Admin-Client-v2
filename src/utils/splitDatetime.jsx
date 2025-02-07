const splitDatetime = (object) => {
  const result = {};
  for (let key in object) {
    // seperate value into date and time based on blank
    object[key] = object[key].split(" ");
    const date = object[key][0] + ` (${object[key][1]})`;
    const time = object[key][2];

    // set {date:[time]}
    if (result[date]) {
      result[date].push(time);
    } else {
      result[date] = [time];
    }
  }

  for (let key in result) {
    result[key] = result[key].sort((a, b) => {
      // extract start time
      const startA = a.split("-");
      const startB = b.split("-");

      const timeA = new Date(`1970-01-01T${startA}:00Z`);
      const timeB = new Date(`1970-01-01T${startB}:00Z`);

      // sort in chronological order
      return timeA - timeB;
    });
  }

  return result;
};

export default splitDatetime;
