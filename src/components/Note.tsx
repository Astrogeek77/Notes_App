import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useNote } from "../Layouts/NoteLayout"
import ReactMarkdown from "react-markdown"

import './Note.module.css'

type NoteProps = {
  onDelete: (id: string) => void
}

export function Note({ onDelete }: NoteProps) {
  const note = useNote()
  const navigate = useNavigate()

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1 className="mb-4">{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={2} direction="horizontal" className="flex-wrap">
              {note.tags.map(tag => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(note.id)
                navigate("/")
              }}
              variant="danger"
            >
              Delete
            </Button>
            <Link to="/">
              <Button variant="secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <div >
        <ReactMarkdown className="mt-4 markdown">
          {note.markdown}
        </ReactMarkdown>
      </div>
    </>
  )
}
