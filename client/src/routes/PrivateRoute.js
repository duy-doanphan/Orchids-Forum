import Lottie from "lottie-react";
import Error404 from "../assets/lotties/error-404-not-found.json";
import {Row} from "react-bootstrap";

const PrivateRoute = (props) => {
    const {children} = props
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            {user?.isAdmin ? children :
                <>
                    <Row className="auth-form justify-content-center">
                        <div className="bg-wrapper">
                            <div
                                style={{
                                    display: "inline-block",
                                    maxWidth: `534px`,
                                    transformOrigin: `center center`,
                                }}
                                className="bg"
                            >
                                <Lottie animationData={Error404}/>
                            </div>
                        </div>
                    </Row>
                </>
            }
        </>
    )
}
export default PrivateRoute
