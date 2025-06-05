// Import styles
import '../scss/styles.scss'
import '../css/calendar-styles.css'

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

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
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
    loading: function(isLoading) {
      toggleLoading(isLoading)
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

      modalBody.innerHTML = `
        <div class="event-details">
          <div class="ride-header mb-3">
            <span class="badge bg-primary">${props.rideType || 'Ride'}</span>
            <p class="mt-2 mb-0">
              <strong>Date:</strong> ${startDate}
              ${endDate ? `<br><strong>End:</strong> ${endDate}` : ''}
            </p>
          </div>
          
          <div class="ride-logistics mb-3">
            <h6 class="details-section-title">Ride Details</h6>
            <p class="mb-2"><strong>Departure Time:</strong> ${props.departureTime || 'TBA'}</p>
            <p class="mb-2"><strong>Meeting Point:</strong> ${props.departLocation || 'TBA'}</p>
            <p class="mb-2"><strong>Distance:</strong> ${props.distance || 'TBA'}</p>
            <p class="mb-2"><strong>Duration:</strong> ${props.rideTime || 'TBA'}</p>
          </div>

          <div class="ride-info mb-3">
            <h6 class="details-section-title">Guidance</h6>
            <p class="mb-2">${props.guidance || 'No specific guidance provided.'}</p>
          </div>

          ${props.rideNotes ? `
            <div class="ride-notes mb-3">
              <h6 class="details-section-title">Additional Notes</h6>
              <p class="mb-2">${props.rideNotes}</p>
            </div>
          ` : ''}

          ${props.ridePhotosURL || props.ridePhotos ? `
            <div class="ride-photos">
              <h6 class="details-section-title">Route & Photos</h6>
              <div class="action-buttons d-flex gap-3 justify-content-center">
                ${props.ridePhotosURL ? `
                  <a href="${props.ridePhotosURL}" target="_blank" class="btn btn-outline-primary flex-fill">
                    <i class="bi bi-map"></i> View Route Details
                  </a>
                ` : ''}
                ${props.ridePhotosURL ? `
                  <a href="${props.ridePhotosURL}" target="_blank" class="btn btn-outline-primary flex-fill">
                    <i class="bi bi-images"></i> View Photos
                  </a>
                ` : ''}
              </div>
            </div>
          ` : ''}
        </div>
      `

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

  // Add event listeners for navigation controls
  document.getElementById('prevMonth').addEventListener('click', () => {
    calendar.prev()
  })

  document.getElementById('nextMonth').addEventListener('click', () => {
    calendar.next()
  })

  document.getElementById('today').addEventListener('click', () => {
    calendar.today()
  })

  // View controls
  document.querySelectorAll('.view-controls .btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const view = e.target.dataset.view
      calendar.changeView(view)
      updateActiveViewButton(view)
    })
  })

  // Initialize calendar
  calendar.render()

  // Set initial active view button
  updateActiveViewButton('dayGridMonth')
})
