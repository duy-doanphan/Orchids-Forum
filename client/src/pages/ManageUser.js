import './Style/Table.css'
import {memo, useEffect, useMemo, useState} from "react";
import {getAllUser, putLockUser} from "../redux/slices/adminSlice";
import {useDispatch, useSelector} from "react-redux";
import {Image} from "react-bootstrap";
import {debounce} from "lodash";
import {AiOutlineLock, AiOutlineUnlock} from "react-icons/ai";

const ManageUser = () => {
    const dispatch = useDispatch();
    const {Users, getAllUserIsLoading} = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(getAllUser())
    }, [dispatch]);

    const handleToggleLock = async (id) => {
        await dispatch(putLockUser(id))
        await dispatch(getAllUser())
    }

    return useMemo(() => {
        return <>
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Table User</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-wrap">
                                {/*<div className="search-container">*/}
                                {/*    <input*/}
                                {/*        type="text"*/}
                                {/*        placeholder="Search by username"*/}
                                {/*        value={searchTerm}*/}
                                {/*        onChange={(e)=>{}} // Call the debounced filter function on change*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <table className="table table-responsive-xl">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Email</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Users && Users.length > 0 &&
                                        Users.map((user, index) => (
                                                <tr key={`${user._id}`} className="alert" role="alert">
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
                                                                   src={user?.avatar}>
                                                            </Image>
                                                        </div>
                                                        <div className="pl-3 email row">
                                                            <span>{user.email}</span>
                                                            <span>Added: {user.createdAt}</span>
                                                        </div>
                                                    </td>
                                                    <td>{user.username}</td>
                                                    <td>{user.isAdmin ? 'ADMIN' : 'USER'}</td>

                                                    <td className="status ">
                                                        <span
                                                            className={user.isVerified ? 'active' : 'waiting'}>
                                                        {user.isVerified ? "Active" : "Unavailable"}
                                                        </span>
                                                        {user.isLock === true ?
                                                            <span className='locked mx-3'>Locked</span> : <span></span>}
                                                    </td>
                                                    {!user.isAdmin ?
                                                        <td className='action'
                                                            onClick={() => {
                                                                handleToggleLock(user._id)
                                                            }}
                                                        >
                                                            {user.isLock === false ?
                                                                <span>
                                                                <AiOutlineUnlock></AiOutlineUnlock>
                                                            </span>
                                                                :
                                                                <span>
                                                                <AiOutlineLock></AiOutlineLock>
                                                            </span>
                                                            }
                                                        </td>
                                                        :
                                                        <td></td>
                                                    }
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
    }, [Users])

}
export default ManageUser