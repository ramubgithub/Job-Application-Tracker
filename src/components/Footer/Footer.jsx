import React from 'react'

function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
  <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
    <span>
      <span className="font-medium text-gray-700">ApplyLog</span> · Track applications with clarity
    </span>

    <span>
      Data stored locally on this device
    </span>

    <span>
      © {new Date().getFullYear()} Ayush Sahu
    </span>
  </div>
</footer>
  )
}

export default Footer