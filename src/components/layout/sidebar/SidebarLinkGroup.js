import SidebarLink from './SidebarLink'
import style from "styled-components"

const LinkSidebarGroup = style.div`
    display: flex;
    flex-direction: column;
    padding: 20px 0 15px 0;
    overflow: hidden;
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 4px;
        background: rgba(213, 219, 227, 1);
    }
    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgba(170, 170, 170, 0.8);
        border-radius: 4px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: rgba(170, 170, 170, 1);
    }
`;

const LinkSidebarList = style(SidebarLink)`
    && {
        min-height: 40px;
    }
`;

const links = [
    {
        to: "/home",
        icon: "home",
        label: "หนัาหลัก",
    },
    {
        to: "/searchProduct",
        icon: "search",
        label: "ค้นหาผลิตภัณฑ์",
    },
    {
        to: "/productlist",
        icon: "folder-open",
        label: "รายการผลิตภัณฑ์",
    },
    {
        to: "/createProduct",
        icon: "create",
        label: "สร้างฉลากโภชนาการ",
    },
    {
        to: "/about",
        icon: "pie-chart",
        label: "ข้อมูลเพิ่มเติม",
    },
]

function SidebarLinkGroup(props) {
    return (
        <LinkSidebarGroup {...props}>
            {links.map(link => <LinkSidebarList  
                collapse={props.compact}
                key={link.to}
                to={link.to}
                iconName={link.icon}
                label={link.label}
            />)}
            {/* <LinkSidebarList to="/home">
                <ion-icon name="home"></ion-icon>
                <span className="label">หนัาหลัก</span>
            </LinkSidebarList> 
            <LinkSidebarList to="/searchProduct">
                <ion-icon name="search"></ion-icon>
                <span className="label">ค้นหาผลิตภัณฑ์</span>
            </LinkSidebarList>
            <LinkSidebarList to="/productlist">
                <ion-icon name="folder-open"></ion-icon>
                <span className="label">รายการผลิตภัณฑ์</span>
            </LinkSidebarList>
            <LinkSidebarList to="/createProduct">
                <ion-icon name="create"></ion-icon>
                <span className="label">สร้างฉลากโภชนาการ</span>
            </LinkSidebarList>
            <LinkSidebarList to="/about">
                <ion-icon name="pie-chart" ></ion-icon>
                <span className="label">ข้อมูลเพิ่มเติม</span>
            </LinkSidebarList> */}
        </LinkSidebarGroup>
    )
}

export default SidebarLinkGroup
