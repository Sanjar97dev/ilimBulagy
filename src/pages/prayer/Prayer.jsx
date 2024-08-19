import React, { useState, useEffect } from "react";
import axios from "axios";
import './Prayer.css'; // Import the CSS file

// Function to calculate the number of days between two dates
const calculateDaysRemaining = (targetDate) => {
  const now = new Date();
  const diffTime = targetDate - now;
  return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 0);
};

const subtractMinutesToTime = (startTime, minutesToSubtract) => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  let minutes = startHours * 60 + startMinutes - minutesToSubtract;
  minutes = Math.max(minutes, 17 * 60 + 43); 

  const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
  const mins = (minutes % 60).toString().padStart(2, '0');
  return `${hours}:${mins}`;
};

const Prayer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get('https://api.aladhan.com/v1/timingsByCity', {
          params: {
            city: 'Bishkek',
            country: 'Kyrgyzstan',
            method: 2,
          }
        });

        const timings = response.data.data.timings;

        const targetDate = new Date('2024-08-31'); // Replace with your actual target date
        const daysRemaining = calculateDaysRemaining(targetDate);

        const totalDays = 30; // For example, if you want the adjustment period to be 30 days
        const minutesToSubtract = totalDays - daysRemaining;

        timings.Asr = subtractMinutesToTime("17:43", minutesToSubtract); 

        setPrayerTimes(timings);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); 

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const timeUntilNextPrayer = (prayerTime) => {
    const [hours, minutes] = prayerTime.split(':').map(Number);
    const prayerDate = new Date();
    prayerDate.setHours(hours);
    prayerDate.setMinutes(minutes);
    prayerDate.setSeconds(0);
    
    const diff = prayerDate - currentTime;
    if (diff < 0) return "намаз убактысы өтүү";
    const hoursDiff = Math.floor(diff / 3600000);
    const minutesDiff = Math.floor((diff % 3600000) / 60000);
    return `${hoursDiff} саат ${minutesDiff} мүнөт`;
  };

  const namaz = [
    { name: "Fajr", label: "Багымдат"},
    { name: "Dhuhr", label: "Бешим" },
    { name: "Asr", label: "Аср" },
    { name: "Maghrib", label: "Шам", },
    { name: "Isha", label: "Куптан"},
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching prayer times</p>;

  return (
    <div className="prayer-container">
      <h1>Намаз убактылары</h1>
      <div className="time">Саат: {formatTime(currentTime)}</div>
      <ul>
        {namaz.map((item) => (
          <li key={item.name}>
            <span>{item.label}</span>
            {prayerTimes[item.name] || "намаз убактысы өтүү"} 
            {prayerTimes[item.name] && `  (${timeUntilNextPrayer(prayerTimes[item.name])})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prayer;
