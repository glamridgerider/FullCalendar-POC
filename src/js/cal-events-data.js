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
    //  Social Events
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
    // Beginner Rides
        {
        title: 'Beginner Ride',
        start: '2025-04-26T09:45:00',
        eventType: 'Beginner Ride',
        extendedProps: {
            meetLocation: 'Pedal Heaven, Fleet',
            meetLocationURL: 'https://www.google.com/maps/place/Pedal+Heaven/@51.2790949,-0.844389,16z/data=!3m2!4b1!5s0x48742be23c6c5dc3:0xb2e90a085a77fc81!4m6!3m5!1s0x48742be0259a9ee1:0x2d5baa586e814f11!8m2!3d51.2790949!4d-0.844389!16s%2Fg%2F1hc8w2lfk?entry=ttu&g_ep=EgoyMDI1MDYwMy4wIKXMDSoASAFQAw%3D%3D',
            duration: '30-60 minutes, average 6-8mph (9.5-13kph)',
            guidance: `These are very social off-road rides, everyone helps and supports each other. They are just about getting out and riding, we don't care what you ride or what you wear, but please have appropriate tyres for the off-road conditions (muddy over Autumn/Winter!).<br>
                        No bike, no problem! We have a couple of suitable bikes that we lend out if you wish to try out a ride.<br>
                        Whether you are just starting out on your riding journey or want to use cycling to get a healthier lifestyle, this is an ideal starting point.`
        }
    },
    {
        title: 'Beginner Ride',
        start: '2025-05-31T09:45:00',
        eventType: 'Beginner Ride',
        extendedProps: {
            meetLocation: 'Pedal Heaven, Fleet',
            meetLocationURL: 'https://www.google.com/maps/place/Pedal+Heaven/@51.2790949,-0.844389,16z/data=!3m2!4b1!5s0x48742be23c6c5dc3:0xb2e90a085a77fc81!4m6!3m5!1s0x48742be0259a9ee1:0x2d5baa586e814f11!8m2!3d51.2790949!4d-0.844389!16s%2Fg%2F1hc8w2lfk?entry=ttu&g_ep=EgoyMDI1MDYwMy4wIKXMDSoASAFQAw%3D%3D',
            duration: '30-60 minutes, average 6-8mph (9.5-13kph)',
            guidance: `These are very social off-road rides, everyone helps and supports each other. They are just about getting out and riding, we don't care what you ride or what you wear, but please have appropriate tyres for the off-road conditions (muddy over Autumn/Winter!).<br>
                        No bike, no problem! We have a couple of suitable bikes that we lend out if you wish to try out a ride.<br>
                        Whether you are just starting out on your riding journey or want to use cycling to get a healthier lifestyle, this is an ideal starting point.`
        }
    },
    // Regular Rides
    {
        title: 'Regular Ride - Farnham Loop',
        start: '2025-06-21T09:30:00',
        eventType: 'Regular Ride',
        extendedProps: {
            destination: 'Farnham via Canal Path',
            rideDistance: '22 miles',
            rideDuration: '2.5-3 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: `https://www.google.co.uk/maps/place/51%C2%B016'34.9%22N+0%C2%B050'33.0%22W/@51.276367,-0.842491,17z/data=!3m1!4b1!4m4!3m3!8m2!3d51.276367!4d-0.842491?entry=ttu&g_ep=EgoyMDI1MDYwMy4wIKXMDSoASAFQAw%3D%3D`,
            guidance: `Mixed terrain route:
            - Canal towpath to Aldershot
            - Quiet roads through Badshot Lea
            - Coffee stop at Farnham Park
            - Return via North Camp
            
            Moderate pace, no-drop ride.`
        }
    },
    // Longer Rides
    {
        title: 'London Landmarks',
        start: '2025-07-06T09:00:00',
        eventType: 'Longer Ride',
        extendedProps: {
            destination: 'Central London via Thames Path',
            rideDistance: '56 miles',
            rideDuration: '7-8 hours',
            meetLocation: 'Fleet Station',
            meetLocationURL: `https://www.google.co.uk/maps/place/51%C2%B016'34.9%22N+0%C2%B050'33.0%22W/@51.276367,-0.842491,17z/data=!3m1!4b1!4m4!3m3!8m2!3d51.276367!4d-0.842491?entry=ttu&g_ep=EgoyMDI1MDYwMy4wIKXMDSoASAFQAw%3D%3D`,
            guidance: `Long distance adventure:
            - Mainly traffic-free routes
            - Multiple cafe stops
            - Train return option available
            
            Essential items:
            - 2L water minimum
            - Snacks and lunch money
            - Basic tools
            - Train fare for return`,
            rideNotes: `09:00 - 8 riders started from Fleet<br>
            11:00 - Coffee at Hampton Court<br>
            13:00 - Lunch by Tower Bridge<br>
            15:00 - Started return journey<br>
            17:00 - Train from Waterloo<br>
            <br>
            Route was mostly dry with good conditions.`,
            photosURL: 'https://app.box.com/s/example'
        }
    }
]