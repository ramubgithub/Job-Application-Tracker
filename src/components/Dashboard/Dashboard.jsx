import React, { useContext, useState } from "react";
import JobContext from "../../Context/JobContext";
import authContext from "../../Context/AuthContext";
import { BriefcaseIcon, PencilIcon, TrashIcon  } from "@heroicons/react/24/outline";
import EditModals from "../EditModals/EditModals";
import useCompanyLogo from "../../LogoCustomHook/LogoCustomHook.js";
import { ToastContext } from "../../Context/ToastProvider.jsx";

{
  //Logo for Company
}
function JobLogo({ job }) {
  const logo = useCompanyLogo(job?.company);
  const [error, setError] = useState(false);

  if (!job?.company) {
    return <BriefcaseIcon className="w-4 h-4 text-gray-400" />;
  }

  return (
    <img
      src={logo}
      alt={job.company}
      className="w-8 h-8 object-contain rounded"
      onError={() => setError(true)}
      style={{ display: error ? "none" : "block" }}
    />
  );
}

function Dashboard() {
  const [activeStatus, setActiveStatus] = useState("ALL");
  const [editingJob, setEditingJob] = useState(null);
  const [isEditing, isEditingOpen] = useState(false);
  const [activeSort, setActiveSort] = useState(null);
  const [resetActive, setResetActive] = useState(false);
  const { Jobs = [], setJobs } = useContext(JobContext);
  const { user } = useContext(authContext);
  const { showToasts } = useContext(ToastContext);
  const sortBtnBase = "px-4 py-1.5 rounded-full text-sm font-medium transition-colors border";
  const sortBtnActive = "bg-gray-900 text-white border-gray-900";
  const sortBtnInactive = "bg-white text-gray-700 border-gray-300 hover:bg-gray-50";

  if (!Array.isArray(Jobs)) return null;

  const sortOldest = () => {
    setActiveSort("oldest");
    setJobs((prev) =>
      [...prev].sort(
        (a, b) => new Date(a.appliedAt) - new Date(b.appliedAt)
      )
    );
  };

  const resetSort = () => {
    setActiveSort(null);
    setResetActive(true);
    const stored = localStorage.getItem(`jobs_${user.username}`);
    if (!stored) return;
    setJobs(JSON.parse(stored));

    setTimeout(() => {
      setResetActive(false);
    }, 1000);
  };

  const visibleJobs =
    activeStatus === "ALL"
      ? Jobs
      : Jobs.filter((job) => job.status === activeStatus);

  const deleteJob = (id) => {
    setJobs((prev) => {
      const updatedJobs = prev.filter((job) => job.id !== id);
      localStorage.setItem(
        `jobs_${user.username}`,
        JSON.stringify(updatedJobs)
      );
      return updatedJobs;
    });
    showToasts("Application removed.");
  };

  const handleSaveEdit = (updatedJob) => {
    setJobs((prev) => {
      const updatedJobs = prev.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      );
      localStorage.setItem(
        `jobs_${user.username}`,
        JSON.stringify(updatedJobs)
      );
      return updatedJobs;
    });
  };

  return (
    <div className="w-full flex flex-col gap-8 py-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Track and manage your job applications in one place.
        </p>
      </div>

      {
        // Stats of Application ⬇️
      }

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <div>
          <button
            onClick={(e) => setActiveStatus("ALL")}
            className="w-full text-left p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
          >
            <span className="block text-xs font-medium text-gray-600 mb-1">
              Total
            </span>
            <span className="block text-2xl font-semibold text-gray-900">
              {Jobs.length}
            </span>
          </button>
        </div>

        <div>
          <button
            onClick={(e) => setActiveStatus("Applied")}
            className="w-full text-left p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
          >
            <span className="block text-xs font-medium text-gray-600 mb-1">
              Pending
            </span>
            <span className="block text-2xl font-semibold text-blue-600">
              {Jobs.filter((job) => job.status === "Applied").length}
            </span>
          </button>
        </div>

        <div>
          <button
            onClick={(e) => setActiveStatus("Interview")}
            className="w-full text-left p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
          >
            <span className="block text-xs font-medium text-gray-600 mb-1">
              Interview
            </span>
            <span className="block text-2xl font-semibold text-amber-600">
              {Jobs.filter((job) => job.status === "Interview").length}
            </span>
          </button>
        </div>

        <div>
          <button
            onClick={(e) => setActiveStatus("Offer")}
            className="w-full text-left p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
          >
            <span className="block text-xs font-medium text-gray-600 mb-1">
              Offer
            </span>
            <span className="block text-2xl font-semibold text-green-600">
              {Jobs.filter((job) => job.status === "Offer").length}
            </span>
          </button>
        </div>

        <div>
          <button
            onClick={(e) => setActiveStatus("Rejected")}
            className="w-full text-left p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
          >
            <span className="block text-xs font-medium text-gray-600 mb-1">
              Rejected
            </span>
            <span className="block text-2xl font-semibold text-red-600">
              {Jobs.filter((job) => job.status === "Rejected").length}
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-500">Sort</span>
        <button
          onClick={sortOldest}
          className={`${sortBtnBase} ${
            activeSort === "oldest" ? sortBtnActive : sortBtnInactive
          }`}
        >
          Oldest
        </button>

        <button
          onClick={resetSort}
          className={`${sortBtnBase} ${
            resetActive ? sortBtnActive : sortBtnInactive
          }`}
        >
          Reset
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {
          // Empty state text in list
        }
        {visibleJobs.length === 0 && (
          <div className="text-gray-500 border border-gray-200 rounded-lg p-12 text-center bg-white">
            <BriefcaseIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            No job applications found.
          </div>
        )}

        {
          // Map on job list object, rendering each field of job and each job
        }
        {visibleJobs.map((job) => (
          <div
            key={job.id}
            className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 flex flex-col gap-4">
                <p className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 min-w-[80px]">
                    Date:
                  </span>
                  <span className="text-gray-900 text-sm">
                    {job.appliedDate}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 min-w-[80px]">
                    Company:
                  </span>
                  <JobLogo job={job} />
                  <span className="text-gray-900 font-semibold text-base">
                    {job.company}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 min-w-[80px]">
                    Role:
                  </span>
                  <span className="text-gray-900 font-medium text-base">
                    {job.role}
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 min-w-[80px]">
                    Status:
                  </span>
                  <span
                    className={`px-3 py-1 rounded-md text-sm font-medium inline-block w-fit border ${
                      job.status === "Applied"
                        ? "bg-blue-50 text-blue-600 border-blue-200"
                        : job.status === "Interview"
                        ? "bg-amber-50 text-amber-600 border-amber-200"
                        : job.status === "Offer"
                        ? "bg-green-50 text-green-600 border-green-200"
                        : "bg-red-50 text-red-600 border-red-200"
                    }`}
                  >
                    {job.status}
                  </span>
                </p>
                <p className="flex gap-3 pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-600 min-w-[80px]">
                    Note:
                  </span>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    {job.note}
                  </span>
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingJob(job);
                  isEditingOpen(true);
                }}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors"
              >
                <PencilIcon className="w-4 h-4" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => deleteJob(job.id)}
                className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors"
              >
                <TrashIcon className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {isEditing && editingJob && (
        <EditModals
          job={editingJob}
          onSave={handleSaveEdit}
          onClose={() => {
            setEditingJob(null);
            isEditingOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;
