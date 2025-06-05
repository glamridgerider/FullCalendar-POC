// Import styles
import '../scss/styles.scss'
import '../css/calendar-styles.css'

// Import Bootstrap's JavaScript
import { Modal, Tooltip } from 'bootstrap'

// Import FullCalendar and its plugins
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'

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
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new Tooltip(tooltipTriggerEl))

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
  modal = new Modal(eventModal)

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
      const description = event.extendedProps?.description || ''
      const location = event.extendedProps?.location || ''

      modalBody.innerHTML = `
        <div class="event-details">
          <p>
            <strong>When</strong>
            <span>
              ${startDate}
              ${endDate ? `<br>to ${endDate}` : ''}
            </span>
          </p>
          ${location ? `
            <p>
              <strong>Where</strong>
              <span>${location}</span>
            </p>
          ` : ''}
          ${description ? `
            <p>
              <strong>Details</strong>
              <span>${description}</span>
            </p>
          ` : ''}
        </div>
      `

      // Update calendar links
      const eventDetails = {
        text: event.title,
        details: description,
        location: location,
        start: event.start?.toISOString(),
        end: event.end?.toISOString()
      }

      gcalLink.href = generateGoogleCalendarLink(eventDetails)
      icsLink.href = generateICSFileLink(eventDetails)

      // Show modal
      modal.show()
    },
    events: [
      {
        title: 'Meeting with Bob',
        start: '2025-06-10T14:00:00',
        end: '2025-06-10T15:00:00',
        extendedProps: {
          description: 'Discuss project status and next steps.',
          location: 'Zoom Meeting'
        }
      },
      {
        title: 'Lunch with Sarah',
        start: '2025-06-12T12:30:00',
        end: '2025-06-12T13:30:00',
        extendedProps: {
          description: 'Catch-up lunch at the new cafe downtown.',
          location: 'Downtown Cafe'
        }
      }
    ]
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
