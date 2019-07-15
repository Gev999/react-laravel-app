import{
    LOG_IN,
    LOG_OUT,
    USER_INPUT_DATA,
    USER_INPUT_DATA_ERROR,
} from './index'

const loggedIn = (user) => {
    return {
        type: LOG_IN,
        payload: user,
    }
}

const loggedOut = () => {
    return {
        type: LOG_OUT
    }
}

const userDataChange = (e) => {
    return {
        type: USER_INPUT_DATA,
        payload: {
            name: e.target.name,
            value: e.target.value,
        }
    }
}

const userInputDataError = () => {
    return {
        type: USER_INPUT_DATA_ERROR,
    }
}


export {
    loggedIn,
    loggedOut,
    userDataChange,
    userInputDataError,
}