export function NotesHeader({
  setAddNoteOpen,
}: {
  setAddNoteOpen: (value: boolean) => void;
}) {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-gray-900">Notes</h1>
        <p className="mt-2 text-sm text-gray-700">
          A list of all the notes in your account.
        </p>
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setAddNoteOpen(true)}
        >
          Add note
        </button>
      </div>
    </div>
  )
}
