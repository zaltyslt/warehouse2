import React from "react";
import { Client} from "./Client";
import {publicApi} from "../misc/PublicApi";
import {handleLogError} from "../misc/Helpers";

export function ClientCreate() {
    const handleCreate = () =>{
        // publicApi.createClient()
        //     .then(response => {
        //         setClients(response.data);
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         handleLogError(error);
        //     })
        //     .finally(() => {
        //
        //     })
    }

    return <Client
        mode="create"
        client={''}
        onSave={handleCreate} />;
}