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
        start: '2025-06-07T13:00:00',
        eventType: 'Social',
        extendedProps: {
            location: `Andy's Back Garden`,
            locationURL: 'https://maps.app.goo.gl/ovmAc6gVjGjjT7hi9',
            duration: '4 hours',
            guidance: `Please bring:
            - A plate of food to share
            - Your own drinks
            - A chair if possible
            - Sunscreen and a hat if it's sunny and an umbrella if it's not!
            
            After the BBQ we'll head to [Heron on the Lake](https://maps.app.goo.gl/DUENfuohF1N5b7rq6) for drinks.`,
            photosURL: 'https://app.box.com/s/tr4kih7u7bv0oc77j676uyo8yym2ui29'
        }
    },
    // Beginner Rides
        {
        title: 'Beginner Ride',
        start: '2025-04-26T09:45:00',
        eventType: 'Beginner Ride',
        extendedProps: {
            meetLocation: 'Pedal Heaven, Fleet',
            meetLocationURL: 'https://maps.app.goo.gl/ovmAc6gVjGjjT7hi9',
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
            meetLocationURL: 'https://maps.app.goo.gl/ovmAc6gVjGjjT7hi9',
            duration: '30-60 minutes, average 6-8mph (9.5-13kph)',
            guidance: `These are very social off-road rides, everyone helps and supports each other. They are just about getting out and riding, we don't care what you ride or what you wear, but please have appropriate tyres for the off-road conditions (muddy over Autumn/Winter!).<br>
                        No bike, no problem! We have a couple of suitable bikes that we lend out if you wish to try out a ride.<br>
                        Whether you are just starting out on your riding journey or want to use cycling to get a healthier lifestyle, this is an ideal starting point.`
        }
    },

    // Regular Rides
    {
        title: 'Regular Ride - Mytchett',
        start: '2025-06-21T09:30:00',
        eventType: 'Regular Ride',
        extendedProps: {
            destination: 'Mytchett',
            rideDistance: '17 miles',
            rideDuration: '1.5-2 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: `https://maps.app.goo.gl/nPWoEP72g2LS9NqW6`,
            guidance: `Out along the canal to Mytchet Canal Centre cafe. Return via Canal and a short cut via North Camp.`
        }
    },
    {
        title: 'Regular Ride - Odiham',
        start: '2025-06-28T09:30:00',
        eventType: 'Regular Ride',
        extendedProps: {
            destination: 'Odiham',
            rideDistance: '18 miles',
            rideDuration: '1.5-2 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: `https://maps.app.goo.gl/nPWoEP72g2LS9NqW6`,
            guidance: `Out along the canal to Odiham, stop at Cafe in Odiham high street. Return via section of King Alfreds Way (KAW) and canal.`
        }
    },
    {
        title: 'Regular Ride - Lake House',
        start: '2025-07-12T09:30:00',
        eventType: 'Regular Ride',
        extendedProps: {
            destination: 'Lake House',
            rideDistance: '17 miles',
            rideDuration: '1.5-2 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: `https://maps.app.goo.gl/nPWoEP72g2LS9NqW6`,
            guidance: `Out along the canal, around Fleet Pond, section of canal, then through to North Camp, on to the Lake House. Return via canal.`
        }
    },

    // Longer Rides
    {
        title: 'Lock, Stock and Barrel',
        start: '2024-02-17T09:30:00',
        eventType: 'Longer Ride',
        extendedProps: {
            destination: 'Bisley, National Shooting Centre (NSC)',
            rideDistance: '27 miles',
            rideDuration: '3.5 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: `https://maps.app.goo.gl/nPWoEP72g2LS9NqW6`,
            guidance: `Easy going along towpath, Cafe at NSC.`,
            rideNotes: `4 went.<br>
            09:30 Start<br>
            Towpath was wet and muddy, it made for slow going.<br>
            11:00 - 1 hr 30 mins, arrived at NSC Cafe, great breakfast...uphill on way back! lol<br>
            13:00 - 3 hrs 30 mins, back in Fleet, 27 miles`,
            routeMapURL: 'ride-maps/lock-stock-and-barrel.jpg',  
            photosURL: 'https://app.box.com/s/pyjj7jaceavybr0tw3ux262y343375as'
        }
    }
]