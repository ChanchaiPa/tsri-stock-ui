import React from 'react';
import './main-button.css';


interface PropStateButton {
    disabled?: boolean,
    onClick?: any,
    caption?: string
}

export class NewButton extends React.Component<PropStateButton> {
    render() {
        const { disabled, onClick } = this.props;
        return (<button className='main-button new' disabled={disabled} onClick={(e) => onClick ? onClick() : null}><div>เพิ่ม</div></button>);
    }
}

export class EditButton extends React.Component<PropStateButton> {
    render() {
        const { disabled, onClick } = this.props;
        return (<button className='main-button edit' disabled={disabled} onClick={(e) => onClick ? onClick() : null}><div>แก้ไข</div></button>);
    }
}

export class SaveButton extends React.Component<PropStateButton> {
    render() {
        const { disabled, onClick, caption } = this.props;
        return (<button className='main-button save' disabled={disabled} onClick={(e) => onClick ? onClick() : null}><div>{caption ? caption : 'บันทึก'}</div></button>);
    }
}

export class BackButton extends React.Component<PropStateButton> {
    render() {
        const { disabled, onClick } = this.props;
        return (<button className='main-button back' disabled={disabled} onClick={(e) => onClick ? onClick() : null} style={{ float: 'right' }}><div>กลับ</div></button>);
    }
}

export class CancelButton extends React.Component<PropStateButton> {
    render() {
        const { disabled, onClick } = this.props;
        return (<button className='main-button back' disabled={disabled} onClick={(e) => onClick ? onClick() : null}><div>ยกเลิก</div></button>);
    }
}

export class DeleteButton extends React.Component<PropStateButton> {
    render() {
        const { disabled, onClick } = this.props;
        return (<button className='main-button delete' disabled={disabled} onClick={(e) => onClick ? onClick() : null}><div>ลบ</div></button>);
    }
}

export class CloseButton extends React.Component<PropStateButton> {
    render() {
        const { disabled, onClick, caption } = this.props;
        return (<button className='main-button save' disabled={disabled} onClick={(e) => onClick ? onClick() : null}><div>{caption ? caption : 'ปิดงาน'}</div></button>);
    }
}