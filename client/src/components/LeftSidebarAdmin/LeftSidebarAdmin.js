import { Col, Nav } from "react-bootstrap";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import {
    MdDashboardCustomize,
    MdOutlineHome,
    MdPostAdd,
    MdSupervisorAccount
} from "react-icons/md";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const LeftSidebarAdmin = () => {
    const { user, token, isHeaderLoading } = useSelector((state) => state.auth);
    const isAuth = !!localStorage.getItem("isLoggedIn");
    const navigate = useNavigate()
    return (
        <Col lg={3} className="left-sidebar">
            <Nav className="flex-column side-topics">
                <div className='title'>ONetWork Forum Manage</div>
                <Nav.Link className="d-flex align-items-center"
                          onClick={()=>{navigate('/')}}
                >
                    <MdOutlineHome />
                    Home
                </Nav.Link>
                <Nav.Link className="d-flex align-items-center"
                          onClick={()=>{navigate('/admin')}}
                >
                    <MdDashboardCustomize />
                    Dashboard
                </Nav.Link>
                <Nav.Link
                    className="d-flex align-items-center"
                    onClick={()=>{navigate('/admin/manage-user')}}
                >
                    <MdSupervisorAccount />
                    Manage Users
                </Nav.Link>
                <Nav.Link
                    className="d-flex align-items-center"
                    onClick={()=>{navigate('/admin/manage-post')}}
                >
                    <MdPostAdd />
                    Manage Post
                </Nav.Link>
            </Nav>
        </Col>
    );
};

export default LeftSidebarAdmin;
