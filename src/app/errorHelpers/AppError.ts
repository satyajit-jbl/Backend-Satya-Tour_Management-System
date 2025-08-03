
class AppError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string, stack= ''){
        super(message) // throw new Error("Something went wrong")
        this.statusCode = statusCode

        if(stack){
            this.stack=stack //this. method are coming from Error
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default AppError;