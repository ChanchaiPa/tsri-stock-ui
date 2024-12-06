import React from 'react';
import './table.css';

interface PropState {
    header: { name: string, displayName: string, filter?: any }[],
    rowData: any[],
    onRowClick?: any,
    rowSelect?: any,
    disabled?: boolean
}

export default class Table extends React.Component<PropState, any> {

    render() {
        const { header, rowData, onRowClick, rowSelect, disabled } = this.props;
        return (<div className='table-container' style={{ minHeight: '200px' }}>
            {/* {rowData.length > 0 ? null : <div style={{ height: '200px' }} className='initial-label'>no row data</div>} */}
            <table className='table table-sm' >
                <thead className='table-head'>
                    <tr>
                        {header.map((h) => <th key={h.name}>{h.displayName}</th>)}
                    </tr>
                </thead>
                <tbody className={(disabled ? 'table-body unable' : 'table-body able')}>
                    {rowData.map((r) => {
                        return <tr key={rowData.indexOf(r)} className={(typeof (rowSelect) !== 'undefined' ? (rowSelect.id === r.id ? 'select' : '') : '')} onClick={() => { if (typeof (onRowClick) !== 'undefined') onRowClick(r) }}>{header.map((h) =>
                            <td key={h.name}>{r[`${h.name}`]}</td>
                        )}</tr>
                    })}
                </tbody>
            </table>
        </div>);
    }
}

interface PaginationPropState {
    page: number,
    pages: number,
    onPageChange: any,
    disabled?: boolean,
    page_limit: number
}


export class Pagination extends React.Component<PaginationPropState, any> {


    createPageNumber = () => {
        const { page, pages, onPageChange, page_limit } = this.props;
        let ret: any[] = [];
        let pageNumbers: number[] = [];
        pageNumbers.push(page);

        const max_next: number = Math.ceil((page_limit - 1) / 2);
        const max_previous: number = Math.floor((page_limit - 1) / 2);

        for (let i = 1; i <= max_next; i++) {
            const next_page = page + i;
            pageNumbers.push(next_page);
        }

        for (let i = 1; i <= max_previous; i++) {
            const previous_page = page - i;
            pageNumbers.unshift(previous_page);
        }

        while (pageNumbers.length > pages) {
            pageNumbers.pop();
        }

        while (pageNumbers[0] < 1) {
            for (let i = 0; i < pageNumbers.length; i++) {
                pageNumbers[i]++;
            }
        }

        while (pageNumbers[pageNumbers.length - 1] > pages) {
            for (let i = 0; i < pageNumbers.length; i++) {
                pageNumbers[i]--;
            }
        }

        for (let i = 0; i < pageNumbers.length; i++) {
            ret.push(<button key={i} className={(page === pageNumbers[i]) ? 'page-button active' : 'page-button'}
                onClick={() => onPageChange(pageNumbers[i])} >
                {pageNumbers[i]}
            </button>)
        }

        return ret;
    }

    render() {
        const { page, pages, onPageChange, disabled } = this.props;
        return (
            <React.Fragment>
                <fieldset disabled={disabled}>
                    <div className='pagination-container'>
                        <div className='page-container'>
                            <button className='page-button' onClick={() => onPageChange(1)}>First</button>
                            <button className='page-button page-prev' onClick={() => { if (page - 1 > 0) onPageChange(page - 1) }}></button>
                            {this.createPageNumber()}
                            <button className='page-button page-next' onClick={() => { if (page + 1 <= pages) onPageChange(page + 1) }}></button>
                            <button className='page-button' onClick={() => onPageChange(pages)}>Last</button>
                        </div>
                        <div className='page-desc-container'>
                            {pages > 0 ? <React.Fragment><code>{page}</code> of <code>{pages}</code> pages</React.Fragment> :
                                <React.Fragment> <code>{pages}</code> pages</React.Fragment>}
                        </div>
                        <div className='page-desc-container' style={{position: 'fixed', right: 50 }} ></div>
                    </div>
                </fieldset>
            </React.Fragment>

        );
    }
}