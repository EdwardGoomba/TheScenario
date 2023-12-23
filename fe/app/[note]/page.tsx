"use client";

import { useState, useEffect } from 'react'
import { Layout } from '../components/layout'
import DeleteNoteModal from '../components/deleteNoteModal';
import AddNoteModal from '../components/addNoteModal';

interface NoteData {
  _id: string;
  companyName: string;
  notes: string;
}

export default function NoteDetails({ params }: { params: { note: string } }) {
  const [noteData, setNoteData] = useState<NoteData>();
  const [deleteNoteOpen, setDeleteNoteOpen] = useState(false);
  const [editNoteOpen, setEditNoteOpen] = useState(false);
  const { note } = params;

  const revalidatedData = async () => {
    const result = await fetch(`http://127.0.01:3000/data/${note}`, {
        method: 'GET',
        // mode: 'no-cors',
    });

    const jsonResult = await result.json();
    setNoteData(jsonResult);
  }

  useEffect(() => {
    revalidatedData()
  }, [])

  const { companyName, notes } = noteData || {};

  return (
    <Layout>
      <div className="px-4 py-4 sm:px-6 lg:px-8 bg-slate-50 rounded-md">
        {noteData ? (
          <>
            <div className="md:flex md:items-center md:justify-between ">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  {companyName}
                </h2>
              </div>
              <div className="mt-4 flex md:ml-4 md:mt-0">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={() => setEditNoteOpen(true)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="ml-3 inline-flex items-center rounded-md border-2 border-red-600 px-3 py-2 text-sm font-semibold text-red-600 hover:text-white shadow-sm hover:bg-red-600"
                  onClick={() => setDeleteNoteOpen(true)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-6">
              <p>{notes}</p>
            </div>
          </>
        ) : <p>Loading...</p>}
        <DeleteNoteModal
          deleteNoteOpen={deleteNoteOpen}
          setDeleteNoteOpen={setDeleteNoteOpen}
          noteId={note}
        />
        {noteData && (
          <AddNoteModal
            addNoteOpen={editNoteOpen}
            setAddNoteOpen={setEditNoteOpen}
            draftNote={noteData}
            setDraftNote={setNoteData}
            revalidatedData={revalidatedData}
            mode={'edit'}
          />
        )}
      </div>
    </Layout>
  )
}
