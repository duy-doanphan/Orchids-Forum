import {useRef, useState} from "react";
import { Form, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/slices/commentSlice";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const config = {
  placeholder:'Enter comment here...',
  buttons: ["bold", "italic", "link", "unlink", "ul", "ol", "underline", "image", "font", "fontsize", "brush", "redo", "undo", "eraser", "table"],
};

const CommentForm = ({ topic, onSubmitting, passedComment = null }) => {
  const editor = useRef(null);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let isAuth = !!localStorage.getItem("isLoggedIn");

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      navigate("/login");
      return;
    }
    if (!comment || comment?.trim().length === 0) return;
    const id = topic?._id;
    const parentComment = passedComment?._id || null;
    try {
      dispatch(addComment({ id, comment, parentComment }));
      setComment("");
      if (onSubmitting) onSubmitting();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Form className="floating" onSubmit={handleAddComment}>
      <Form.Group className="form-group" as={Col} controlId="topicTitle">
        {/*<Form.Control*/}
        {/*  as="textarea"*/}
        {/*  rows={3}*/}
        {/*  type="text"*/}
        {/*  name="comment"*/}
        {/*  value={comment}*/}
        {/*  placeholder="Enter comment here..."*/}
        {/*  onChange={(e) => setComment(e.target.value)}*/}
        {/*/>*/}
        {/*<Form.Label>Your reply goes here...</Form.Label>*/}
        <JoditEditor
            ref={editor}
            value={comment}
            config={config}
            tabIndex={1}
            // onBlur={(newContent) => getValue(newContent)}
            onChange={(newContent) => setComment(newContent)}
        />
      </Form.Group>
      <Button type="submit" className="float-end"  style={{backgroundColor:'#546cfb'}}>
        Post Comment
      </Button>
    </Form>
  );
};

export default CommentForm;
