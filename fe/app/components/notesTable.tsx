// either move this into a frontend types folder or create a shareable frontend / backend type system
interface NoteData {
  _id: string;
  companyName: string;
  notes: string;
}

interface NotesTableProps {
  notesData: NoteData[] | undefined;
}

// truncate the notes to 60 characters
function truncateNotes(notes: string) {
  return notes.length > 60 ? notes.substring(0, 60) + '...' : notes;
}

export function NotesTable({ notesData }: NotesTableProps) {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          {(notesData && notesData.length === 0) && (
            <div className="flex items-center">
              <p className="text-sm text-gray-700">No notes found.</p>
              </div>
          )}
          {!notesData && (
            <div className="flex items-center">
              <p className="text-sm text-gray-700">Loading...</p>
              </div>
          )}
          {(notesData && notesData.length > 0) && (
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Company Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Note Summary
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
                <tbody className="divide-y divide-gray-200">
                  {notesData.map((note) => (
                    <tr key={note._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {note.companyName}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0">
                        {truncateNotes(note.notes)}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href={note._id} className="text-indigo-600 hover:text-indigo-900">
                          View details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
