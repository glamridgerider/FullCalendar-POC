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
    },
    {
        title: 'War of the Worlds',
        start: '2024-03-09T09:30:00',
        eventType: 'Longer Ride',
        extendedProps: {
            destination: 'Woking',
            rideDistance: '36 miles',
            rideDuration: '4.5 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: `https://maps.app.goo.gl/nPWoEP72g2LS9NqW6`,
            guidance: `Easy going along towpath, H.G. Wells statue, Martian Alien Tripod sculpture, Cafe at The Lightbox Art Gallery.`,
            rideNotes: `5 went.<br>
            09:30 start<br>
            The weather was good, but again the towpath was wet and muddy.<br>
            12:20 - 2 hrs 50 mins, arrived at the Lightbox cafe, great coffee and food!<br>
            We had one mechanical which was dealt with whilst at the cafe!<br>
            14:20 - 4 hrs 50 mins back in Fleet, 34 miles, 3hrs 15mins riding time, 10.5 mph average`,
            routeMapURL: 'ride-maps/war-of-the-worlds.jpg',  
            photosURL: 'https://app.box.com/s/qil8kw6fy0f6xy3cl7nywbtpogqebho3'
        }
    },
    {
        title: 'Rags to Riches',
        start: '2024-04-13T09:30:00',
        eventType: 'Longer Ride',
        extendedProps: {
            destination: 'Weybridge',
            rideDistance: '48 miles',
            rideDuration: '7 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: `https://maps.app.goo.gl/nPWoEP72g2LS9NqW6`,
            guidance: `Easy going along towpath. All options for shorter rides and trains from Brookwood (14m), Woking (18m), Weybridge (24m)`,
            rideNotes: `5 set out, we met one more on the way, 5 and half? :)<br>
            09:30 start<br>
            We had a comfort stop at Mytchett Canal cafe.<br>
            12:30 - 3 hrs to Weybridge, we walked through the High St (traffic was heavy !) to Cafe Enzo, great menu and the food and coffee was very good and reasonably priced!<br>
            On the return, another stop at Mytchett canal cafe for tea and ice cream!<br>
            16:20 - 6 hrs 50 mins, back in Fleet 48 miles in total, approx 4hr 40mins ride time, 10mph average`,
            routeMapURL: 'ride-maps/rags-to-riches.jpg',  
            photosURL: 'https://app.box.com/s/qzlko84svemdp5bps2t8pydq5qmwk5we'
        }
    },
    {
        title: 'Burnt Cakes',
        start: '2024-05-11T09:00:00',
        eventType: 'Longer Ride',
        extendedProps: {
            destination: 'Winchester',
            rideDistance: '40 miles',
            rideDuration: '5-6 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: `https://maps.app.goo.gl/nPWoEP72g2LS9NqW6`,
            guidance: `Towpath, cross country, some tarmac. Return by train to Fleet.`,
            rideNotes: `6 started out, only 5 made it back!<br>
            A lovely sunny day.<br>
            Initial stage out on towpath to Greywell. various off road sections are connected with some road sections.<br>
            The off road sections were 'challenging' and seem to become progressively worse, many sections churned up by 4x4s and off road motorbikes.<br>
            About 17 miles into the ride, on one off road section...downhill, gully like, rock strewn...one of us ...(that'll be me, Andy), lost it and hit the deck hard, slamming into the rock floor. I was then grateful for the first aider training of others and I got the joys of an ambulance ride back to Basingstoke hospital - don't worry my bike was fine! :)<br>
            The original ride was abandoned and the 5 riders made their way back to Fleet on the most direct route with a food stop and just one mechanical.`,
            routeMapURL: 'ride-maps/burnt-cakes.jpg',  
            photosURL: 'https://app.box.com/s/qzlko84svemdp5bps2t8pydq5qmwk5we'
        }
    },
    {
        title: 'City Slickers',
        start: '2024-06-08T09:00:00',
        eventType: 'Longer Ride',
        extendedProps: {
            destination: 'London',
            rideDistance: '56 miles',
            rideDuration: '7-8 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: `https://maps.app.goo.gl/nPWoEP72g2LS9NqW6`,
            guidance: `Mainly towpath out to Weybridge, Wey navigation to Thames path, then into London. Train back from Waterloo.`,
            rideNotes: `7 went, a good turnout<br>
            09:00 start<br>
            10:55 - 1 hr 55 mins to The Lightbox, Woking (18 miles). Towpath was firm going, stop for food and coffee, approx 35-40 mins stop.<br>
            12:05 - 3 hrs 5 mins to Weybridge (24 miles) averaging 11 mph to this point.<br>
            13:10 - 4 hrs 10 mins saw us at Hampton Court (32 miles), from here the Thames path is generally in good condition and wide, there are occassional pinch points and can be lots of people, especially in areas with Rowing clubs by the river. It felt as if we were in open countryside for the majority of the way.<br>
            Progress slowed in the last 4 miles as the route sometimes left the river side and also the volume of people increased.<br>
            16:15 - 7 hrs 15 mins, we arrived at Waterloo, hopped on a train and headed back to Fleet!<br>
            17:40 - The train had us back in Fleet<br>
            Overall average 10mph, 57 miles logged<br>
            A great adventure for the day!`,
            routeMapURL: 'ride-maps/city-slickers.jpg',  
            photosURL: 'https://app.box.com/s/yty6xulhhzsh4300snjrw32q2ryjj197'
        }
    },
    {
        title: 'Alice in Wonderland aka Guildford loop',
        start: '2024-07-20T09:00:00',
        eventType: 'Longer Ride',
        extendedProps: {
            destination: 'Guildford',
            rideDistance: '38 miles',
            rideDuration: '6.5 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: `https://maps.app.goo.gl/nPWoEP72g2LS9NqW6`,
            guidance: `Mixed riding including Tarmac, a fun challenging ride!<br>
            Loop to Guildford, via Ash, Pirbright, Guildford<br>
            Coffee stop at Watts Gallery<br>
            Then onto Farnham and Fleet`,
            rideNotes: `9 went, great to see more venturing out on the Longer Rides!<br>
            09:00 Start<br>
            A very varied and mixture of surfaces, different and challenging, mostly dry and hardpacked.<br>
            11:20 - Approx 2 hrs 20 mins to get to Guildford, 19 miles into the ride.<br>
            12:15 - Around 3 hrs 15 mins to Watts Gallery, 22 miles in. A lovely place to stop, the food and coffee was very good, but it took a while to arrive (an hour+).<br>
            14:35 - 5 hrs 40 mins to Farnham....after several hills and then there was the climb out of Farnham!<br>
            15:50 - 6 hrs 50 mins back in Fleet...38 miles<br>
            No major mechanicals<br>
            It was good to see that folks were taking fuel and fluid onboard at every opportunity and it seemed to help, no one seemed to be suffering at the end - a lovely, challenging ride - thanks all.`,
            routeMapURL: 'ride-maps/alice-in-wonderland.jpg',  
            photosURL: 'https://app.box.com/s/x2u7pwv2zm0lry2x6f2b7ib2iaes2kww'
        }
    },
    {
        title: 'Lunch at the Palace',
        start: '2024-08-24T09:00:00',
        eventType: 'Longer Ride',
        extendedProps: {
            destination: 'Hampton Court',
            rideDistance: '64 miles',
            rideDuration: '7.5-8 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: `https://maps.app.goo.gl/nPWoEP72g2LS9NqW6`,
            guidance: `Mainly towpath out to Weybridge, Wey navigation to Thames path, then to Hampton Court for coffee and food.<br>
            Option of ride back or to catch the train from Surbiton. Also options to get train at Brookwood, (14 miles) Woking (18 Miles) and Weybridge (24 miles) for anyone wanting a shorter ride.`,
            rideNotes: `Due to a Yellow weather warning for Sat 24/08, this was rescheduled to Sun 25/08.<br>
            09:00 Just one left from Fleet<br>
            09:30 (5.5 miles) A rendezvous at Ash Lock with Ally meant there were 2!<br>
            09:50 (9 miles) Frimley area and Spike was waiting for us, then there were 3! The going was generally good, even after the previously days rain, the towpath did seem busier than usual, but that might well be due to the day before being a wash out.<br>
            18 miles in and we were at Woking …I think it was new territory for Ally and Spike beyond this point<   
            24 miles saw us in Weybridge and we were stood by the River Wey. We managed to convince Ally to press on to Hampton Court. The scenery is pretty spectacular as we ride alongside the River Thames, the path is wider and there are more folks out and about.<br>
            12:30 (31 miles) and we arrived at Hampton Court. Locked the bikes and headed into ‘Dish’ (well worth a visit)…we sat in the rear courtyard area and enjoyed a great Full English at a reasonable price! The ride out did seem like tough going and the head wind was worse on the return journey! As we rejoined the Basing Canal at Weybridge, sad to see 3 idiots (late teens/early 20s) with their fishing gear, but throwing stones/rocks across the canal at glass office build, they had cracked or smashed several large panes!<br>
            16:15 …finally home. Great riding companions and lovely views!`,
            routeMapURL: 'ride-maps/alice-in-wonderland.jpg',  
            photosURL: 'https://app.box.com/s/x2u7pwv2zm0lry2x6f2b7ib2iaes2kww'
        }
    },
    {
        title: 'DDOTTS - Daft Day Out To The Seaside',
        start: '2024-08-31T08:30:00',
        eventType: 'Longer Ride',
        extendedProps: {
            destination: 'Guildford to Shoreham-by-Sea',
            rideDistance: '76 miles (Max)',
            rideDuration: '10 hours',
            meetLocation: 'Guildford Railway Station, Main entrance',
            meetLocationURL: `https://maps.app.goo.gl/SDx8Dm4iuH8PGEJJ9`,
            guidance: `Old disused railway line route, minimal tarmac, mainly flat going.<br>
            This route is mainly flat going, however things to note :<br>
            > Ensure that you are carrying enough water, aim for 0.5 litres per hour of riding, ideally have 2 litres of water.<br>
            > Ensure that you have suitable snacks and take them onboard at every opportunity, do not wait until you are hungry!<br>
            > We need to maintain a reasonable pace of 10mph all the way there and back, otherwise we are riding in the dark...and no, we do NOT want to be riding in the dark!<br>
            > The schedule:<br>
            - Depart 08:30<br>
            - Approx 10:45 Coffee stop, Southwater Country park (21 miles). Coffee, cake and ensure that you FILL your water bottles<br>
            - 13:00 Sat on the beach at Shoreham-by-Sea and eating. Please bring picnic lunch, we do not go to a cafe.<br>
            - 14:00 or earlier, we need to leave the coast and head back<br>
            - 15:40 Coffee stop, Southwater Country park ..it closes at 16:00! Again FILL your water bottles<br>
            - 18:30 Fingers crossed we are back in Guildford!<br>
            Be prepared, have plenty of water and snacks. The Full Monty is 8 hours of riding and 10 hours start to finish.<br>
            If you are considering opting out at any point, please ensure you know the nearest Railway stations etc and how to get back to Guildford.<br>
            Many options for shorter rides, cafe stop at 21 miles, thus folks can return from there. Various options for trains back to Guildford. All can be catered for!<br>
            1. Ice Cream Run : Ride to Southwater Country Park Cafe - 21 miles each way (42 total)<br>
            2. Sails and Rails : Ride to Shorham by Sea, see the sails/boats and catch the train back, approx 38 miles<br>
            3. Full Monty : Guildford to Shoreham-by-sea and return ....76 miles!`,
            rideNotes: `08:30 Eight folks at the start point, although the start was still delayed by a few mins! The weather was pretty much perfect, overcast, but warm enough<br>
            We did the fiddly bit getting out of Guildford. Lots of help given to the tandem to lift and move it up/down steps and over gates.<br>
            George and Pauline (Tandem riders) dropped out for coffee at about 9 mile mark<br>
            The Super Six carried on ...although we had an unscheduled comfort stop at about 10 miles...the clock ticked on... and a few stops for pics ...we had to press on and hence were riding at around 11mph<br>
            10:50 (21 miles) we made it to the coffee stop at Southwater Country park<br>
            We headed to the beach! ...we had the mandatory puncture on the way<br>
            13:10 (38 miles) we arrived on the beach, Rob had a paddle ...the rest of us fed our faces<br>
            13:50 ...ish ...we started back ...after a few miles we turned off the route for an unscheduled coffee stop (maybe 15-20 mins?) ...Pam and Karen wanted to get a head start and carried on ...We did catch up to them within a few miles...we pressed on<br>
            15:40 (55 miles) We rolled into the scheduled Coffee stop at Southwater Country park again...we are all looking dusty! lol<br>
            18:31 ...we were in Guildford...pretty much bang on time! Well done everyone! ...a very fun and dusty ride! :) Note for next year…run this event earlier in the year to avoid the mud!<br>
            After the ride we found out that Steve had been busy getting his money's worth out of his train ticket...having got from Guildford to Woking ...he then got on a train back to Guildford.....just to do the Guildford to Woking section again ! ...Doh !`,
            routeMapURL: 'ride-maps/DDOTTS.jpg',  
            photosURL: 'https://app.box.com/s/tg0uryd83iq3pti7fmfygzwzlhy4byg5'
        }
    },
    {
        title: 'Through the Looking-Glass',
        start: '2024-09-28T09:00:00',
        eventType: 'Longer Ride',
        extendedProps: {
            destination: 'Reverse Guildford loop+',
            rideDistance: '53 miles',
            rideDuration: '7.5-8 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: `https://maps.app.goo.gl/nPWoEP72g2LS9NqW6`,
            guidance: `Mixed riding including Tarmac, a fun challenging ride!<br>
            Anti-clockwise loop to Guildford, via Caesars Camp, Farnham<br>
            Coffee/food stop : Guildford (Theatre cafe) with optional 2nd coffee/comfort stop at The Lightbox Art Gallery, Woking<br>
            Then follow the Wey Navigation towards Weybridge, pick up Basingstoke canal for the return<br>
            For any that want to opt out, train stations at Guildford, Woking and Brookwood`,
            rideNotes: `09:00 Five started out<br>
            09:15 The first ‘fun thing’ of the ride…a broken chain (Andy) …quick link snapped and also a plate on another linked broken. No option but to head home ….the rest headed to Poppys Café (lucky them). Replacement bike collected and arranged a meet point…we lost about 45 minutes!<br>
            We lost the route up Caesars camp and ended up climbing Brick Hill….not even Steve could ride it!<br>
            Many of the tracks were wet and muddy, slowing progress.<br>
            It was similar as we headed down Old Park Lane, many muddy patches.<br>
            The situation continued as we climbed and descended, water and mud, making it difficult to maintain any reasonable speed and difficult to get traction on climbs.<br>
            13:00 (20 miles, 4 hours) Arrived in Guildford, where we follow the rules and walked down “Porridge Pot Alley” only to get shouted at by an older women ….as she was late and in a hurry! …..maybe she was the White Rabbit?<br>
            The Café had a reasonable selection, we all stocked up!<br>
            13:45 Left the café and headed back out on the route. Steve decided to be sensible (very strange …lol ) and get the train back and protect his dodgy knee…so then there were 4 of us.<br>
            The Wey navigation track was narrow, rutted, muddy, wet and slow going ! Along the route we had a chain off (Neil) …and a fall into nettles (Karen) ….then issues with cramp set in for Spike.<br>
            We stopped at pub in Send (approx 30 miles) and Spike got crisps (for the salt), Neil opted out and headed home by road, then there were THREE ! Spike was suffering and we needed frequent breaks.<br>
            Just along from the pub, there was a tree down across the path and we had to clamber over.<br>
            Another few miles on and we found the path blocked by a herd cows …we had to navigate through and around<br>
            16:00 (32 miles, 7 hours) …12 miles from Guildford we finally joined the Basingstoke Canal<br>
            16:55 (36 miles, nearly 8 hours) At Woking we cut our losses and caught a train ! …a very eventful day!<br>
            17:25 …ish finally home ! Neil had punctured on his road journey home. So we all had had issues on the day! ….but the sun was out, the weather was good, great company and all seemed to enjoy!<br>
            Note for next year…run this event earlier in the year to avoid the mud!<br>
            After the ride we found out that Steve had been busy getting his money's worth out of his train ticket...having got from Guildford to Woking ...he then got on a train back to Guildford.....just to do the Guildford to Woking section again ! ...Doh !`,
            routeMapURL: 'ride-maps/through-the-looking-glass.jpg',  
            photosURL: 'https://app.box.com/s/hd5mqhr6h2n5rn85slw9dbueacf2yeqo'
        }
    },
    {
        title: 'War of the Worlds',
        start: '2024-10-26T09:30:00',
        eventType: 'Longer Ride',
        extendedProps: {
            destination: 'Woking',
            rideDistance: '36 miles',
            rideDuration: '5 hours',
            meetLocation: 'Regular Meeting Point',
            meetLocationURL: `https://maps.app.goo.gl/nPWoEP72g2LS9NqW6`,
            guidance: `Easy going along towpath, there is likely to be some mud and puddles.<br>
            H.G. Wells statue, Martian Alien Tripod sculpture, Cafe at The Lightbox Art Galley.`,
            rideNotes: `09:30 Start...well for 5 of us ...for Steve this proved 'challenging' ..lol....<br>
            We shared our live location as we were also meeting up with a new rider (Hi Jeico). We found Jeico at Ash lock and headed onwards.<br>
            Steve finally caught up with us just after Mytchett Canal boat centre (about 9 miles!)...and seemed a tad out of breath ...lol! he'd been chasing for 50 mins!<br>
            Just before getting to Woking, we had a minor mechanical ....a loose quick release allowed a rear wheel to drop out and lock up!<br>
            The mandatory pic of H.G. Wells taken and then to the Cafe.<br>
            The return journey was uneventful with various folks peeling off at points suitable to them with 4 of us arriving back in Fleet. The weather was ideal and a pleasant temp!`,
            routeMapURL: 'ride-maps/war-of-the-worlds.jpg',  
            photosURL: 'https://app.box.com/s/uotful1umddlfpp9654yumomua67n7re'
        }
    },

]