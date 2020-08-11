import React, { useState } from 'react';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const Modals = (props) => {
    const {
        className,
        show,
        toggle,
        title,
        isBooked,
        start,
        end,
        patient,
        x,
        y
    } = props;

    const [onCallActive, setOnCall] = useState(false);

    //const toggle = () => setModal(!modal);

    const naClick = () => {
        setOnCall(true);
    }

    const aClick = () => {
        setOnCall(false);
    }

    return (
        <div>
            <Modal style={{position:'absolute', left:`${x}px`, top:`${y}px`}} fade={false} isOpen={show} backdrop={false} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}
                >{title}
                </ModalHeader>
                <ModalBody>
                    {!isBooked &&
                        <div>
                            <FormGroup check>
                                <Label check>
                                    <Input onClick={aClick} type="radio" name="radio1" />{' '}
                                    Available
          </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input onClick={naClick} type="radio" name="radio1" />{' '}
                                    Not Available
          </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input disabled={onCallActive} type="checkbox" name="check" id="exampleCheck" />
                                <Label for="exampleCheck" check>On Call</Label>
                            </FormGroup>
                            <div className="buttons-container">
                                <Button outline color="primary">Day View</Button>
                                <Button color="primary">Save</Button>
                            </div>
                        </div>
                    }
                    {isBooked && <div>
                        <p>Patient: {patient}</p>
                        <p>Time: 8:00am - 3:00pm</p>
                    </div>}
                </ModalBody>
            </Modal>
        </div>
    );
}



export default Modals;