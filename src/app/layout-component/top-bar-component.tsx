import React from 'react';
import collapseIcon from '../../assets/menu.png';
import arrowIcon from '../../assets/down-arrow.svg';
import existIcon from '../../assets/exit.png';
import { store1 } from "../../store/store"; //import { store } from "../..";



export default class TopBar extends React.Component<any, any> {
    authenState = store1.getState().AuthenSlicer; //has problem in render

    private isMouseLeaveOnDropdown: boolean = false;
    private rightTopButton: any;

    constructor(_props: any) {
        super(_props);

        this.rightTopButton = React.createRef();
        this.state = { headerDropdownOpen: false }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onDocClick);
        this.rightTopButton.current.addEventListener('mouseleave', this.onMouseLeave);
        this.rightTopButton.current.addEventListener('mouseenter', this.onMouseEnter);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onDocClick);
    }

    onDocClick = () => {
        const { headerDropdownOpen } = this.state;
        if (this.isMouseLeaveOnDropdown && headerDropdownOpen) {
            this.setState({ headerDropdownOpen: false });
            this.isMouseLeaveOnDropdown = false;
        }
    }

    onMouseLeave = () => {
        this.isMouseLeaveOnDropdown = true;
    }

    onMouseEnter = () => {
        this.isMouseLeaveOnDropdown = false;
    }

    Logout() {  
        if (window.confirm("Do you want to Logout ?") == true) 
            this.props.callBackLogout();  
        else   
            this.setState({ headerDropdownOpen: false });     
    }

    render(): React.ReactNode {
        const { headerDropdownOpen } = this.state;
        const { onLeftCollapse, isLeftCollapse } = this.props;
        return (<div className='header_container'>
            <div className='header_left_container'>
                <button className='collapse_left_button' onClick={(e) => onLeftCollapse()}><img alt='collapse' src={collapseIcon} /></button>
                {isLeftCollapse ? <div className='small_logo' /> : null}
                {/* <div className='current_app_name'>รายงาน {'>'} รายงานเข้า</div> */}
            </div>
            <div className='header_right_container'>
                <div ref={this.rightTopButton}>
                    <button className='profile-button' onClick={(e) => this.setState({ headerDropdownOpen: true })}> {this.authenState.username}&nbsp; <img alt='arrow' src={arrowIcon}/> </button>
                    {headerDropdownOpen ? <div className='profile-dropdown'>
                        {/* <button onClick={(e) => {
                            this.props.history.push({ pathname: '/settings' });
                            this.setState({ headerDropdownOpen: false });
                        }}>Settings <img alt='setting' src={settingIcon} /></button> */}
                        <button onClick={(e) => this.Logout()} style={{ color: 'tomato', fontWeight: '550' }}>Log out <img alt='exit' src={existIcon} /></button>
                    </div> : null}
                </div>
            </div>
        </div>)
    }
}
