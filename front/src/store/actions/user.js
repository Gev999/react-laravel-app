import{
    LOG_IN,
    LOG_OUT,
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

export {
    loggedIn,
    loggedOut,
}