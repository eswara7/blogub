import { Quote } from "../components/Quote";
import { signupInput } from "@eswara1/blogub_common";
import { Link, useNavigate } from "react-router-dom";
import { InputLabels } from "../components/InputLabels";
import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [postInputs, setPostInputs] = useState<signupInput>({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message,setMessage] = useState("")
  const navigate = useNavigate();

  
  async function signupRequest() {
    setIsLoading(true);
    try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}api/v1/user/signup`,
      postInputs);
    if (response.data) {
      localStorage.setItem("token", response.data.token);
      navigate("/blogs");
    }
    else{
      setMessage(response.data.message)
    }
    } 
    catch (error:any) {
      if (error.response && error.response.status === 400 || error.response && error.response.status===404) {
        const errorMessage = Array.isArray(error.response.data.message)?error.response.data.message[0]:error.response.data.message
        setMessage(errorMessage)
      } else if(error.request){
          console.log(error.request)
      }
      else{
        setMessage("error while signing up")
      }
  }
  finally{
    setIsLoading(false);
  }
}
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <div className="h-screen flex justify-center flex-col">
          {/*  {JSON.stringify(postInputs)} */}
          <div className="flex justify-center">
            <div>
              <div className="px-10">
                <div className="text-2xl font-extrabold">Create an account</div>
                <div>
                  already have an account?
                  <Link className="text-slate-5 00 underline pl-2" to="/signin">
                    signin
                  </Link>
                </div>
              </div>
              <div className="pt-8">
                <InputLabels
                  label="name"
                  placeholder="virat kohli..."
                  onChange={(e) => {
                    /*   setPostInputs(c=>({
                                ...c,
                                name:e.target.value
                            })) BEST CHOICE(AVOID RACE CONDITION)*/
                    setPostInputs({
                      ...postInputs,
                      name: e.target.value,
                    });setMessage("")
                  }}
                />
                <InputLabels
                  label="email"
                  placeholder="e.g virat@gmail.com.."
                  onChange={(e) => {
                    setPostInputs((c) => ({
                      ...c,
                      email: e.target.value,
                    }));setMessage("")
                  }}
                />
                <InputLabels
                  label="password"
                  type="password"
                  placeholder=""
                  onChange={(e) => {
                    setPostInputs((c) => ({
                      ...c,
                      password: e.target.value,
                    }));setMessage("")
                  }}
                  className={message?"border-red-300":""}
                />
                <p className="text-red-500 m-1 text-sm">{message}</p>
                <button
                  onClick={signupRequest}
                  type="button"
                  className="text-white w-full bg-[#050708] text-center hover:bg-[#050708]/90  focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30  mt-4 h-10"
                >
                  {isLoading? (
                    <div className="flex justify-center items-center gap-2 h-full">
                      <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-.3s]"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                  ) : (
                    "signup"
                  )}
                </button>
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};

export default Signup;
