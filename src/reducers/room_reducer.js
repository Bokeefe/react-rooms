export default (state={}, action) => {
    switch(action.type){
        case 'GET_ROOMS':
            return {...state, artistList:action.payload}
        case 'JOIN_ROOM':
            return {...state, artistList:action.payload}
        default:
            return state
    }
}