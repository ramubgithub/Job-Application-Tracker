import React, { useState, useEffect, useContext } from "react";
import JobContext from "../../Context/JobContext";
import authContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../../Context/ToastProvider";

function AddJobs() {
  const [fetchJob, useFetchedJob] = useState({
    id: crypto.randomUUID(),
    company: "",
    role: "",
    status: "Applied",
    note: "",
    appliedDate: "",
    appliedAt: "",
  });

  const { setJobs } = useContext(JobContext);
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const { showToasts } = useContext(ToastContext)

  const handleJobs = (e) => {
    e.preventDefault();

    const newJob = {
      id: crypto.randomUUID(),
      company: fetchJob.company,
      role: fetchJob.role,
      status: fetchJob.status,
      note: fetchJob.note,
      appliedDate: new Date().toISOString().split("T")[0],
      appliedAt: Date.now()
    };
    setJobs((prev) => {
      const updatedJobs = [newJob, ...prev];
      localStorage.setItem(
        `jobs_${user.username}`,
        JSON.stringify(updatedJobs)
      );
      return updatedJobs;
    });

    useFetchedJob({
      company: "",
      role: "",
      status: "Applied",
      note: "",
      appliedDate: "",
    });
    showToasts("Job application saved.")
    navigate("/")
  };

  return (
    <>
      <form
        onSubmit={handleJobs}
        className="max-w-lg w-full mx-auto mt-8 p-8 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="companyName" className="text-sm font-medium text-gray-700">
            Company
          </label>
          <input
            type="text"
            id="companyName"
            value={fetchJob.company}
            onChange={(e) =>
              useFetchedJob({ ...fetchJob, company: e.target.value })
            }
            placeholder="Company name"
            required
            className="px-3 py-2 rounded-md bg-white text-gray-900 placeholder-gray-400 outline-none border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="text-sm font-medium text-gray-700">
            Role
          </label>
          <input
            type="text"
            id="role"
            list="roles"
            value={fetchJob.role}
            onChange={(e) =>
              useFetchedJob({ ...fetchJob, role: e.target.value })
            }
            placeholder="Job title"
            required
            className="px-3 py-2 rounded-md bg-white text-gray-900 placeholder-gray-400 outline-none border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />
          <datalist id="roles">
            <option value="SDE Intern" />
            <option value="Software Engineer Intern" />
            <option value="SDE-1" />
            <option value="Software Engineer I" />
            <option value="SDE-2" />
            <option value="Software Engineer II" />
            <option value="Senior Software Engineer" />
            <option value="Staff Software Engineer" />
            <option value="Backend Engineer" />
            <option value="Frontend Engineer" />
            <option value="Full Stack Engineer" />
            <option value="Consultant" />
            <option value="Associate Consultant" />
            <option value="Data Engineer" />
            <option value="Data Analyst" />
            <option value="DevOps Engineer" />
            <option value="Platform Engineer" />
            <option value="QA Engineer" />
            <option value="Automation Engineer" />
          </datalist>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={fetchJob.status}
            onChange={(e) =>
              useFetchedJob({ ...fetchJob, status: e.target.value })
            }
            className="px-3 py-2 rounded-md bg-white text-gray-900 outline-none border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="note" className="text-sm font-medium text-gray-700">
            Note
          </label>
          <textarea
            id="note"
            name="note"
            value={fetchJob.note}
            onChange={(e) =>
              useFetchedJob({ ...fetchJob, note: e.target.value })
            }
            placeholder="Add any notes (interview feedback, follow-up, etc.)"
            rows="4"
            className="px-3 py-2 rounded-md bg-white text-gray-900 placeholder-gray-400 outline-none border border-gray-300 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="mt-2 w-full py-2.5 rounded-md bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
        >
          Add Job
        </button>
      </form>
    </>
  );
}

export default AddJobs;