import React from 'react'
import moment from 'moment';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from './components/Modal';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './events'

class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      showModal: false,
      isBooked: false,
      modalStartDate: '',
      modalEndDate: '',
      patientName: 'Test',
      screenX: '',
      screenY: ''
    }
  }
  render() {
    const connector = " - ";
    const title = this.state.modalStartDate+(this.state.modalEndDate ? connector : '')+this.state.modalEndDate;
    return (
      <AppContainer>
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialEvents={INITIAL_EVENTS}
          editable={true}
          selectable={true}
          eventContent={eventContent} 
          select={this.handleDateSelect}
          eventClick={this.handleEventClick}
        />
        <Modal 
          className={'calender-modal'} 
          title={title} 
          show={this.state.showModal} 
          toggle={this.toggleModal}
          isBooked={this.state.isBooked}
          start={this.state.modalStartDate}
          end={this.state.modalEndDate}
          patient={this.state.patientName}
          x={this.state.screenX}
          y={this.state.screenY}
        />
      </AppContainer>
    )
  }

  toggleModal = () => {
   this.setState({showModal: !this.state.showModal})
  }

  handleEventClick = (clickInfo) => {
    console.log(clickInfo);
    this.setState({
      showModal: true, 
      isBooked: true,
      modalStartDate: moment(clickInfo.event._instance.range.start).format('MMMM Do YYYY'),
      modalEndDate: moment(clickInfo.event._instance.range.end).format('MMMM Do YYYY'),
      patientName: clickInfo.event._def.extendedProps.name,
      screenX: clickInfo.jsEvent.clientX-200,
      screenY: clickInfo.jsEvent.clientY
    });
  }

  handleDateSelect = (selectInfo) => {
    console.log("yo")
    console.log(selectInfo);
    this.setState({
      showModal: true, 
      isBooked: false,
      modalStartDate: moment(selectInfo.start).format('MMMM Do YYYY'),
      modalEndDate: '',
      screenX: selectInfo.jsEvent.clientX-200,
      screenY: selectInfo.jsEvent.clientY+50
    });
  }
}

const AppContainer = styled.div`
  width: 60%;
  height: 660vh;
  margin: auto;
`


function eventContent(info) {
  return (
    <div className="event-block">
      <b>{info.timeText}</b>
      <span>{info.event.title}</span>
    </div>
  )
}

export default App;

