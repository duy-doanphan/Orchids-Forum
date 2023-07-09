import './Style/Table.css'
import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Image} from "react-bootstrap";
import {deleteTopic, getAllTopics} from "../redux/slices/topicSlice";
import {MdDelete} from "react-icons/md";


const ManagePost = () => {
    const dispatch = useDispatch();
    const {topics} = useSelector((state) => state.topic);

    useEffect(() => {
        dispatch(getAllTopics({}))
    }, [dispatch]);

    return useMemo(() => {
        return <>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Table Topic</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-wrap">
                                {/*{message && (*/}
                                {/*    <div*/}
                                {/*        className={`message ${isError ? "error" : ""} ${*/}
                                {/*            isSuccess ? "success" : ""*/}
                                {/*        } ${deleteTopicIsLoading ? "info" : ""}`}*/}
                                {/*    >*/}
                                {/*        {message}*/}
                                {/*    </div> )*/}
                                {/*}*/}
                                {/*<div className="search-container">*/}
                                {/*    <input*/}
                                {/*        type="text"*/}
                                {/*        placeholder="Search by username"*/}
                                {/*        value={searchTerm}*/}
                                {/*        onChange={handleSearchChange} // Call the debounced filter function on change*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <table className="table table-responsive-xl">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Author</th>
                                        <th>Title</th>
                                        <th>Total View</th>
                                        <th>Like</th>
                                        <th>UnLike</th>
                                        <th>Total Comment</th>
                                        <th>Action</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {topics && topics.length > 0 &&
                                        topics.map((topic, index) => (
                                                <tr key={`${topic._id}`} className="alert" role="alert">
                                                    <td>
                                                        <label className="checkbox-wrap checkbox-primary">
                                                        </label>
                                                        <span>{index + 1}</span>
                                                    </td>
                                                    <td className="d-flex">
                                                        <div className="img" style={{borderRadius: '50%'}}>
                                                            <Image width="35"
                                                                   height="35"
                                                                   roundedCircle
                                                                   src={topic?.author?.avatar?.url}>
                                                            </Image>
                                                        </div>
                                                        <div className="pl-3 email row">
                                                                <span>{topic?.author?.email}  {topic?.author?.isLock && <span className='locked-user mx-3'>Locked</span>}</span>

                                                            <span>Create: {new Date(topic.createdAt).toLocaleString()}</span>
                                                        </div>
                                                    </td>
                                                    <td>{topic.title}</td>
                                                    <td>{topic.viewsCount}</td>
                                                    <td>{topic.upvotes.length ?? 0}</td>
                                                    <td>{topic.downvotes.length ?? 0}</td>
                                                    <td>{topic.totalComments}</td>
                                                    <td className='action-delete'
                                                        onClick={()=>{
                                                            dispatch(deleteTopic(topic?._id));
                                                        }}
                                                    >
                                                        <MdDelete/>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    }, [topics])

}
export default ManagePost