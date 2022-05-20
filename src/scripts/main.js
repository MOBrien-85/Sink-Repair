import { fetchRequests, fetchPlumbers } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

export const render = () => {
    fetchRequests()
    .then(() => fetchPlumbers())
    .then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()


