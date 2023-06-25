import React from 'react'

const Alert = (props) => {
    return (
        <div className={`alert alert-${props.alert && props.alert.type}`} role="alert">
            {props.alert && props.alert.msg}
        </div>
    )
}

export default Alert