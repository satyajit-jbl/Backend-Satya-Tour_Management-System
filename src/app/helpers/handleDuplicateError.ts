/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorResponse } from "../interfaces/error.types"

export const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const matchArray = err.message.match(/"([^"]*)"/)
    console.log(matchArray);
    console.log(err.message);
    return {
        statusCode: 400,
        message: `${matchArray[1]} already exist`
    }
}

// import { TGenericErrorResponse } from "../interfaces/error.types"

// export const handleDuplicateError = (err: any): TGenericErrorResponse => {
//     // Try to capture the value inside quotes, if any
//     const matchArray = err.message.match(/"([^"]*)"/)

//     let value = "Field"
//     if (matchArray && matchArray[1]) {
//         value = matchArray[1]
//     } else if (err.keyValue) {
//         // Mongoose often puts the duplicate field value here
//         value = Object.values(err.keyValue)[0] as string
//     }

//     return {
//         statusCode: 400,
//         message: `${value} already exists`
//     }
// }
