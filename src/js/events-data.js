/**
 * Calendar events data for the cycling club
 * Each event includes ride details, guidance, and related resources
 */
export const calendarEvents = [
  {
    title: 'Alice in Wonderland',
    start: '2025-06-14T09:00:00',
    extendedProps: {
      rideType: 'Longer Ride',
      departureTime: '09:00',
      departLocation: 'Regular Meeting Point',
      distance: '38 miles',
      rideTime: '3 hours',
      guidance: `Mixed riding including Tarmac, a fun challenging ride!
This is not the usual near flat ride!
Clockwise loop to Guildford, via Ash, Pirbright, Guildford
Lunch stop at Watts Gallery
Then onto Farnham and Fleet
Make sure you have plenty of fluids and snacks`,
      rideNotes: '',
      ridePhotosURL: 'https://app.box.com/s/8x8r3uwnpdknokz5fbxnmq03pouj3e9x'
    }
  },
  {
    title: 'Thursday Training Ride',
    start: '2025-06-12T18:00:00',
    extendedProps: {
      rideType: 'Training',
      departureTime: '18:00',
      departLocation: 'Fleet Hargate Sports Ground',
      distance: '20 miles',
      rideTime: '2 hours',
      guidance: 'Intermediate level, faster-paced ride, average speed 16-18mph',
      rideNotes: 'Chain gang formation practice. Bring lights if staying out late. No cafe stop.',
      ridePhotosURL: 'https://example.com/rides/2025-06-12'
    }
  },
  {
    title: 'Saturday Adventure Ride',
    start: '2025-06-14T08:00:00',
    extendedProps: {
      rideType: 'Adventure',
      departureTime: '08:00',
      departLocation: 'Fleet Church Car Park',
      distance: '45 miles',
      rideTime: '6 hours',
      guidance: 'Experienced riders, mixed terrain, average speed 14-16mph',
      rideNotes: 'Long route with gravel sections. Two cafe stops planned. Bring spare tubes and tools. Route includes some challenging climbs.',
      ridePhotosURL: 'https://example.com/rides/2025-06-14'
    }
  }
]
