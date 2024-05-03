import React from "react";
import ProfileHeader from './ProfileHeader'
import DocumentHeader from "./DocumentHeader";

export function NewDocument () {
    return(
        <div>
            <ProfileHeader></ProfileHeader>
            <DocumentHeader></DocumentHeader>
        </div>
    )
}