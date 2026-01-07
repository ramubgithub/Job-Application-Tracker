import React from 'react'

function Toast({ msg }) {
  return (
    <div className="fixed bottom-5 right-5 bg-black text-white px-6 py-3 rounded-lg shadow-lg border border-gray-800">
      {msg}
    </div>
  )
}

export default Toast