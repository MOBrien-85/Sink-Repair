import { render } from "./main.js"

// creating a place to store the external data in the application state when I fetch it.
const applicationState = {
    requests: [],
}

const API = "http://localhost:8088"

const mainContainer = document.querySelector("#container")

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}


// Define and export a function named getRequests that returns a copy of the requests state. 
export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

// using the post method to create something new: a new request which will be stored
// in the api database
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
        
}
// this will allow me to invoke the render function on main.js. when the state changes this will let main.js know to repopulate the html without any input.
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

// this function will allow merle and maude to delete any request they are unable to complete.
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}


export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}


// below i've written two functions. first to save completed jobs to the api.
// second to fetch those completions that will be saved. 
export const saveCompletion = (completedJobs) => {
    const fetchCompletions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedJobs)
    }

    return fetch(`${API}/completions`, fetchCompletions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}