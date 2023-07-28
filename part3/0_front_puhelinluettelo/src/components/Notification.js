import React from 'react'

const Notification = ({ message, style }) => {
    if (message === null) {
        return null
    }
    const baseNotificationStyle = {
        color: style ? style : "black",
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px}'
    }
    return (
        <div style={baseNotificationStyle} className="error">
            {message}
        </div>
    )
}
export default Notification