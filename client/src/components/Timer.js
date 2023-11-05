import React, { useEffect, useState } from 'react';

function Timer({ hours, minutes, seconds }) {
  const [time, setTime] = useState({
    hours: hours,
    minutes: minutes,
    seconds: seconds
  });

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
        clearInterval(timerInterval);
      } else {
        if (time.seconds === 0) {
          if (time.minutes === 0) {
            setTime({
              hours: time.hours - 1,
              minutes: 59,
              seconds: 59
            });
          } else {
            setTime({
              hours: time.hours,
              minutes: time.minutes - 1,
              seconds: 59
            });
          }
        } else {
          setTime({
            hours: time.hours,
            minutes: time.minutes,
            seconds: time.seconds - 1
          });
        }
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [time]);

  return (
    <div>
      <p>
        Timer: {String(time.hours).padStart(2, '0')}:{String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
      </p>
    </div>
  );
}

export default Timer;