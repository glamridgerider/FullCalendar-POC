// src/lib/g-sheet-data-loader.js

// --- CONFIGURATION ---
const SPREADSHEET_ID = '1g3KAPlPOIILP1r7wi3xAnnVoR_sQf1uyzjRgEok1N4o';
const sheetConfigs = [
    { eventType: 'Social', gid: '812237924' },
    { eventType: 'Beginner Ride', gid: '487248910' },
    { eventType: 'Regular Ride', gid: '2130799774' },
    { eventType: 'Longer Ride', gid: '1139390984' },
];
// --- END CONFIGURATION ---

/**
 * THE DEFINITIVE FIX: Converts Google's "Date(y,m,d,h,m,s)" string
 * into a standard ISO 8601 string that FullCalendar can read.
 */
function convertGoogleDate(googleDate) {
    if (!googleDate || !googleDate.startsWith('Date(')) {
        return googleDate; // Return as-is if it's not a Google date
    }
    // Extract the numbers from the string: "Date(2025,5,7,13,0,0)" -> [2025, 5, 7, 13, 0, 0]
    const parts = googleDate.match(/\d+/g).map(Number);
    const [year, month, day, hour = 0, min = 0, sec = 0] = parts;

    // Google's month is 0-indexed (0=Jan, 5=June), but the Date object constructor handles this correctly.
    // We create a proper Date object...
    const date = new Date(year, month, day, hour, min, sec);
    
    // ...and then convert it to a clean ISO string, removing the milliseconds part.
    // e.g., "2025-06-07T13:00:00.000Z" -> "2025-06-07T13:00:00"
    return date.toISOString().split('.')[0];
}

function parseGoogleSheetResponse(text) {
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const headers = json.table.cols.map(col => col.label);
    const rows = json.table.rows;
    return rows.map(row => {
        const item = {};
        if (!row.c) return null;
        row.c.forEach((cell, index) => {
            const header = headers[index];
            if (header) {
                let value = cell ? cell.v : null;
                // Sanitize newlines to prevent other parsing issues
                if (typeof value === 'string') {
                    value = value.replace(/(\r\n|\n|\r)/gm, " ");
                }
                // Apply the date conversion specifically to the 'start' field
                if (header === 'start') {
                    value = convertGoogleDate(value);
                }
                item[header] = value;
            }
        });
        return item;
    }).filter(item => item !== null);
}

export async function getCalendarEvents() {
    const fetchPromises = sheetConfigs.map(config => {
        const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&gid=${config.gid}`;
        return fetch(url).then(res => res.text()).then(text => {
            return parseGoogleSheetResponse(text).map(item => {
                const { id, status, title, start, ...extendedProps } = item;
                if (!status || status.toLowerCase() !== 'published') return null;
                return { id, title, start, eventType: config.eventType, extendedProps };
            }).filter(Boolean);
        }).catch(error => {
            console.error(`Error processing sheet "${config.eventType}":`, error);
            return [];
        });
    });
    const results = await Promise.all(fetchPromises);
    return results.flat();
}