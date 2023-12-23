import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Formik } from 'formik';

export function AddEditNoteModal({
  addNoteOpen,
  setAddNoteOpen,
  draftNote,
  setDraftNote,
  revalidatedData,
  mode,
}: {
  addNoteOpen: boolean;
  setAddNoteOpen: (open: boolean) => void;
  draftNote: any;
  setDraftNote: (draftNote: any) => void;
  revalidatedData: () => void;
  mode: 'create' | 'edit';
}) {
  const cancelButtonRef = useRef(null)

  const cancelAddingNote = () => {
    setAddNoteOpen(false);
    if (mode === 'create') {
      setDraftNote({
        _id: '',
        companyName: '',
        notes: '',
      });
    }
  }

  const addNoteDisabled = (draftNote.companyName === '' || draftNote.notes === '');

  return (
    <Transition.Root show={addNoteOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setAddNoteOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div>
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Add a new note
                    </Dialog.Title>
                    <Formik
                      initialValues={draftNote}
                      onSubmit={async () => {
                        console.log('Submitting: ', draftNote);

                        const url = mode === 'create' ? `http://127.0.01:3000/data/create` : `http://127.0.01:3000/data/update/${draftNote._id}`;
                        const method = mode === 'create' ? 'POST' : 'PATCH';

                        const result = await fetch(url, {
                          method: method,
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(draftNote),
                        });

                        if (result.ok) {
                          console.log('Successfully added / edited note.');
                          await revalidatedData();
                          setAddNoteOpen(false);
                        }
                      }
                    }>
                      {({
                        handleSubmit,
                        isSubmitting
                      }) => (
                        <form className="mt-2" onSubmit={handleSubmit}>
                          <div className="mt-7">
                            <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                              Company Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="companyName"
                                id="companyName"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                onChange={(e) => setDraftNote({
                                  ...draftNote,
                                  companyName: e.target.value,
                                })}
                                value={draftNote.companyName}
                              />
                            </div>
                          </div>
                          <div className="mt-7">
                            <label htmlFor="notes" className="block text-sm font-medium leading-6 text-gray-900">
                              Notes
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="notes"
                                name="notes"
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                onChange={(e) => setDraftNote({
                                  ...draftNote,
                                  notes: e.target.value,
                                })}
                                value={draftNote.notes}
                              />
                            </div>
                          </div>
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="submit"
                            disabled={addNoteDisabled || isSubmitting}
                            className={`inline-flex w-full justify-center rounded-md ${(addNoteDisabled || isSubmitting) ? `bg-indigo-300`: `bg-indigo-600 hover:bg-indigo-500`} px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2 hover:cursor-pointer`}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={cancelAddingNote}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                        </div>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
