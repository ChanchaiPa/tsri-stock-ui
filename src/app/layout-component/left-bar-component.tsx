import React from 'react';
import logo from '../../assets/logo_thaisri.svg';
import arrow from '../../assets/down-arrow.svg';
import blueArrow from '../../assets/down-arrow-blue.svg';
import { env } from "../../Environment";



interface State {
    leftNavSelected: { group: number, id: number },
    menuConfig: any,
    RouteToPath: any
}

const initialState: State = {
    leftNavSelected: { group: -1, id: -1 },
    menuConfig: [], //[{"caption":"aaaa"}]
    RouteToPath: null
}

export default class LeftBar extends React.Component<any, State> {
    constructor(_props: any) {
        super(_props);
        this.state = initialState;
    }

    componentDidMount() {
        /*let _url = "http://localhost:8000/ppless/group_menu.json"; 
        http(Method.GET, _url, "", "").then((res: any)=> {
            this.setState( {...this.state, menuConfig: JSON.parse(res)} );
        });*/ //alert(this.props.userrole);
    }

    render() {
        const app_root = env.app_root;
        const { isLeftCollapse, RouteToPath, dispatch } = this.props;
        const { leftNavSelected, menuConfig } = this.state;
        return (<React.Fragment>
            <div className={isLeftCollapse ? 'left_container small' : 'left_container'}>
                <div className='logo_container'>
                    <img alt='logo' src={logo} className='logo' />
                </div>
                <div className='left_nav_container'>
                    <LeftNavGroupHeader>Tsri Stock App</LeftNavGroupHeader>

                    <LeftNavGroup key={1} group={1} title='Program Menu' isLeftCollapse={isLeftCollapse} navSelect={leftNavSelected} onNavSelect={(group: number, id: number, path: string, menu: number, right: string) => {
                        this.setState({ leftNavSelected: { group: group, id: id } });
                        // if (group>=0 && id>=0) store.dispatch({ type: SearchPAction.CLEAR, payload: {} });
                        // if (group>=0 && id>=0) dispatch( _searchClear() );  
                        if (path) RouteToPath(path, right);
                        }}>
                     
                        {/* <LeftNav key={101} menu={1} path={root + '/welcome'} right={'000'}>Welcome</LeftNav>
                        <LeftNav key={102} menu={1} path={root + '/temp'} right={'000'}>Temp</LeftNav> */}
                        <LeftNav key={1} menu={1} path={app_root+"/supplier-search"} right={'000'}>ข้อมูลบริษัท</LeftNav>
                        <LeftNav key={2} menu={1} path={app_root+"/group-search"} right={'000'}>ข้อมูลกลุ่มวัสดุ</LeftNav>
                        <LeftNav key={3} menu={1} path={app_root+"/category-search"} right={'000'}>ข้อมุลหมวดหมู่</LeftNav>
                        <LeftNav key={4} menu={1} path={app_root+"/asset-search"} right={'000'}>ข้อมูลทรัพย์สิน</LeftNav>
                        <LeftNav key={5} menu={1} path={app_root+"/inventory-search"} right={'000'}>การรับเข้าวัสดุ</LeftNav>
                        <LeftNav key={6} menu={1} path={app_root+"/distribute-search"} right={'000'}>การเบิกวัสดุ</LeftNav>
                        <LeftNav key={7} menu={1} path={app_root+"/report1"} right={'000'}>รายงาน</LeftNav>                        
                    </LeftNavGroup>                    
                                   
                </div>
            </div>
        </React.Fragment>)
    }
}

const LeftNav = (props: any) => {
    const { title, navSelect, onNavSelect, group, id, path, menu, right } = props; 
    return (<div key={(group + id).toString()} className={'left_nav_child'} onClick={() => { if (navSelect.group === group) { onNavSelect(group, id, path, menu, right); } }}>
        <div className={navSelect.group === group && navSelect.id === id ? 'left_nav_child_title selected' : 'left_nav_child_title'}>&nbsp;{title}</div>
    </div>);
}










class LeftNavGroup extends React.Component<any, any> {
    private leftNavGroupRef: any;
    constructor(_props: any) {
        super(_props);
        this.leftNavGroupRef = React.createRef();
        this.state = { height: 0 }
    }

    componentDidMount() {
        this.setState({ height: this.leftNavGroupRef.current.children[0].offsetHeight });
    }

    getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
        if (prevProps.navSelect.group !== this.props.navSelect.group) {
            return true;
        }
        return false;
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: boolean) {
        if (snapshot) {
            const { navSelect, group } = this.props;
            if (navSelect.group !== group) {
                this.setState({ height: this.leftNavGroupRef.current.children[0].offsetHeight });
            } else {
                let _tempContentElementHeight = 0;
                let left_nav_children_container = this.leftNavGroupRef.current.children[1];
                for (let i = 0; i < left_nav_children_container.children.length; i++) {
                    _tempContentElementHeight += left_nav_children_container.children[i].offsetHeight;
                }
                this.setState({ height: this.leftNavGroupRef.current.children[0].offsetHeight + _tempContentElementHeight });
            }
        }
    }

    render() {
        const { group, navSelect, onNavSelect, title, children } = this.props;
        const { height } = this.state;
        return (<React.Fragment>
            <div key={group.toString()} ref={this.leftNavGroupRef} className='left_nav' style={{ height: height + 'px' }}>
                <div className={navSelect.group !== group ? 'left_nav_header' : 'left_nav_header selected'} onClick={(e) => {
                    if (group === navSelect.group) {  
                        onNavSelect(-1, navSelect.id);   
                    } else {
                        onNavSelect(group, -1);   
                    }
                }}>
                    {navSelect.group !== group ? <div className='left_nav_header_pin_color' /> : null}
                    <div className='left_nav_header_title'>{title}</div>
                    <div className='left_nav_header_arrow_container'>
                        <img alt='arrow' src={navSelect.group === group ? blueArrow : arrow} /></div></div>
                <div className='left_nav_children_container'>

                    {navSelect.group === group ? React.Children.map(children, (child: any, id: number) => { 
                        if (React.isValidElement(child)) {
                            const { children, path }: any = child.props;
                            return React.cloneElement(child as React.ReactElement<any>, { title: children, navSelect: navSelect, group: group, id: id, onNavSelect: onNavSelect, path: path }, null);
                        } else {
                            return null;
                        }

                    }) : null}
                </div>
                {navSelect.group === group ? <div className='clip_selected' /> : null}
            </div>
        </React.Fragment>);
    }
}

const LeftNavGroupHeader = (props: { children: string }) => {
    const { children } = props;
    return <label className='left_nav_group_header'>{children}</label>
}
