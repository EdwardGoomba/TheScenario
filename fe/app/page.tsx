"use client";

import { useEffect, useState } from 'react'
import { Layout } from './components/layout';
import { NotesTable } from './components/notesTable';

const Dashboard = () => {
  const [notesData, setNotesData] = useState<Response>();

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
