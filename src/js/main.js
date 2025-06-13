// main.js

// Import styles
import '../scss/styles.scss'
import '../css/calendar-styles.css'

// Import Bootstrap from node_modules
import * as bootstrap from 'bootstrap'

// Import FullCalendar and its plugins
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'

// --- CHANGE #1: IMPORT FROM THE NEW DATA LOADER ---
// import { calendarEvents } from './cal-events-data.js' // <-- REMOVE THIS LINE
import { getCalendarEvents } from './g-sheet-data-loader.js' // <-- ADD THIS LINE

// --- CHANGE #2: MAKE THE DOMContentLoaded LISTENER ASYNCHRONOUS ---
document.addEventListener('DOMContentLoaded', async function () {
  // Add scroll detection for navbar
  const nav = document.querySelector('.calendar-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Initialize tooltips for navigation buttons
  function initializeNavTooltips() {
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      const existingTooltip = bootstrap.Tooltip.getInstance(el);
      if (existingTooltip) {
        existingTooltip.dispose();
      }
      new bootstrap.Tooltip(el, {
        placement: 'bottom',
        trigger: 'hover',
        boundary: 'window'
      });
    });
  }
  
  // Initial tooltip setup
  initializeNavTooltips();

  const calendarEl = document.getElementById('calendar')
  const eventModal = document.getElementById('eventModal')
  const currentMonthYear = document.getElementById('currentMonthYear')
  let modal = null
  let isLoading = false
  
  if (!calendarEl || !eventModal) {
    console.error('Required elements not found')
    return
  }

  // Initialize Bootstrap modal
  modal = new bootstrap.Modal(eventModal, {
    backdrop: true,
    keyboard: true,
    focus: true
  })

  // Handle tooltip cleanup when modal opens/closes
  eventModal.addEventListener('show.bs.modal', () => {
    // Hide and dispose all event tooltips when modal opens
    document.querySelectorAll('.fc-event').forEach(eventEl => {
      if (eventEl.tooltip) {
        eventEl.tooltip.dispose();
        eventEl.tooltip = null;
      }
    });
    // Also dispose nav button tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
      const tooltip = bootstrap.Tooltip.getInstance(el);
      if (tooltip) {
        tooltip.dispose();
      }
    });
  });

  eventModal.addEventListener('hidden.bs.modal', () => {
    // Re-enable tooltips after modal closes
    initializeNavTooltips(); // Re-initialize navigation tooltips first
    
    document.querySelectorAll('.fc-event').forEach(eventEl => {
      // Only recreate if not already exists
      if (!eventEl.tooltip) {
        eventEl.tooltip = new bootstrap.Tooltip(eventEl, {
          title: eventEl.getAttribute('data-bs-original-title'),
          placement: 'auto',
          trigger: 'hover',
          container: 'body',
          html: true,
          boundary: 'window',
          popperConfig: {
            modifiers: [{
              name: 'preventOverflow',
              options: {
                boundary: 'window'
              }
            }]
          }
        });
      }
    });
  });

  // Add loading indicator
  const toggleLoading = (show) => {
    isLoading = show
    const loadingEl = document.getElementById('calendar-loading')
    if (show && !loadingEl) {
      const spinner = document.createElement('div')
      spinner.id = 'calendar-loading'
      spinner.className = 'calendar-loading'
      spinner.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>'
      calendarEl.parentNode.insertBefore(spinner, calendarEl)
    } else if (!show && loadingEl) {
      loadingEl.remove()
    }
  }

  // Format date and time in 24-hour format
  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  // Helper functions for calendar links
  function generateGoogleCalendarLink(event) {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.text,
      details: event.details,
      location: event.location,
      dates: `${event.start?.replace(/[-:]/g, '')}/${event.end?.replace(/[-:]/g, '')}`
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  function generateICSFileLink(event) {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${event.text}`,
      `DTSTART:${event.start?.replace(/[-:]/g, '')}`,
      `DTEND:${event.end?.replace(/[-:]/g, '')}`,
      `DESCRIPTION:${event.details}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n')

    return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`
  }

  // Helper function to setup calendar navigation
  function setupCalendarNavigation(calendar) {
    const prevButton = document.getElementById('prevMonth');
    const nextButton = document.getElementById('nextMonth');
    const todayButton = document.getElementById('today');

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        calendar.prev();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        calendar.next();
      });
    }

    if (todayButton) {
      todayButton.addEventListener('click', () => {
        calendar.today();
      });
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch(e.key) {
        case 'ArrowLeft':
          if (e.ctrlKey || e.metaKey) {
            calendar.prev();
          }
          break;
        case 'ArrowRight':
          if (e.ctrlKey || e.metaKey) {
            calendar.next();
          }
          break;
        case 't':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            calendar.today();
          }
          break;
      }
    });
  }

  // --- CHANGE #3: WRAP CALENDAR INITIALIZATION IN A TRY/CATCH/FINALLY BLOCK ---
  let calendar;
  try {
    toggleLoading(true);

    // Await the data from Google Sheets
    const eventsFromGSheet = await getCalendarEvents();
    
    // Now that we have the data, initialize the calendar
    calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, bootstrap5Plugin],
      themeSystem: 'bootstrap5',
      initialView: 'dayGridMonth',
      headerToolbar: false, // Disable default header
      fixedWeekCount: false, // Only show the rows needed for the current month
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      },
      loading: function(isLoading) {
        toggleLoading(isLoading)
      },
      eventDidMount: function(info) {
        // ... (This function remains unchanged)
        const rideType = info.event.extendedProps.eventType || info.event.extendedProps.rideType
        if (rideType) {
          info.el.setAttribute('data-ride-type', rideType)
        }
        let displayTime;
        if (info.event.extendedProps.departureTime) {
          displayTime = info.event.extendedProps.departureTime;
        } else if (info.event.start) {
          displayTime = info.event.start.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          });
        } else {
          displayTime = 'TBA';
        }
        if (document.querySelector('.modal.show')) {
          return;
        }
        const tooltipContent = `<div class="event-tooltip">
          <div class="event-tooltip-time">${displayTime}</div>
          <div class="event-tooltip-title">${info.event.title}</div>
        </div>`
        const tooltip = new bootstrap.Tooltip(info.el, {
          title: tooltipContent,
          placement: 'auto',
          trigger: 'hover',
          container: 'body',
          html: true,
          boundary: 'window',
          offset: [0, 8],
          popperConfig: {
            modifiers: [{
              name: 'preventOverflow',
              options: {
                boundary: 'window',
                padding: 8
              }
            }, {
              name: 'flip',
              options: {
                boundary: 'window',
                padding: 8
              }
            }]
          }
        })
        info.el.tooltip = tooltip;
      },
      datesSet: function(info) {
        // ... (This function remains unchanged)
        const date = info.view.currentStart
        const formatOptions = {
          month: 'long',
          year: 'numeric'
        }
        if (info.view.type !== 'dayGridMonth') {
          formatOptions.day = 'numeric'
        }
        currentMonthYear.textContent = new Intl.DateTimeFormat('en-US', formatOptions).format(date)
      },
      buttonIcons: {
        prev: 'chevron-left',
        next: 'chevron-right'
      },
      eventClick: function(info) {
        // ... (This ENTIRE function remains unchanged, as the data structure is the same)
        info.jsEvent.preventDefault()

        const event = info.event
        const modalTitle = document.getElementById('modalTitle')
        const modalBody = document.getElementById('modalBody')
        const gcalLink = document.getElementById('gcal-link')
        const icsLink = document.getElementById('ics-link')

        modalTitle.textContent = event.title
        const startDate = formatDateTime(event.start)
        const endDate = event.end ? formatDateTime(event.end) : ''
        const props = event.extendedProps || {}
        const processedGuidance = convertUrlsToLinks(props.guidance || 'No specific guidance provided.')
        const content = document.createElement('div');
        content.className = 'event-details';

        const rideType = props.eventType || props.rideType || 'Ride';
        eventModal.setAttribute('data-ride-type', rideType);
        
        const rideHeader = document.createElement('div');
        rideHeader.className = 'ride-header mb-3';
        rideHeader.innerHTML = `
          <p class="mb-0">
            <strong>Date:</strong> ${startDate}
            ${endDate ? `<br><strong>End:</strong> ${endDate}` : ''}
          </p>
        `;
        content.appendChild(rideHeader);
        const rideLogistics = document.createElement('div');
        rideLogistics.className = 'ride-logistics mb-3';
        const logisticsContent = [];
        logisticsContent.push('<h6 class="details-section-title">Event Details</h6>');
        const isSocialEvent = rideType === 'Social';
        if (isSocialEvent) {
          if (props.location) {
            const locationURL = props.locationURL;
            logisticsContent.push(`<p class="mb-2">
              <strong>Location:</strong> ${props.location}
              ${locationURL ? `<a href="${locationURL}" target="_blank" class="ms-2 text-primary" aria-label="View location on map"><i class="bi bi-geo-alt-fill" aria-hidden="true"></i></a>` : ''}
            </p>`);
          }
          if (props.duration) {
            logisticsContent.push(`<p class="mb-2"><strong>Duration:</strong> ${props.duration}</p>`);
          }
        } else if (rideType === 'Beginner Ride') {
          if (props.meetLocation) {
            const locationURL = props.meetLocationURL;
            logisticsContent.push(`<p class="mb-2">
              <strong>Meeting Point:</strong> ${props.meetLocation}
              ${locationURL ? `<a href="${locationURL}" target="_blank" class="ms-2 text-primary" aria-label="View location on map"><i class="bi bi-geo-alt-fill" aria-hidden="true"></i></a>` : ''}
            </p>`);
          }
          if (props.duration) {
            logisticsContent.push(`<p class="mb-2"><strong>Duration:</strong> ${props.duration}</p>`);
          }
        } else {
          if (props.destination) {
            logisticsContent.push(`<p class="mb-2"><strong>Destination:</strong> ${props.destination}</p>`);
          }
          if (props.distance || props.rideDistance) {
            logisticsContent.push(`<p class="mb-2"><strong>Distance:</strong> ${props.distance || props.rideDistance || 'TBA'}</p>`);
          }
          if (props.duration || props.rideTime || props.rideDuration) {
            logisticsContent.push(`<p class="mb-2"><strong>Duration:</strong> ${props.duration || props.rideTime || props.rideDuration || 'TBA'}</p>`);
          }
          if (props.departureTime) {
            logisticsContent.push(`<p class="mb-2"><strong>Start Time:</strong> ${props.departureTime}</p>`);
          }
          if (props.meetLocation || props.departLocation) {
            const location = props.meetLocation || props.departLocation;
            const locationURL = props.meetLocationURL || props.departLocationURL;
            logisticsContent.push(`<p class="mb-2">
              <strong>Meeting Point:</strong> ${location}
              ${locationURL ? `<a href="${locationURL}" target="_blank" class="ms-2 text-primary" aria-label="View location on map"><i class="bi bi-geo-alt-fill" aria-hidden="true"></i></a>` : ''}
            </p>`);
          }
        }
        rideLogistics.innerHTML = logisticsContent.join('');
        content.appendChild(rideLogistics);

        const rideInfo = document.createElement('div');
        rideInfo.className = 'ride-info mb-3';
        const guidanceTitle = document.createElement('h6');
        guidanceTitle.className = 'details-section-title';
        guidanceTitle.textContent = 'Guidance';
        rideInfo.appendChild(guidanceTitle);
        const guidanceText = document.createElement('div');
        guidanceText.className = 'guidance-text mb-2';
        if (props.guidance) {
            const lines = props.guidance.split('\n');
            let html = '';
            let inList = false;
            for (const line of lines) {
                const trimmedLine = line.trim();
                if (!trimmedLine) continue;
                if (trimmedLine.startsWith('>') || trimmedLine.startsWith('-')) {
                    if (!inList) {
                        html += '<ul class="guidance-list">';
                        inList = true;
                    }
                    html += `<li>${trimmedLine.replace(/^[>-]\s*/, '').trim()}</li>`;
                } else {
                    if (inList) {
                        html += '</ul>';
                        inList = false;
                    }
                    html += `<p>${trimmedLine}</p>`;
                }
            }
            if (inList) {
                html += '</ul>';
            }
            guidanceText.innerHTML = convertUrlsToLinks(html);
        } else {
            guidanceText.innerHTML = 'No specific guidance provided.';
        }
        rideInfo.appendChild(guidanceText);
        content.appendChild(rideInfo);

        if (props.rideNotes) {
          const rideNotes = document.createElement('div');
          rideNotes.className = 'ride-notes mb-3';
          const notesTitle = document.createElement('h6');
          notesTitle.className = 'details-section-title';
          notesTitle.textContent = 'Ride Report';
          rideNotes.appendChild(notesTitle);
          const notesText = document.createElement('div');
          notesText.className = 'ride-notes-text';
          const formattedNotes = props.rideNotes.split('\n').map(line => {
            line = line.trim();
            return line.replace(/(\d{1,2}:\d{2})/g, '<strong>$1</strong>');
          }).join('\n');
          notesText.innerHTML = convertUrlsToLinks(formattedNotes);
          rideNotes.appendChild(notesText);
          content.appendChild(rideNotes);
        }

        if (props.routeMapURL || props.photosURL || props.ridePhotosURL || props.ridePhotos) {
          const ridePhotos = document.createElement('div');
          ridePhotos.className = 'ride-photos';
          ridePhotos.innerHTML = `
            <h6 class="details-section-title">${isSocialEvent ? 'Photos' : 'Route & Photos'}</h6>
            <div class="action-buttons d-flex gap-3 justify-content-center">
              ${!isSocialEvent && props.routeMapURL ? `<button class="btn btn-outline-primary flex-fill" data-bs-toggle="modal" data-bs-target="#routeMapModal" data-route-map="${props.routeMapURL}" data-ride-title="${event.title}"><i class="bi bi-map"></i> View Route Map</button>` : ''}
              ${props.photosURL || props.ridePhotosURL ? `<a href="${props.photosURL || props.ridePhotosURL}" target="_blank" class="btn btn-outline-primary ${isSocialEvent ? 'w-50' : 'flex-fill'}"><i class="bi bi-images"></i> View Photos</a>` : ''}
            </div>
          `;
          content.appendChild(ridePhotos);
        }

        modalBody.innerHTML = '';
        modalBody.appendChild(content);

        const eventDetails = {
          text: event.title,
          details: `${props.guidance}\n\n${props.rideNotes || ''}`,
          location: props.departLocation,
          start: event.start?.toISOString(),
          end: event.end?.toISOString()
        }
        gcalLink.href = generateGoogleCalendarLink(eventDetails)
        icsLink.href = generateICSFileLink(eventDetails)
        modal.show()
        modalBody.querySelectorAll('.guidance-text a').forEach(link => {
          link.classList.add('text-primary', 'fw-medium');
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        });
      },
      // --- CHANGE #4: USE THE FETCHED DATA ---
      events: eventsFromGSheet // Use the data we fetched and stored
    });

    // Render calendar and setup navigation
    calendar.render();
    setupCalendarNavigation(calendar);

  } catch (error) {
    console.error("Failed to load and initialize calendar:", error);
    // Display an error message to the user in the calendar container
    calendarEl.innerHTML = `
      <div class="alert alert-danger" role="alert">
        <strong>Error:</strong> Could not load calendar events from the data source. Please try refreshing the page.
      </div>`;
  } finally {
    // This ensures the loading spinner is always removed, even if an error occurs
    toggleLoading(false);
  }

  // Handle route map modal
  const routeMapModal = document.getElementById('routeMapModal');
  if (routeMapModal) {
    // ... (This function remains unchanged)
    routeMapModal.addEventListener('show.bs.modal', function (event) {
      const button = event.relatedTarget;
      const routeMapUrl = button.getAttribute('data-route-map');
      const rideTitle = button.getAttribute('data-ride-title');
      const modalTitle = routeMapModal.querySelector('.modal-title');
      const modalImage = routeMapModal.querySelector('.route-map-image');
      modalTitle.textContent = `Route Map - ${rideTitle}`;
      modalImage.src = routeMapUrl;
      modalImage.alt = `Route map for ${rideTitle}`;
    });
  }

  /**
   * Convert URLs and Markdown-style links to clickable HTML links
   * @param {string} text The text containing URLs or Markdown links
   * @returns {string} HTML with clickable links
   */
  function convertUrlsToLinks(text) {
    // ... (This function remains unchanged)
    if (!text) return 'No specific guidance provided.';
    let processedText = text;
    processedText = processedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
      const sanitizedUrl = encodeURI(url.trim());
      const sanitizedText = linkText.trim().replace(/[<>]/g, '');
      return `<a href="${sanitizedUrl}" target="_blank" rel="noopener noreferrer">${sanitizedText}</a>`;
    });
    const urlRegex = /(?<!["'(\[<])https?:\/\/[^\s<>)"'\]]+/g;
    processedText = processedText.replace(urlRegex, url => {
      const sanitizedUrl = encodeURI(url.trim());
      return `<a href="${sanitizedUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
    return processedText;
  }
  // The createEventContent function is not used in your current logic, so it can be removed or ignored.
})