import React from 'react';
import { verifyLeftYear } from '../share-service';
import './date-picker-input.css';


enum DateType {
    ACTIVE,
    NONE
}

interface PropState {
    label: string,
    value: string
    placeholder?: string | null,
    disabled?: boolean | null
    onChange?: any
    withoutTime?: boolean | null,
    required?: boolean
}

interface State {
    isOpen: boolean,
    dateOfMonth: { date: number, type: DateType }[],
    hours: number,
    minutes: number,
    selectedDate: number,
    selectedMonth: number,
    selectedYear: number
}

const initialState: State = {
    isOpen: false,
    dateOfMonth: [],
    hours: -1,
    minutes: -1,
    selectedDate: -1,
    selectedMonth: -1,
    selectedYear: -1
}

export default class DatePickerInput extends React.Component<PropState, State> {

    private listOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    private daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    private dayInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    private year = 0; month = 0; date = 0;
    private HH = 0; mm = 0;

    private hoursTimeout: any;
    private minutesTimeout: any;


    private isMouseLeave: boolean = false;

    constructor(_props: PropState) {
        super(_props);
        this.state = initialState;
    }


    getDateOfMonth = () => {
        let dateOfMonth: { date: number, type: DateType }[] = [];
        this.dayInMonths[1] = verifyLeftYear(this.year) ? 29 : 28;
        let firstDateInMonthIndex = new Date(this.year, this.month, 1).getDay();
        let previousMonthIndex = this.month - 1 < 0 ? this.dayInMonths.length - 1 : this.month - 1;
        const maxIndex = 42; // comes from 7 * 6 , number of date in calendar.

        for (let i = firstDateInMonthIndex - 1; i >= 0; i--) { // gets date of previous date to show in date picker. 
            dateOfMonth.push({ date: this.dayInMonths[previousMonthIndex] - i, type: DateType.NONE });
        }

        for (let i = 0; i < this.dayInMonths[this.month]; i++) {
            dateOfMonth.push({ date: i + 1, type: DateType.ACTIVE });
        }

        const noOfNextMonthDate = maxIndex - dateOfMonth.length;
        for (let i = 0; i < noOfNextMonthDate; i++) {
            dateOfMonth.push({ date: i + 1, type: DateType.NONE });
        }

        this.setState({ dateOfMonth: dateOfMonth });
    }

    onArrowClicked = (index: number) => {
        if (this.month + index > this.listOfMonths.length - 1) {
            this.month = 0;
            this.year++;
        } else if (this.month + index < 0) {
            this.month = this.listOfMonths.length - 1;
            this.year--;
        } else {
            this.month = this.month + index;
        }
        this.getDateOfMonth();
    }

    setHoursTimeout = (func: any) => {
        this.hoursTimeout = setTimeout(() => {
            func();
            this.setHoursTimeout(func);
        }, 90);
    }

    onHoursClicked = (n: number) => {
        let { hours } = this.state;

        if (hours + n > 23) {
            hours = 0;
        } else if (hours + n < 0) {
            hours = 23;
        } else {
            hours += n;
        }

        this.setState({ hours: hours });
    }

    clearHoursTimeout = () => {
        clearTimeout(this.hoursTimeout);
    }

    setMinutesTimeout = (func: any) => {
        this.minutesTimeout = setTimeout(() => {
            func();
            this.setMinutesTimeout(func);
        }, 90);
    }

    onMinutesClicked = (n: number) => {
        let { minutes } = this.state;

        if (minutes + n > 59) {
            minutes = 0;
        } else if (minutes + n < 0) {
            minutes = 59;
        } else {
            minutes += n;
        }

        this.setState({ minutes: minutes });
    }

    clearMinutesTimeout = () => {
        clearTimeout(this.minutesTimeout);
    }


    onOpen = () => {
        const { withoutTime, required, value } = this.props;
        const { isOpen, selectedDate, selectedMonth, selectedYear } = this.state;
        let currentDate = null;
        if (value != '') {
            var parts = value.split("/");
            currentDate = new Date(parseInt(parts[2], 10),
                              parseInt(parts[1], 10) - 1,
                              parseInt(parts[0], 10));
        }
        else {
            currentDate = new Date();
        }

        this.month = selectedMonth !== -1 ? selectedMonth : currentDate.getMonth();
        this.year = selectedYear !== -1 ? selectedYear : currentDate.getFullYear();
        this.date = selectedDate !== -1 ? selectedDate : currentDate.getDate();  
        this.getDateOfMonth();
        if (!withoutTime) {
            this.HH = this.HH !== 0 ? this.HH : 12; // sets hour on calendar is 12.
            this.mm = this.mm !== 0 ? this.mm : 0;
            this.setState({ isOpen: true, selectedMonth: this.month, selectedYear: this.year, hours: this.HH, minutes: this.mm });
        } else {
            this.setState({ isOpen: true, selectedMonth: this.month, selectedYear: this.year });
        }
    }

    onSubmit = () => {
        const { selectedDate, selectedMonth, selectedYear, hours, minutes } = this.state;
        const { onChange, withoutTime } = this.props;

        if (!withoutTime) {
            this.HH = hours;
            this.mm = minutes;
            onChange(`${this.date.toLocaleString('en-US', { minimumIntegerDigits: 2 })}/${(selectedMonth + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}/${selectedYear.toLocaleString('en-US', { minimumIntegerDigits: 4 }).replaceAll(/,/g, '')} ${hours.toLocaleString('en-US', { minimumIntegerDigits: 2 })}:${minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })}:00`);
        } else {
            onChange(`${this.date.toLocaleString('en-US', { minimumIntegerDigits: 2 })}/${(selectedMonth + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 })}/${selectedYear.toLocaleString('en-US', { minimumIntegerDigits: 4 }).replaceAll(/,/g, '')}`);
        }
        this.setState({ isOpen: false, selectedDate: this.date });
    }

    onCancel = () => {
        this.setState({ isOpen: false });
    }


    componentDidMount() {
        document.addEventListener('mousedown', this.onDocClick);
        //this.setState({ selectedDate: 14, selectedMonth:11, selectedYear:2021 });
    }


    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onDocClick);
    }

    onDocClick = () => {
        const { isOpen } = this.state;
        if (this.isMouseLeave && isOpen) {
            this.setState({ isOpen: false });
            this.isMouseLeave = false;
        }
    }

    onMouseLeave = () => {
        this.isMouseLeave = true;
    }

    onMouseEnter = () => {
        this.isMouseLeave = false;
    }


    ref = (ref?: any) => {
        if (ref) {
            ref.addEventListener('mouseleave', this.onMouseLeave);
            ref.addEventListener('mouseenter', this.onMouseEnter);
        }
    }

    render() {
        const { isOpen, dateOfMonth, hours: minutes, minutes: seconds, selectedMonth, selectedYear } = this.state;
        const { label, placeholder, disabled, value, withoutTime, required } = this.props;
        return (<React.Fragment>
            <div ref={this.ref}>
                <label className='input-label'>{label}<label className='input-required-label'>{required ? '*' : null}</label></label>
                <div className='input-group'> {/* can customize css for other apps. */}
                    <input className='form-control form-control-sm input-custom date-input' value={value} disabled placeholder={placeholder ? placeholder : ''} />
                    <button className='date_picker' onClick={(e) => { this.onOpen(); }} disabled={disabled ? true : false} />
                </div>
                {isOpen ? <div className='date_picker_container' >
                    <div className='date_input_container'>
                        <div className='header_date_picker_container' >
                            <div className='header_date_picker_first'><span>{this.listOfMonths[this.month]}</span> <span>{this.year}</span></div>
                            <div className='header_date_picker_last'><button onClick={(e) => this.onArrowClicked(-1)} /><button onClick={(e) => this.onArrowClicked(1)} /></div>
                        </div>
                        <div className='header_day_of_week'>
                            {this.daysOfWeek.map((day) => <span key={day}>{day}</span>)}
                        </div>
                        <div className='body_day_of_month'>
                            {dateOfMonth.map((item) => {
                                return <span key={item.date + item.type.toString()} className={item.type === DateType.ACTIVE ? ((item.date === this.date && this.month === selectedMonth && this.year === selectedYear) ? 'selected' : 'active') : 'none'} onClick={(e) => {
                                    if (item.type === DateType.ACTIVE) {
                                        this.date = item.date;
                                        this.setState({ selectedMonth: this.month, selectedYear: this.year });
                                    }
                                }}>{item.date}</span>;
                            })}
                        </div>
                    </div>

                    {!withoutTime ? <div className='time_input_container'>
                        <div className='time_container'>
                            <button className='increase_time_button' onClick={(e) => this.onHoursClicked(1)} onMouseDown={(e) => this.setHoursTimeout(() => { this.onHoursClicked(1) })} onMouseUp={(e) => this.clearHoursTimeout()} onMouseLeave={(e) => this.clearHoursTimeout()} />
                            <div></div>
                            <button className='increase_time_button' onClick={(e) => this.onMinutesClicked(1)} onMouseDown={(e) => this.setMinutesTimeout(() => { this.onMinutesClicked(1) })} onMouseUp={(e) => this.clearMinutesTimeout()} onMouseLeave={(e) => this.clearMinutesTimeout()} />
                        </div>
                        <div className='time_container'>
                            <div className='time_label'>{minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })}</div>
                            <div>:</div>
                            <div className='time_label'>{seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })}</div>
                        </div>
                        <div className='time_container'>
                            <button className='decrease_time_button' onClick={(e) => this.onHoursClicked(-1)} onMouseDown={(e) => this.setHoursTimeout(() => { this.onHoursClicked(-1) })} onMouseUp={(e) => this.clearHoursTimeout()} onMouseLeave={(e) => this.clearHoursTimeout()} />
                            <div></div>
                            <button className='decrease_time_button' onClick={(e) => this.onMinutesClicked(-1)} onMouseDown={(e) => this.setMinutesTimeout(() => { this.onMinutesClicked(-1) })} onMouseUp={(e) => this.clearMinutesTimeout()} onMouseLeave={(e) => this.clearMinutesTimeout()} />
                        </div>
                        {/* <button className='increase_time_button' onClick={(e) => this.onHoursClicked(1)} onMouseDown={(e) => this.setHoursTimeout(() => { this.onHoursClicked(1) })} onMouseUp={(e) => this.clearHoursTimeout()} onMouseLeave={(e) => this.clearHoursTimeout()} />
                        <button className='increase_time_button' onClick={(e) => this.onMinutesClicked(1)} onMouseDown={(e) => this.setMinutesTimeout(() => { this.onMinutesClicked(1) })} onMouseUp={(e) => this.clearMinutesTimeout()} onMouseLeave={(e) => this.clearMinutesTimeout()} />
                        <label className='time_label'>{minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })}</label>
                        <label>:</label>
                        <label className='time_label'>{seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })}</label>
                        <button className='decrease_time_button' onClick={(e) => this.onHoursClicked(-1)} onMouseDown={(e) => this.setHoursTimeout(() => { this.onHoursClicked(-1) })} onMouseUp={(e) => this.clearHoursTimeout()} onMouseLeave={(e) => this.clearHoursTimeout()} />
                        <button className='decrease_time_button' onClick={(e) => this.onMinutesClicked(-1)} onMouseDown={(e) => this.setMinutesTimeout(() => { this.onMinutesClicked(-1) })} onMouseUp={(e) => this.clearMinutesTimeout()} onMouseLeave={(e) => this.clearMinutesTimeout()} /> */}
                    </div> : null}
                    <div className='date_picker_footer_container'>
                        <button className='date_picker_cancel_button' onClick={(e) => this.onCancel()}>Cancel</button>
                        <button className='date_picker_accept_button' onClick={(e) => this.onSubmit()}>OK</button>
                    </div>
                </div> : null}
            </div>
        </React.Fragment>);
    }
}