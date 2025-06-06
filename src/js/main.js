// Import styles
import '../scss/styles.scss'
import '../css/calendar-styles.css'

// Import Bootstrap from node_modules
import * as bootstrap from 'bootstrap'

// Import FullCalendar and its plugins
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import { calendarEvents } from './events-data.js'

document.addEventListener('DOMContentLoaded', function () {
  // Add scroll detection for navbar
  const nav = document.querySelector('.calendar-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Initialize all tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

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

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, bootstrap5Plugin],
    themeSystem: 'bootstrap5',
    initialView: 'dayGridMonth',
    headerToolbar: false, // Disable default header
    fixedWeekCount: false, // Only show the rows needed for the current month
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    loading: function(isLoading) {
      toggleLoading(isLoading)
    },
    eventDidMount: function(info) {
      // Add ride type as data attribute for styling
      const rideType = info.event.extendedProps.rideType
      if (rideType) {
        info.el.setAttribute('data-ride-type', rideType)
      }

      // Create structured tooltip with formatted time and title
      const departureTime = info.event.extendedProps.departureTime || 'TBA'
      const tooltipContent = `<div class="event-tooltip">
        <div class="event-tooltip-time">${departureTime}</div>
        <div class="event-tooltip-title">${info.event.title}</div>
      </div>`
      
      new bootstrap.Tooltip(info.el, {
        title: tooltipContent,
        placement: 'auto',
        trigger: 'hover',
        container: 'body',
        html: true,
        boundary: 'window',
        popperConfig: {
          modifiers: [{
            name: 'preventOverflow',
            options: {
              boundary: 'window',
              padding: 8
            }
          }]
        }
      })
    },
    datesSet: function(info) {
      // Update the current month/year text
      const date = info.view.currentStart
      const formatOptions = {
        month: 'long',
        year: 'numeric'
      }
      // Add day for day/week views
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
      // Prevent the default action
      info.jsEvent.preventDefault()

      const event = info.event
      const modalTitle = document.getElementById('modalTitle')
      const modalBody = document.getElementById('modalBody')
      const gcalLink = document.getElementById('gcal-link')
      const icsLink = document.getElementById('ics-link')

      // Set modal title
      modalTitle.textContent = event.title

      // Format modal body content
      const startDate = formatDateTime(event.start)
      const endDate = event.end ? formatDateTime(event.end) : ''
      const props = event.extendedProps || {}

      // Convert guidance text to HTML
      const processedGuidance = convertUrlsToLinks(props.guidance || 'No specific guidance provided.')

      // Create the modal content with HTML-safe interpolations
      const content = document.createElement('div');
      content.className = 'event-details';

      // Create ride header and set ride type
      const rideType = props.rideType || 'Ride';
      eventModal.setAttribute('data-ride-type', rideType);
      
      const rideHeader = document.createElement('div');
      rideHeader.className = 'ride-header mb-3';
      rideHeader.innerHTML = `
        <span class="badge" data-ride-type="${rideType}">${rideType}</span>
        <p class="mt-2 mb-0">
          <strong>Date:</strong> ${startDate}
          ${endDate ? `<br><strong>End:</strong> ${endDate}` : ''}
        </p>
      `;
      content.appendChild(rideHeader);

      // Create ride logistics
      const rideLogistics = document.createElement('div');
      rideLogistics.className = 'ride-logistics mb-3';
      rideLogistics.innerHTML = `
        <h6 class="details-section-title">Ride Details</h6>
        ${props.destination ? `<p class="mb-2"><strong>Destination:</strong> ${props.destination}</p>` : ''}
        <p class="mb-2"><strong>Distance:</strong> ${props.distance || 'TBA'}</p>
        <p class="mb-2"><strong>Duration:</strong> ${props.rideTime || 'TBA'}</p>
        <p class="mb-2"><strong>Departure Time:</strong> ${props.departureTime || 'TBA'}</p>
        <p class="mb-2">
          <strong>Meeting Point:</strong> ${props.departLocation || 'TBA'}
          ${props.departLocationURL ? `
            <a href="${props.departLocationURL}" target="_blank" class="ms-2 text-primary" aria-label="View meeting point on map">
              <i class="bi bi-geo-alt-fill" aria-hidden="true"></i>
            </a>
          ` : ''}
        </p>
      `;
      content.appendChild(rideLogistics);

      // Create ride guidance with properly sanitized HTML content
      const rideInfo = document.createElement('div');
      rideInfo.className = 'ride-info mb-3';
      
      const guidanceTitle = document.createElement('h6');
      guidanceTitle.className = 'details-section-title';
      guidanceTitle.textContent = 'Guidance';
      rideInfo.appendChild(guidanceTitle);
      
      const guidanceText = document.createElement('div');
      guidanceText.className = 'guidance-text mb-2';
      
      // Format guidance text, handling bullet points properly
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

      // Add optional ride notes
      if (props.rideNotes) {
        const rideNotes = document.createElement('div');
        rideNotes.className = 'ride-notes mb-3';
        
        const notesTitle = document.createElement('h6');
        notesTitle.className = 'details-section-title';
        notesTitle.textContent = 'Ride Report';
        rideNotes.appendChild(notesTitle);
        
        const notesText = document.createElement('div');
        notesText.className = 'ride-notes-text';
        // Format ride notes, preserving timestamps and structure
        const formattedNotes = props.rideNotes.split('\n').map(line => {
          line = line.trim();
          // Highlight timestamps like "09:30" or "13:45"
          return line.replace(/(\d{1,2}:\d{2})/g, '<strong>$1</strong>');
        }).join('\n');
        
        notesText.innerHTML = convertUrlsToLinks(formattedNotes);
        rideNotes.appendChild(notesText);
        
        content.appendChild(rideNotes);
      }

      // Add optional photos/route section
      if (props.ridePhotosURL || props.ridePhotos) {
        const ridePhotos = document.createElement('div');
        ridePhotos.className = 'ride-photos';
        ridePhotos.innerHTML = `
          <h6 class="details-section-title">${props.rideType === 'Social' ? 'Photos' : 'Route & Photos'}</h6>
          <div class="action-buttons d-flex gap-3 justify-content-center">
            ${props.rideType !== 'Social' && props.ridePhotosURL ? `
              <a href="${props.ridePhotosURL}" target="_blank" class="btn btn-outline-primary flex-fill">
                <i class="bi bi-map"></i> View Route Details
              </a>
            ` : ''}
            ${props.ridePhotosURL ? `
              <a href="${props.ridePhotosURL}" target="_blank" class="btn btn-outline-primary ${props.rideType === 'Social' ? 'w-50' : 'flex-fill'}">
                <i class="bi bi-images"></i> View Photos
              </a>
            ` : ''}
          </div>
        `;
        content.appendChild(ridePhotos);
      }

      // Clear and set the modal body content
      modalBody.innerHTML = '';
      modalBody.appendChild(content);

      // Update calendar links
      const eventDetails = {
        text: event.title,
        details: `${props.guidance}\n\n${props.rideNotes || ''}`,
        location: props.departLocation,
        start: event.start?.toISOString(),
        end: event.end?.toISOString()
      }

      gcalLink.href = generateGoogleCalendarLink(eventDetails)
      icsLink.href = generateICSFileLink(eventDetails)

      // Show modal
      modal.show()
      
      // HTML content is already set in the modal body HTML string, no need to set it again
      // Ensure that any links in the modal are styled correctly
      modalBody.querySelectorAll('.guidance-text a').forEach(link => {
        link.classList.add('text-primary', 'fw-medium');
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
      });
    },
    events: calendarEvents
  })

  // Add keyboard navigation support
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

    switch(e.key) {
      case 'ArrowLeft':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          calendar.prev()
        }
        break
      case 'ArrowRight':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          calendar.next()
        }
        break
      case 't':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          calendar.today()
        }
        break
      case 'm':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          calendar.changeView('dayGridMonth')
          updateActiveViewButton('dayGridMonth')
        }
        break
      case 'w':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          calendar.changeView('timeGridWeek')
          updateActiveViewButton('timeGridWeek')
        }
        break
      case 'd':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          calendar.changeView('timeGridDay')
          updateActiveViewButton('timeGridDay')
        }
        break
    }
  })

  // Update active view button helper
  function updateActiveViewButton(viewName) {
    document.querySelectorAll('.view-controls .btn').forEach(btn => {
      btn.classList.remove('active')
      if (btn.dataset.view === viewName) {
        btn.classList.add('active')
      }
    })
  }

  // Helper function to hide tooltip for a button
  function hideTooltip(button) {
    const tooltip = bootstrap.Tooltip.getInstance(button);
    if (tooltip) {
      tooltip.hide();
    }
  }

  // Add event listeners for navigation controls
  document.getElementById('prevMonth').addEventListener('click', (e) => {
    hideTooltip(e.currentTarget);
    calendar.prev();
  });

  document.getElementById('nextMonth').addEventListener('click', (e) => {
    hideTooltip(e.currentTarget);
    calendar.next();
  });

  document.getElementById('today').addEventListener('click', (e) => {
    hideTooltip(e.currentTarget);
    calendar.today();
  });

  // View controls
  document.querySelectorAll('.view-controls .btn').forEach(button => {
    button.addEventListener('click', (e) => {
      hideTooltip(e.currentTarget);
      const view = e.target.dataset.view;
      calendar.changeView(view);
      updateActiveViewButton(view);
    });
  });

  // Initialize calendar
  calendar.render()

  // Set initial active view button
  updateActiveViewButton('dayGridMonth')

  /**
   * Convert URLs and Markdown-style links to clickable HTML links
   * @param {string} text The text containing URLs or Markdown links
   * @returns {string} HTML with clickable links
   */
  function convertUrlsToLinks(text) {
    if (!text) return 'No specific guidance provided.';
    
    let processedText = text;

    // Handle Markdown-style links: [text](url)
    processedText = processedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
      const sanitizedUrl = encodeURI(url.trim());
      const sanitizedText = linkText.trim().replace(/[<>]/g, '');
      return `<a href="${sanitizedUrl}" target="_blank" rel="noopener noreferrer">${sanitizedText}</a>`;
    });
    
    // Handle plain URLs only if they're not already in an HTML tag
    const urlRegex = /(?<!["'(\[<])https?:\/\/[^\s<>)"'\]]+/g;
    processedText = processedText.replace(urlRegex, url => {
      const sanitizedUrl = encodeURI(url.trim());
      return `<a href="${sanitizedUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
    
    return processedText;
  }

  // Update the modal content creation
  function createEventContent(event) {
      const props = event.extendedProps || {};
      const guidanceHtml = convertUrlsToLinks(props.guidance);
      
      return `
          <div class="event-details">
            <div class="ride-header mb-3">
              <span class="badge bg-primary">${props.rideType || 'Ride'}</span>
              <p class="mt-2 mb-0">
                <strong>Date:</strong> ${formatDateTime(event.start)}
                ${event.end ? `<br><strong>End:</strong> ${formatDateTime(event.end)}` : ''}
              </p>
            </div>
            
            <div class="ride-logistics mb-3">
              <h6 class="details-section-title">Ride Details</h6>
              ${props.destination ? `<p class="mb-2"><strong>Destination:</strong> ${props.destination}</p>` : ''}
              <p class="mb-2"><strong>Distance:</strong> ${props.distance || 'TBA'}</p>
              <p class="mb-2"><strong>Duration:</strong> ${props.rideTime || 'TBA'}</p>
              <p class="mb-2"><strong>Departure Time:</strong> ${props.departureTime || 'TBA'}</p>
              <p class="mb-2">
                <strong>Meeting Point:</strong> ${props.departLocation || 'TBA'}
                ${props.departLocationURL ? `
                  <a href="${props.departLocationURL}" target="_blank" class="ms-2 text-primary" aria-label="View meeting point on map">
                    <i class="bi bi-geo-alt-fill" aria-hidden="true"></i>
                  </a>
                ` : ''}
              </p>
            </div>

            <div class="ride-info mb-3">
              <h6 class="details-section-title">Guidance</h6>
              <div class="guidance-text mb-3">
                  ${guidanceHtml}
              </div>
            </div>

            ${props.rideNotes ? `
              <div class="ride-notes mb-3">
                <h6 class="details-section-title">Additional Notes</h6>
                <p class="mb-2">${props.rideNotes}</p>
              </div>
            ` : ''}

            ${props.ridePhotosURL || props.ridePhotos ? `
              <div class="ride-photos">
                <h6 class="details-section-title">${props.rideType === 'Social' ? 'Photos' : 'Route & Photos'}</h6>
                <div class="action-buttons d-flex gap-3 justify-content-center">
                  ${props.rideType !== 'Social' && props.ridePhotosURL ? `
                    <a href="${props.ridePhotosURL}" target="_blank" class="btn btn-outline-primary flex-fill">
                      <i class="bi bi-map"></i> View Route Details
                    </a>
                  ` : ''}
                  ${props.ridePhotosURL ? `
                    <a href="${props.ridePhotosURL}" target="_blank" class="btn btn-outline-primary ${props.rideType === 'Social' ? 'w-50' : 'flex-fill'}">
                      <i class="bi bi-images"></i> View Photos
                    </a>
                  ` : ''}
                </div>
              </div>
            ` : ''}
          </div>
      `;
  }
})
