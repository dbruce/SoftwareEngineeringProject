import React from 'react';
import $ from 'jquery';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Map } from './map';

export default class Branches extends React.Component {
    constructor(props) {
        super(props);
    }

    async handleBranchClicked(id) {
        this.props.setStateValue('branchId', id);

        // Load the appointment slots based on the branch and service
        await this.loadAppointmentSlots(id);

        this.props.goForward();
    }

    async loadAppointmentSlots(branchId) {
        // Show a loading image
        this.props.setStateValue('loading', true);

        await $.ajax({
            type: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "/api/appointment-slots/" + branchId,
            data: JSON.stringify(this.props.serviceIds),
            success: (appointmentSlotsList) => {
                const newAppointmentSlots = [];
                let daySlots = [];
                let lastDay = appointmentSlotsList[0].day;
                appointmentSlotsList.forEach(appointmentSlot => {
                    if (appointmentSlot.day != lastDay) {
                        // Hit a new day
                        newAppointmentSlots.push(daySlots);
                        daySlots = [];
                    }

                    daySlots.push(appointmentSlot);

                    lastDay = appointmentSlot.day;
                });

                newAppointmentSlots.push(daySlots);

                this.props.setStateValue('appointmentSlots', newAppointmentSlots);
            }
        });

        this.props.setStateValue('loading', false);
    }

    render() {
        return (
            <div className="page" id="branches">
                <h2 className="pageHeader">Which location works best for you?</h2>
                <Map branches={this.props.branches} />
                {
                    this.props.branches.map(branch => {
                        return (
                            <div className="branch" key={branch.id}>
                                <p className="distance">{branch.distance}</p>
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" className="mapMarker" />
                                <div className="branchData">
                                    <p>{branch.streetAddress}</p>
                                    <p>{branch.city + ", " + branch.state + " " + branch.zipCode}</p>
                                    <p>{branch.appointmentCount} available appointments in the next two weeks</p>
                                    <input type="submit" value="Select branch" disabled={!branch.hasService} onClick={this.handleBranchClicked.bind(this, branch.id)} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}