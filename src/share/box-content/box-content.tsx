import React, { useState } from 'react';
import { Accordion, useAccordionButton } from 'react-bootstrap';
import './box-content.css';

interface PropState {
    children?: any,
    id: string,
    title: string,
    color?: string,
}




export class BoxContentDashboard extends React.Component<PropState, any> {

    render() {
        const { title, children, id, color } = this.props;
        return (
            <Accordion defaultActiveKey={id}>
                <div className='box-container' style={{ marginTop: '10px' }}>
                    <div className='header-box' style={{ backgroundColor: color ? color : 'transparent' }}>
                        <label className='header-label dashboard'>{title}</label>
                        <DashboardCollapseToggle eventKey={id} />
                    </div>
                    <Accordion.Collapse eventKey={id}>
                        <div className='body-box' style={{ paddingTop: '10px' }}>
                            <div className='line' />
                            {children}
                        </div>
                    </Accordion.Collapse>
                </div>
            </Accordion>);
    }
}


const DashboardCollapseToggle = ({ eventKey }: any) => {
    const [collapse, setCollapse] = useState(false);
    const decoratedOnClick = useAccordionButton(eventKey, () => {
        setCollapse(!collapse);
    });

    return (
        <button className={collapse ? 'show-button dashboard' : 'collapse-button dashboard'} onClick={decoratedOnClick} />
    );
}


export class BoxNormal extends React.Component<any, any> {
    render() {
        const { children } = this.props;
        return (
                <div className='box-container' style={{ marginTop: '10px' }}>
                        <div className='body-box' style={{ paddingTop: '10px' }}>
                            {children}
                        </div>
                </div>
            );
    }
}


export default class BoxContent extends React.Component<PropState, any> {

    render() {
        const { title, children, id, color } = this.props;
        return (
            <Accordion defaultActiveKey={id}>
                <div className='box-container' style={{ marginTop: '10px' }}>
                    <div className='header-box' style={{ backgroundColor: color ? color : 'transparent' }}>
                        <label className='header-label'>{title}</label>
                        <CollapseToggle eventKey={id} />
                    </div>
                    <Accordion.Collapse eventKey={id}>
                        <div className='body-box' style={{ paddingTop: '10px' }}>
                            <div className='line' />
                            {children}
                        </div>
                    </Accordion.Collapse>
                </div>
            </Accordion>);
    }
}

const CollapseToggle = ({ eventKey }: any) => {
    const [collapse, setCollapse] = useState(false);
    const decoratedOnClick = useAccordionButton(eventKey, () => {
        setCollapse(!collapse);
    });

    return (
        <button className={collapse ? 'show-button' : 'collapse-button'} onClick={decoratedOnClick} />
    );
}



export class SubBoxContent extends React.Component<{ title: string, children?: any }, any> {

    render() {
        const { title, children } = this.props;
        return (<React.Fragment>
            <div className='sub-box-container' >
                <div className='header-box'>
                    <label className='header-label'>{title}</label>
                </div>
                <div className='body-box' style={{ paddingTop: '10px' }}>
                    <div className='line' />
                    {children}
                </div>
            </div>
        </React.Fragment>);
    }
}


export class BoxContentWithOutCollapse extends React.Component<any, any> {

    render() {
        const { title, children } = this.props;
        return (<React.Fragment>
            <div className='box-container-without-collapse' >
                <div className='header-box'>
                    <label className='header-label'>{title}</label>
                </div>
                <div className='body-box' style={{ paddingTop: '10px' }}>
                    <div className='line' />
                    {children}
                </div>
            </div>
        </React.Fragment>);
    }
}
