import {useReducer} from "react";

const ACTIONS = {
    FETCH_INIT: "FETCH_INIT",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_FAILURE: "FETCH_FAILURE",
};

function reducer(state,action){

    switch(action.type){
        case ACTIONS.FETCH_INIT:
            return{
                isLoading: true,
                isError : false
            }
        case ACTIONS.FETCH_SUCCESS:
            return{
                data : action.payload.data,
                isLoading : false,
                isError : false
            }
        case ACTIONS.FETCH_FAILURE:
            return{
                isLoading : false,
                isError : true
            }
        default : 
            return state    
    }
}

function useFetch(mainUrl,options={},msjError="Error al realizar la peticion"){

    const [state,dispatch] = useReducer(reducer,{
        data : null,
        isLoading : true,
        isError : false
    })
    
    const doFetch = (newOptions,alternativeUrl = mainUrl) => {
        dispatch({ type: ACTIONS.FETCH_INIT });

        fetch(alternativeUrl,{...options,...newOptions})
        .then((response)=>{
            if(response.ok){
                return response.json()
            }
            throw Error(msjError);
        })
        .then((data)=>{
            dispatch({type: ACTIONS.FETCH_SUCCESS, 
                    payload :{data}})
        })
        .catch(()=>{
            dispatch({type:ACTIONS.FETCH_FAILURE})
            })
    }
    return [state,doFetch]
}
export default useFetch