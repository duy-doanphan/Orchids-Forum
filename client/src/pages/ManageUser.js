import './Style/Table.css'
import {RiDeleteBin6Line} from "react-icons/ri";
import {useEffect, useState} from "react";
import {deleteUser, getAllUser} from "../redux/slices/adminSlice";
import {useDispatch, useSelector} from "react-redux";
import {Image} from "react-bootstrap";
import {debounce} from "lodash";
const ManageUser = () => {
    const dispatch = useDispatch();
    const {Users, getAllUserIsLoading} = useSelector((state) => state.admin);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        dispatch(getAllUser())
        setFilteredUsers(Users)
    }, [dispatch]);


    // Filter the Users based on the search term
    // Filter the Users based on the search term
    const filterUsers = (searchTerm) => {
        return Users.filter((user) =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    // Debounced filter function
    const delayedFilter = debounce((searchTerm) => {
        const filtered = filterUsers(searchTerm);
        setFilteredUsers(filtered);
    }, 1000); // Adjust the delay time (in milliseconds) as needed

    // Handle search input change
    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        delayedFilter(value); // Call the debounced filter function
    };

    return (
        <>
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
                                <div className="search-container">
                                    <input
                                        type="text"
                                        placeholder="Search by username"
                                        value={searchTerm}
                                        onChange={handleSearchChange} // Call the debounced filter function on change
                                    />
                                </div>
                                <table className="table table-responsive-xl">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Email</th>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {Users && Users.length > 0 &&
                                        filteredUsers.map((user, index) => (
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
                                                    <td className="status"><span
                                                        className={user.isVerified ? 'active' : 'waiting'}>{user.isVerified ? "Active" : "Unavailable"}</span>
                                                    </td>
                                                    <td className='action'>
                                                        <span
                                                            onClick={()=>{dispatch(deleteUser(user._id))}}
                                                            aria-hidden="true"><RiDeleteBin6Line></RiDeleteBin6Line></span>
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
    )

}
export default ManageUser