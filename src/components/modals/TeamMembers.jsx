import React from "react";

export default function TeamMembers({
  isModalOpen,
  setIsModalOpen,
  onSelectMember,
  selectedMember,
  setSelectedMember
}) {
  const teamMembers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const closeModal = () => {
    setIsModalOpen(false);
    if (onSelectMember) onSelectMember(selectedMember);
  };

  const handleSelectMember = (member) => setSelectedMember(member);

  return (
    <>
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-members-title"
          className="fixed inset-0 z-50 flex items-center justify-center no-scrollbar"
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative w-full max-w-5xl max-h-full bg-white rounded-lg shadow-lg p-6">
            <h4 id="team-members-title" className="mb-4 text-center text-2xl font-semibold">
              Team Members
            </h4>
            <div className="overflow-x-auto p-2 space-x-4 flex no-scrollbar">
              {teamMembers.map((item) => (
                <div
                  key={item}
                  className="flex-none w-16 justify-center items-center cursor-pointer no-scrollbar"
                >
                  <label htmlFor={`horizontal-list-${item}`} className="flex flex-col items-center">
                    <input
                      type="radio"
                      name="horizontal-list"
                      id={`horizontal-list-${item}`}
                      checked={selectedMember === item}
                      onChange={() => handleSelectMember(item)}
                      className="hidden"
                    />
                    <div
                      className={`w-10 h-10 rounded-full border-2 border-gray-300 flex justify-center items-center mb-2 ${
                        selectedMember === item ? "bg-primary" : "bg-gray-100"
                      }`}
                    >
                      <span
                        className={`text-xl text-white ${
                          selectedMember === item ? "font-bold" : ""
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{`${item}`}</p>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center p-4 border-t border-gray-200 rounded-b">
              <button
                onClick={closeModal}
                type="button"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-darkTheme"
              >
                Choose
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
