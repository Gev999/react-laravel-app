import{
    LOG_IN,
    LOG_OUT,
} from 'store/actions'

const user = (state = null, action)=> {
    switch (action.type) {

        case LOG_IN:
            return action.payload;

        case LOG_OUT:
            return null      

        default: return state;
    }
}

export default user;