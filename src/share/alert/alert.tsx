import React from 'react';
import './alert.css';


export enum TYPE {
    DANGER,
    SUCCESS,
    WARNING,
    INFO
}


interface PropState {
    children?: any,
    type: number,
}


export default class Alert extends React.Component<PropState, any> {

    getType = (type: number) => {
        switch (type) {
            case TYPE.DANGER:
                return 'danger';
            case TYPE.SUCCESS:
                return 'success';
            case TYPE.WARNING:
                return 'warning';
            case TYPE.INFO:
                return 'info';
            default:
                return 'info';
        }
    }

    render() {
        const { children, type } = this.props;
        return (<React.Fragment>
            {children ? <div className={'alert ' + this.getType(type)}>
                <div className='alert-type' />
                <div className='alert-message'>
                    {children}
                </div>
            </div> : null}
        </React.Fragment>)
    }
}