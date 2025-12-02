import ServerError from "../pages/ServerErrorPage";

export const catchError = (error, funName, fileName) => {
    console.log(`Error in ${funName}: ${fileName}: `, error);
}