import moment from 'moment';
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '')
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'Booked',
    name: "Priya Saha",
    start: todayStr,
    end: moment(todayStr).add(3, 'days').format('YYYY-MM-DD')
  },
  {
    id: createEventId(),
    title: 'On Call',
    name: "Ramesh Choudhary",
    start: moment(todayStr).subtract(3, 'days').format('YYYY-MM-DD'),
    end: moment(todayStr).add(1, 'days').format('YYYY-MM-DD'),
  }
]   

export function createEventId() {
    return String(eventGuid++)
}