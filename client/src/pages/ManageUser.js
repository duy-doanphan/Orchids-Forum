import './Style/Table.css'
import {RiDeleteBin6Line} from "react-icons/ri";
const ManageUser = () => {

    return(
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
                                <table className="table table-responsive-xl">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="alert" role="alert">
                                        <td>
                                            <label className="checkbox-wrap checkbox-primary">
                                            </label>
                                            <span>1</span>
                                        </td>
                                        <td className="d-flex">
                                            <div className="pl-3 email row">
                                                <span>markotto@email.com</span>
                                                <span>Added: 01/03/2020</span>
                                            </div>
                                        </td>
                                        <td>Markotto89</td>
                                        <td className="status"><span className="active">Active</span></td>
                                        <td className='action'>
                                                <span aria-hidden="true"><RiDeleteBin6Line></RiDeleteBin6Line></span>
                                        </td>
                                    </tr>
                                    <tr className="alert" role="alert">
                                        <td>
                                            <label className="checkbox-wrap checkbox-primary">
                                            </label>
                                            <span>2</span>
                                        </td>
                                        <td className="d-flex align-items-center">
                                            <div className="pl-3 email">
                                                <span>jacobthornton@email.com</span>
                                                <span>Added: 01/03/2020</span>
                                            </div>
                                        </td>
                                        <td>Jacobthornton</td>
                                        <td className="status"><span
                                            className="waiting">Waiting for Resassignment</span></td>
                                        <td>
                                            <span aria-hidden="true"><RiDeleteBin6Line></RiDeleteBin6Line></span>
                                        </td>
                                    </tr>
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