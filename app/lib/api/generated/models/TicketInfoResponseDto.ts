/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TicketInfoResponseDto = {
    /**
     * Ticket number
     */
    ticketNumber: string;
    /**
     * Train code
     */
    trainCode: string;
    /**
     * Origin station code
     */
    originStationCode: string;
    /**
     * Destination station code
     */
    destinationStationCode: string;
    /**
     * Travel date
     */
    travelDate: string;
    /**
     * Departure time
     */
    departureTime: string;
    /**
     * Passenger name
     */
    passengerName?: string;
    /**
     * Car number
     */
    carNumber?: number;
    /**
     * Seat number
     */
    seatNumber?: string;
    /**
     * Seat type
     */
    seatType?: string;
    /**
     * Ticket price
     */
    ticketPrice: string;
    /**
     * Whether ticket is valid for ordering
     */
    isValidForOrdering: boolean;
    /**
     * Last verification time
     */
    lastVerifiedAt?: string;
};

