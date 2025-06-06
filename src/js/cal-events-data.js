/**
 * Calendar events data with typed schemas for the cycling club
 * Includes Social events, Beginner Rides, Regular Rides, and Longer Rides
 */

// Base event schema that all event types share
const baseEventSchema = {
    title: '',
    start: '', // ISO date string
    eventType: '', // 'Social' | 'Beginner Ride' | 'Regular Ride' | 'Longer Ride'
    extendedProps: {
        meetLocation: '',
        meetLocationURL: '',
        guidance: ''
    }
}

export const calendarEvents = [
    {
        title: 'Summer BBQ 2025',
        start: '2025-07-20T13:00:00',
        eventType: 'Social',
        extendedProps: {
            location: `Andy's Garden`,
            locationURL: 'https://www.google.com/maps/place/...',
            duration: '4 hours',
            guidance: `Please bring:
            - A plate of food to share
            - Your own drinks
            - A chair if possible
            
            After the BBQ we'll head to [The Fox](https://www.google.com/maps/place/...) for drinks.`,
            photosURL: 'https://app.box.com/s/example'
        }
    },
    {
        title: 'First Steps - Canal Path',
        start: '2025-06-14T10:00:00',
        eventType: 'Beginner Ride',
        extendedProps: {
            meetLocation: 'Fleet Station Car Park',
            meetLocationURL: 'https://www.google.com/maps/place/...',
            duration: '60-90 minutes',
            guidance: `Perfect for new riders:
            - Flat terrain
            - Mostly traffic-free
            - Plenty of rest stops
            - Experienced ride leader
            
            Please bring water and a snack.`
        }
    },
    {
        title: 'Regular Ride - Farnham Loop',
        start: '2025-06-21T09:30:00',
        eventType: 'Regular Ride',
        extendedProps: {
            destination: 'Farnham via Canal Path',
            rideDistance: '22 miles',
            rideDuration: '2.5-3 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: 'https://www.google.com/maps/place/The+Views+Recreation+Ground+Car+Park/@51.2966581,-0.7557221,17z',
            guidance: `Mixed terrain route:
            - Canal towpath to Aldershot
            - Quiet roads through Badshot Lea
            - Coffee stop at Farnham Park
            - Return via North Camp
            
            Moderate pace, no-drop ride.`
        }
    },
    {
        title: 'London Landmarks',
        start: '2025-07-06T09:00:00',
        eventType: 'Longer Ride',
        extendedProps: {
            destination: 'Central London via Thames Path',
            rideDistance: '56 miles',
            rideDuration: '7-8 hours',
            meetLocation: 'Fleet Station',
            meetLocationURL: 'https://www.google.com/maps/place/...',
            guidance: `Long distance adventure:
            - Mainly traffic-free routes
            - Multiple cafe stops
            - Train return option available
            
            Essential items:
            - 2L water minimum
            - Snacks and lunch money
            - Basic tools
            - Train fare for return`,
            rideNotes: `Previous ride notes:
            09:00 - 8 riders started from Fleet
            11:00 - Coffee at Hampton Court
            13:00 - Lunch by Tower Bridge
            15:00 - Started return journey
            17:00 - Train from Waterloo
            
            Route was mostly dry with good conditions.`,
            photosURL: 'https://app.box.com/s/example'
        }
    }
]