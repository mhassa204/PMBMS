import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./viewUserStyle.css"; 
import { text } from "@fortawesome/fontawesome-svg-core";

const ViewUser = () => {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return <div className="viewUser-container"><p className="userInfo-value">User data not available</p></div>;
  }

  return (
    <div className="p-4">
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white border rounded-md textBlue">
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
        <div className="grid grid-cols-2 gap-x-4">
          <UserInfo title="Email:" value={user.Email} />
          <UserInfo title="Username:" value={user.Username} />
          <UserInfo title="Contact #:" value={user.Mobile} />
          <UserInfo title="City:" value={user.CityName} />
          <UserInfo title="User Type:" value={user.UserType} />
          <UserInfo title="Status:" value={user.Status} />
          <div className="col-span-2 mt-5 flex justify-end">
            <Link to="/admin/user-list">
              <button className="viewUser-backbutton">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserInfo = ({ title, value }) => (
    <div className="userInfo">
      <div className="userInfo-title"> {title}       
      <div className="userInfo-value">{value}</div>
</div>
    </div>
  );
  

export default ViewUser;