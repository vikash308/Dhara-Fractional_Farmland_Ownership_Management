import { useContext } from "react";
import { SignupContext } from "../context/signupContext";


function Dashboard(){
  const {user} = useContext(SignupContext);

  return<>
  <h1 className="bg-blue-300">Dashboard</h1>
  <p>Welcome, {user? user.username : "User"}!</p>
  </>
}

export default Dashboard;