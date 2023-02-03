import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { gapi } from 'gapi-script';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function Calendars() {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState([]);

  const clientID =
    '149678444142-348k60jc4ucq1c9t4b94k3m9l3g8u4lp.apps.googleusercontent.com';

  const getEvents = clientID => {
    function initiate() {
      const accessToken = localStorage.getItem('credentials');
      const tokenExpired = localStorage.getItem('tokenExpired');

      gapi.client
        .init({
          clientId: clientID,
          scope: 'https://www.googleapis.com/auth/calendar',
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
          ],
          accessToken: accessToken,
        })
        .then(() => {
          if (!gapi.auth2?.getAuthInstance()?.isSignedIn?.get()) {
            gapi.auth2?.getAuthInstance()?.setAuthResponse({
              access_token: accessToken,
              token_type: 'Bearer',
              expires_at: tokenExpired,
            });
          }

          gapi.client?.calendar?.events
            .list({
              calendarId: 'primary',
              timeMin: new Date().toISOString(),
              maxResults: 100,
              singleEvents: true,
              orderBy: 'startTime',
            })
            .then(function (response) {
              const events = response.result.items.map(event => ({
                start: new Date(event.start.dateTime),
                end: new Date(event.end.dateTime),
                title: event.summary,
              }));
              setAllEvents(events);
            })
            .catch(function (error) {
              console.error(error);
            });
        });
    }

    gapi.load('client', initiate);
  };

  useEffect(() => {
    const events = getEvents(clientID);
    setAllEvents(events);
  }, []);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert('CLASH');
        break;
      }
    }

    const googleEvent = {
      summary: newEvent.title,
      start: {
        dateTime: newEvent.start,
        timeZone: 'UTC',
      },
      end: {
        dateTime: newEvent.end,
        timeZone: 'UTC',
      },
    };

    gapi.client.calendar.events
      .insert({
        calendarId: 'primary',
        resource: googleEvent,
      })
      .then(() => {
        setAllEvents([...allEvents, newEvent]);
      });
  }

  return (
    <div className="App">
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: '20%', marginRight: '10px' }}
          value={newEvent.title}
          onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: '10px' }}
          selected={newEvent.start}
          onChange={start => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={end => setNewEvent({ ...newEvent, end })}
        />
        <button stlye={{ marginTop: '10px' }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px' }}
      />
    </div>
  );
}

export default Calendars;
