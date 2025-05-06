export interface RequestWithUser extends Express.Request {
    user?: any; // Define the user type as needed
}

export interface ResponseWithData<T> extends Express.Response {
    data?: T; // Generic response data
}

export interface NextFunction {
    (err?: any): void; // Custom next function type
}