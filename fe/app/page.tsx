"use client";

import { useEffect, useState } from 'react'
import { Layout } from './components/layout';
import { NotesTable } from './components/notesTable';
import { NotesHeader } from './components/notesHeader';
import { AddEditNoteModal } from './components/addEditNoteModal';

interface NoteData {
  _id: string;
  companyName: string;
  notes: string;
}

interface DraftNoteData {
  companyName: string;
  notes: string;
}

const Dashboard = () => {
  const [notesData, setNotesData] = useState<NoteData[]>();
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [draftNote, setDraftNote] = useState<DraftNoteData>({
    companyName: '',
    notes: '',
  });

  const revalidatedData = async () => {
    const result = await fetch(`http://127.0.01:3000/data`, {
        method: 'GET',
        // mode: 'no-cors',
    });

    const jsonResult = await result.json();
    setNotesData(jsonResult);
  }

  useEffect(() => {
    revalidatedData()
  }, [])

  return (
    <Layout>
      <div className="px-4 py-4 sm:px-6 lg:px-8 bg-slate-50 rounded-md">
        <NotesHeader setAddNoteOpen={setAddNoteOpen} />
        <NotesTable notesData={notesData} />
      </div>
      <AddEditNoteModal
        addNoteOpen={addNoteOpen}
        setAddNoteOpen={setAddNoteOpen}
        draftNote={draftNote}
        setDraftNote={setDraftNote}
        revalidatedData={revalidatedData}
        mode={'create'}
      />
    </Layout>
  )
}

export default Dashboard;
