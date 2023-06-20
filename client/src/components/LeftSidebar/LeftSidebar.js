import { Col, Nav } from "react-bootstrap";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { MdQuestionAnswer, MdReplyAll } from "react-icons/md";
import SpacesCard from "./Cards/SpacesCard";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const LeftSidebar = () => {
  const { user, token, isHeaderLoading } = useSelector((state) => state.auth);
  const isAuth = !!localStorage.getItem("isLoggedIn");
  const navigate = useNavigate()
  return (
    <Col lg={3} className="left-sidebar">
      <Nav className="flex-column side-topics">
        <Nav.Link className="d-flex align-items-center">
          <BsFillQuestionCircleFill />
          all topics
        </Nav.Link>
        <Nav.Link
            className="d-flex align-items-center"
            onClick={()=>{
              if (!isAuth) {navigate('/login')} else navigate(`/user/${user?.username}/topics`)
            }}
        >
          <MdQuestionAnswer />
          my topics
        </Nav.Link>
        <Nav.Link
            className="d-flex align-items-center"
            onClick={()=>{
              if (!isAuth) {navigate('/login')} else navigate(`/user/${user?.username}/comments`)
            }}
        >
          <MdReplyAll />
          my answers
        </Nav.Link>
      </Nav>

      <SpacesCard />
    </Col>
  );
};

export default LeftSidebar;
