import {Nav, Button, Image} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {BsFillTagFill} from "react-icons/bs";
import {GiPlayButton} from "react-icons/gi";
import {FaEye} from "react-icons/fa";
import {MdDelete, MdEdit} from "react-icons/md";
import moment from "moment";
import {
    deleteTopic, getTopic, resetTopics,
    toggleDownvoteTopic,
    toggleUpvoteTopic, updateTopic,
} from "../../redux/slices/topicSlice";
import {useDispatch, useSelector} from "react-redux";
import parse from "html-react-parser";
import {useEffect, useRef, useState} from "react";
import JoditEditor from "jodit-react";

const TopicContent = ({id, slug, topic, onDeleting}) => {
    const config = {
        placeholder: 'Enter topic content',
        buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
    };
    const user = JSON.parse(localStorage.getItem("user")) || ''
    const editor = useRef(null);
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate;
    const username = JSON.parse(localStorage.getItem("user"))?.username;
    const isAuth = !!localStorage.getItem("isLoggedIn");
    const {votingIsLoading, deleteTopicIsLoading} = useSelector(
        (state) => state.topic
    );
    let updateContent = topic?.content || ''

    const handleToggleUpvoteTopic = (id) => {
        dispatch(toggleUpvoteTopic(id));
    };

    const handleToggleDownvoteTopic = (id) => {
        dispatch(toggleDownvoteTopic(id));
    };
    const handleClose = () => {
        setShow(false)
    }

    const handleSubmitUpdate = async () => {
        await dispatch(updateTopic({ id: topic?._id, content: updateContent }));
        dispatch(getTopic({ id, slug }));
    }

    return (
        <>
            <div className="topic-vote d-flex flex-column align-items-center">
                <Button
                    disabled={votingIsLoading}
                    onClick={() => {
                        if (!isAuth) navigate("/login");
                        if (isAuth) handleToggleUpvoteTopic(topic?._id);
                    }}
                    className={
                        username && topic?.upvotes.includes(username) ? "upvoted" : ""
                    }
                >
                    <GiPlayButton/>
                </Button>
                <span
                    className={`votes ${
                        username && topic?.upvotes?.includes(username) ? "upvoted" : ""
                    }${
                        username && topic?.downvotes?.includes(username) ? "downvoted" : ""
                    }`}
                >
          {topic?.upvotes?.length - topic?.downvotes?.length}
        </span>
                <Button
                    disabled={votingIsLoading}
                    onClick={() => {
                        if (!isAuth) navigate("/login");
                        if (isAuth) handleToggleDownvoteTopic(topic?._id);
                    }}
                    className={
                        username && topic?.downvotes?.includes(username) ? "downvoted" : ""
                    }
                >
                    <GiPlayButton/>
                </Button>
            </div>
            <div className="topic-item-content">
               <h4 className="topic-title">{topic?.title}</h4>
                <div className="topic-meta d-flex align-items-center">
                    <div className="topic-writer d-flex align-items-center">
                        <Link
                            className="d-flex align-items-center justify-content-center"
                            to={`/user/${topic?.author?.username}`}
                        >
                            <Image src={topic?.author?.avatar?.url}/>
                            <h5 className="writer">{`${topic?.author?.firstName} ${topic?.author?.lastName}`}</h5>
                        </Link>
                        <p className="topic-date">
                            Posted{" "}
                            {moment
                                .utc(topic?.createdAt)
                                .local()
                                .startOf("seconds")
                                .fromNow()}
                        </p>
                    </div>
                </div>
                {show ?
                    <>
                        <JoditEditor
                            ref={editor}
                            value={updateContent}
                            config={config}
                            tabIndex={1}
                            // onBlur={(newContent) => getValue(newContent)}
                            onChange={(newContent) => updateContent = newContent}
                        />
                        <div className='d-flex gap-1 mt-3 justify-content-end'>
                            <Button
                                className="mb-4 w-30"
                                style={{backgroundColor: '#666979'}}
                                onClick={()=>handleClose()}
                            >
                                Close
                            </Button>
                            <Button
                                className="mb-4 w-30"
                                style={{backgroundColor: '#546cfb'}}
                                onClick={()=>{
                                    handleSubmitUpdate()
                                }}
                            >
                                Update Topic
                            </Button>
                        </div>
                    </>
                    : <p className="topic-summary">{parse(topic?.content)}</p>
                }
                <div className="tags-container d-flex align-items-center">
          <span className="d-flex align-items-center">
            <BsFillTagFill/>
            tags:
          </span>
                    <Nav as="ul" className="tags">
                        {topic?.tags?.length > 0 &&
                            topic?.tags?.map((tag, i) => {
                                return (
                                    <Nav.Item key={i} as="li">
                                        <Nav.Link>{tag?.name}</Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                    </Nav>

                </div>
                <Nav className="thread-actions d-flex align-items-center">
                    <Nav.Link
                        style={{pointerEvents: `none`}}
                        className="d-flex align-items-center"
                    >
                        <FaEye/>
                        {topic?.viewsCount} views
                    </Nav.Link>
                    {username && topic?.author?.username === username || user.isAdmin ?
                        <Nav.Link
                            disabled={deleteTopicIsLoading}
                            onClick={() => {
                                if (!isAuth) {
                                    navigate("/login");
                                    return;
                                }
                                if (isAuth) {
                                    dispatch(deleteTopic(topic?._id, updateContent));
                                    onDeleting();
                                }
                            }}
                            className="d-flex align-items-center"
                        >
                            <MdDelete/>
                            delete this topic
                        </Nav.Link>
                        :
                        <></>
                    }
                    {
                        username && topic?.author?.username === username || user?.isAdmin ?
                            <Nav.Link
                                onClick={() => {
                                    setShow(true)

                                }}
                                className="d-flex align-items-center"
                            >
                                <MdEdit/>
                                Update This Topic
                            </Nav.Link>
                            :
                            <></>
                        }

                </Nav>
            </div>
        </>
    );
};

export default TopicContent;
