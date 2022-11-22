import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from "../App"

type NoteLayoutProps = {
  notes: Note[]
}

export function NoteLayout({ notes }: NoteLayoutProps) {
  // get id from params
  const { id } = useParams()

  // find the requested note
  const note = notes.find(n => n.id === id)

  // if no such note exist navigate home
  if (note == null) return <Navigate to="/" replace />

  // context for parent components
  return <Outlet context={note} />
}

export function useNote() {
  return useOutletContext<Note>()
}
