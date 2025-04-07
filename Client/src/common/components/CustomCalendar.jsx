import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import moment from 'moment'; // Usamos moment solo para el localizador

// Extender Day.js con funcionalidades adicionales (opcional)
dayjs.extend(utc);
dayjs.extend(timezone);

// Configurar momentLocalizer con moment (para compatibilidad con React Big Calendar)
const localizer = momentLocalizer(moment);

const CustomCalendar = ({events = []}) => (
  <div style={{ height: 500 }}>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100%" }}
    />
  </div>
);

export default CustomCalendar;
