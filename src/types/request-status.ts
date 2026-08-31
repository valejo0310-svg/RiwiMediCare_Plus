/**
 * Defines the valid lifecycle statuses
 * available for a supply request.
 */
export enum RequestStatus {

    // The request has been created and is awaiting review.
    PENDING = "PENDING",

    // The request has been approved.
    APPROVED = "APPROVED",

    // The request has been rejected.
    REJECTED = "REJECTED",

    // The request has been dispatched from the warehouse.
    DISPATCHED = "DISPATCHED",

    // The request has completed its lifecycle.
    COMPLETED = "COMPLETED"

}