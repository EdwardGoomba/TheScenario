"use client";

import { useEffect, useState } from 'react'
import { Layout } from './components/layout';
import { NotesTable } from './components/notesTable';

interface NoteData {
  _id: string;
  companyName: string;
  notes: string;
}

const Dashboard = () => {
  const [notesData, setNotesData] = useState<NoteData[]>();

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
      <NotesTable notesData={notesData} />
    </Layout>
  )
}

export default Dashboard;
