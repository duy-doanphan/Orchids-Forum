import LeftSidebarAdmin from "../components/LeftSidebarAdmin/LeftSidebarAdmin";
import {Col, Row} from "react-bootstrap";
import {Outlet} from "react-router-dom";

const Admin = () => {
    return(
        <>
                <div className='admin-container'>
                        <LeftSidebarAdmin/>
                        <Col lg={6} className="main-content">
                            <div className="topics">
                                <Outlet></Outlet>
                            </div>
                        </Col>
                </div>

        </>
    )
}
export default Admin