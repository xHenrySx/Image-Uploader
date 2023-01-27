import React from "react";


export default function Loading (props) {
    return (
        <div className="card text-left loader">
            <div className="card-body">
                <p>Uploading...</p>
                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar" style={{width: props.progress + "%"}}></div>
                </div>
            </div>
        </div>
    );
}