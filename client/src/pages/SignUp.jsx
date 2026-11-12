import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { auth, googleProvider } from "../firebase.js";
import { login } from "../api/login";
import { setUserData } from "../redux/userSlice.js";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { FaPlus } from "react-icons/fa6";
import {getProjects, getStarredProjects} from "../api/project.js"
import { setProjects, setStarredProjects } from "../redux/projectSlice.js";
import { useEffect } from "react";
import { FiLoader } from "react-icons/fi";

function LoginCard({ onLogin, loading, error }) {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-4 transition-colors duration-300 dark:bg-[#07070c]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 hidden h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.05] blur-[120px] dark:block"
      />

      <div className="relative w-full max-w-sm rounded-2xl border border-slate-200/70 bg-white/80 p-8 text-center shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03] dark:shadow-black/40">
        <div className="mx-auto mb-5 h-16 w-16">
          <img
            src="/favicon.svg"
            alt="Marde AI"
            className="block h-full w-full rounded-2xl object-contain shadow-lg shadow-black/30 ring-1 ring-white/10"
          />
        </div>

        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Welcome to Marde AI
        </h2>
        <p className="mb-6 text-[0.9375rem] text-slate-600 dark:text-slate-400">
          Sign in to your account to continue
        </p>

        <button
          type="button"
          onClick={onLogin}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white py-2.5 text-[13.5px] font-medium text-slate-800 shadow-sm transition-colors duration-150 hover:bg-slate-50 disabled:opacity-75 dark:border-transparent dark:bg-white dark:hover:bg-slate-100"
        >
          <FcGoogle />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-500">
            {error}
          </p>
        )}

        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          By signing in, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

function SignUp({ isAuthLoading }) {
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);

  const [error, setError] = useState("");
  const [activeSession, setActiveSession] = useState("projects");

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { projects = [], starredProjects = [] } = useSelector((state) => state.project);
  const visibleProjects = activeSession === "projects" ? projects : starredProjects;

  

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const data = await login(token);
      dispatch(setUserData(data));
    } catch (err) {
      // user ne popup khud band kiya toh error mat dikhao
      if (err?.code !== "auth/popup-closed-by-user") {
        console.error("Login failed:", err);
        setError("Sign in nahi ho paya. Dobara try karo.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData) {
      return
    }
    const fetchProjects = async () => {
      setLoadingProjects(true)
      const data = activeSession === "projects"
        ? await getProjects()
        : await getStarredProjects()
      if (activeSession === "projects") {
        dispatch(setProjects(Array.isArray(data) ? data : []))
      } else {
        dispatch(setStarredProjects(Array.isArray(data) ? data : []))
      }
      setLoadingProjects(false)
    }
    void fetchProjects()
  }, [activeSession, dispatch, userData])

  if (isAuthLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 text-sm text-slate-500 dark:bg-[#07070c] dark:text-slate-400">
        Loading...
      </div>
    );
  }

  if (!userData) {
    return <LoginCard onLogin={handleLogin} loading={loading} error={error} />;
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-[#07070c]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/3 h-[700px] w-[700px] rounded-full bg-indigo-500/[0.08] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-400/[0.06] blur-[130px]"
      />

      <Navbar />

      <div className="relative z-10 flex min-h-0 flex-1">
        <SideBar
          activeSession={activeSession}
          setActiveSession={setActiveSession}
        />

        {/* <main className="hide-scrollbar flex-1 overflow-y-auto p-6">
          {activeSession === "projects" ? (
            <></>
          ) : (
            <div>Starred yahan aayenge</div>
          )}
        </main>*/}

        <div className="min-h-0 flex-1 overflow-y-auto px-8 py-8 [scrollbar-width:thin] [scrollbar-color:rgba(100,116,139,0.35)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 dark:hover:[&::-webkit-scrollbar-thumb]:bg-white/20">

          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="flex items-center gap-2 text-[26px] font-bold text-slate-900 dark:text-white">
                Welcome Back, {""}
                {userData?.name?.split(" ")[0]}
              </h1>

              <p className="mt-1 text-[13.5px] text-slate-500 dark:text-slate-400">
                Ready to build something amazing today?
              </p>
            </div>
            <button className="flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-sm transition-opacity duration-150 hover:opacity-90 dark:bg-white dark:text-slate-900">
              <FaPlus
              size={16}
              />
              New Project
            </button>

          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[16px] font-semibold text-slate-900 dark:text-white">
              {activeSession=="starred"?"Starred Projects":"Recent Projects"}
            </h2>
          </div>
          {loadingProjects ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <FiLoader />
              
            </div>
          ) : visibleProjects.length === 0 ? (
              <div className="mb-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/40 py-16 text-center dark:border-white/[0.1] dark:bg-white/[0.01]">

              </div>
          ): <></>
            
          }
            
        </div>
        

         
      </div>
    </div>
  );
}

export default SignUp;