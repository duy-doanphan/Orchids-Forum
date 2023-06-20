import {Col, Row, Image, Nav} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom";
import { getUserFollowers } from "../../../redux/slices/profileSlice";
import { useMemo } from "react";
import FollowButton from "../FollowButton";
import SkeletonFollowTab from "../../Skeletons/SkeletonFollowTab";
import {log} from "@craco/craco/dist/lib/logger";
import {NavLink} from "reactstrap";

const FollowersTab = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  let { userFollowers, followIsLoading } = useSelector(
    (state) => state.profile
  );

  useMemo(() => {
    dispatch(getUserFollowers(username));
  }, [dispatch, username]);
  return useMemo(() => {
    return (
      <>
        <Row className="profile-info">
          <Col>
            <div className="tab-ui">
              <h6 className="tab-title">following</h6>
              <Row>
                {followIsLoading && (
                  <>
                    <SkeletonFollowTab />
                  </>
                )}
                {!followIsLoading &&
                  userFollowers.length > 0 &&
                  userFollowers?.map((user) => (
                    <Col key={user?._id} lg={12}>
                      <div className="follow-brief d-flex align-items-center">
                        <Image src={user?.avatar?.url} />
                        <div className="user-meta d-flex flex-column">
                          <Link to={`/user/${user?.username}`} style={{color:'black', textDecoration:'none' }}>
                            <h5 className="user-name">
                              {user?.firstName} {user?.lastName}
                            </h5>
                          </Link>
                          <span className="username">@{user?.username}</span>
                          <span className="user-bio">{user?.bio}</span>
                        </div>
                        <FollowButton passedUser={user} />
                      </div>
                    </Col>
                  ))}
              </Row>
            </div>
          </Col>
        </Row>
      </>
    );
  }, [userFollowers, followIsLoading]);
};

export default FollowersTab;
