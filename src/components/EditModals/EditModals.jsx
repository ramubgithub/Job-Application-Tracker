import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
import { ToastContext } from "../../Context/ToastProvider";

function EditModals({ job, onClose, onSave }) {

  const [editForm, setEditForm] = useState({
    company: job.company,
    role: job.role,
    status: job.status,
    note: job.note,
  });
    const { showToasts } = useContext(ToastContext)

  const handleEdits = (e) => {
    e.preventDefault()
    const updatedJob = {
        ...job,
        ...editForm,
    }
    onSave(updatedJob)
    onClose()
    showToasts("Changes saved successfully.")
  }
  return createPortal(
    <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    onClick={onClose}
  >
      <form
        onSubmit={handleEdits}
        onClick={(e) => e.stopPropagation()}
        className="max-w-lg w-full mx-auto mt-8 p-8 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="companyName"
            className="text-sm font-medium text-gray-700"
          >
            Company
          </label>
          <input
            type="text"
            id="companyName"
            value={editForm.company}
            onChange={(e) =>
              setEditForm({ ...editForm, company: e.target.value })
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
            value={editForm.role}
            onChange={(e) =>
              setEditForm({ ...editForm, role: e.target.value })
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
            value={editForm.status}
            onChange={(e) =>
              setEditForm({ ...editForm, status: e.target.value })
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
            value={editForm.note}
            onChange={(e) =>
              setEditForm({ ...editForm, note: e.target.value })
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
          Set Changes
        </button>
      </form>
    </div>,
    document.body
  );
}

export default EditModals;
