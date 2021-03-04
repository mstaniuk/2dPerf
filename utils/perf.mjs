const timers = {};

function initMeasurement(name, {
  printListAfterTime,
  printAvgAfterTime,
}) {
  timers[name] = [];

  if (printListAfterTime) {
    setTimeout(() => {
      // Since last element may still be the "start time" we will remove it.
      const list = timers[name].slice(0, -1);
      console.log(name, list);
    }, printListAfterTime);
  }

  if (printAvgAfterTime) {
    setTimeout(() => {
      // Since last element may still be the "start time" we will remove it.
      const list = timers[name].slice(0, -1);
      console.log(`${name}: ${(list.reduce((a, b) => a + b, 0) / list.length).toFixed(4).replace('.', ',')}`);
    }, printAvgAfterTime);
  }
}


function startMeasurement(name) {
  timers[name].push(performance.now());
}

function endMeasurement(name) {
  const endTime = performance.now();
  const lastMeasurementIndex = timers[name].length - 1;
  const lastMeasurementValue = timers[name][lastMeasurementIndex];
  timers[name][lastMeasurementIndex] = endTime - lastMeasurementValue;
}

export {
  initMeasurement,
  startMeasurement,
  endMeasurement,
}
