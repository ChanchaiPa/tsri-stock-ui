import React from "react";
import { formatMoneyWithDecimal, onNumberPress, onNumberWithDecimalPress } from "../share-service";


interface TextProp {
    label?: string,
    onChange?: any,
    disabled?: boolean,
    value: string | number,
    placeholder?: string,
    maxLength?: number,
    onKeyPress?: any,
    required?: boolean,
    format?: any,
    rows?: number,
    children?: any
}

export class TextInput extends React.Component<TextProp, any> {

    render() {
        const { label, placeholder, value, onChange, disabled, maxLength, onKeyPress, required, format } = this.props;
        return (<React.Fragment>
            <label className='input-label'>{label}<label className='input-required-label'>{required ? '*' : null}</label></label>
            <div className='input-group'>
                <input className='form-control-sm input-custom' maxLength={maxLength} value={value} onKeyPress={(e) => onKeyPress ? onKeyPress(e) : {}}
                    placeholder={placeholder} disabled={disabled} onChange={(e) => format ? onChange(format(e.target.value)) : onChange(e.target.value)} />
            </div>
        </React.Fragment>);
    }
}

export class AreaTextInput extends React.Component<TextProp, any> {

    render() {
        const { label, placeholder, value, onChange, disabled, maxLength, onKeyPress, required, rows } = this.props;
        return (<React.Fragment>
            <label className='input-label'>{label}<label className='input-required-label'>{required ? '*' : null}</label></label>
            <div className='input-group'>
                <textarea rows={rows} className='form-control form-control-sm input-custom' maxLength={maxLength} onKeyPress={(e) => onKeyPress ? onKeyPress(e) : {}} value={value} placeholder={placeholder} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
            </div>
        </React.Fragment>);
    }
}

export class PasswordInput extends React.Component<TextProp, any> {

    render() {
        const { label, placeholder, value, onChange, disabled, maxLength, onKeyPress, required } = this.props;
        return (<React.Fragment>
            <label className='input-label'>{label}<label className='input-required-label'>{required ? '*' : null}</label></label>
            <div className='input-group'>
                <input className='form-control-sm input-custom' type="password" maxLength={maxLength} onKeyPress={(e) => onKeyPress ? onKeyPress(e) : {}} value={value} placeholder={placeholder} disabled={disabled} onChange={(e) => onChange(e.target.value)} />
            </div>
        </React.Fragment>);
    }
}

export class SelectInput extends React.Component<TextProp, any> {

    render() {
        const { label, value, onChange, disabled, children, required } = this.props;
        return (<React.Fragment>
            <label className='input-label'>{label}<label className='input-required-label'>{required ? '*' : null}</label></label>
            <div className='input-group'>
                <select className='form-control-sm input-custom' value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
                    {children}
                </select>
            </div>
        </React.Fragment>);
    }
}


export class MoneyInput extends React.Component<TextProp, any> {
    constructor(_props: any) {
        super(_props);
        this.state = { value: formatMoneyWithDecimal(_props.value) };
    }

    getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
        if (prevProps.value !== this.props.value)
            return true;

        return false;
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: boolean) {
        if (snapshot)
            this.setState({ value: formatMoneyWithDecimal(this.props.value) });
    }

    render() {
        const { label, placeholder, onChange, disabled, required } = this.props;
        const { value } = this.state;
        return (<React.Fragment>
            <label className='input-label'>{label}<label className='input-required-label'>{required ? '*' : null}</label></label>
            <div className='input-group'>
                <input className='form-control-sm input-custom' onKeyPress={(e: any) => onNumberWithDecimalPress(e, value?.toString())}
                    value={value} placeholder={placeholder} disabled={disabled} onChange={(e) => this.setState({ value: e.target.value })}
                    onFocus={(e: any) => this.setState({ value: value.replaceAll(/,/g, '') })}
                    onBlur={(e: any) => {
                        this.setState({ value: formatMoneyWithDecimal(value) });
                        onChange(parseFloat(value.replaceAll(/,/g, '')));
                    }} />
            </div>
        </React.Fragment>);
    }
}

interface SearchProp {
    label?: string,
    onChange?: any,
    disabled?: boolean,
    value: string | number,
    placeholder?: string,
    onOpen?: any,
    required?: boolean
}

export class SearchInput extends React.Component<SearchProp, any> {

    render() {
        const { label, placeholder, value, onChange, onOpen, disabled, required } = this.props;
        return (<React.Fragment>
            <label className='input-label'>{label}<label className='input-required-label'>{required ? '*' : null}</label></label>
            <div className='input-group'>
                <input className='form-control form-control-sm input-custom search-input' value={value} placeholder={placeholder} disabled={true} onChange={(e) => onChange(e.target.value)} />
                <button className='search-input-button' onClick={() => onOpen()} disabled={disabled} />
            </div>
        </React.Fragment>);

    }
}
