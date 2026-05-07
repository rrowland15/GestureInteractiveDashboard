import { WidgetCard } from "./components/WidgetCard"
import { DashboardPage } from "./features/dashboard/DashboardPage"
import { gql } from "@apollo/client"
import { useQuery, useMutation } from "@apollo/client/react"
import { useState, useEffect } from "react"

type Widget = {
  id: number
  title: string
  description?: string
}

type GetWidgetsData = {
  widgets: Widget[]
}

type DeleteWidgetResponse = {
  deleteWidget: {
    id: number
  }
}

type DeleteWidgetVariables = {
  id: number
}

type CreateWidgetVariables = {
  title: string
  description?: string
}

type CreateWidgetResponse = {
  createWidget: Widget
}

type UpdateWidgetResponse = {
  updateWidget: Widget
}




const GET_WIDGETS = gql`
  query {
    widgets {
      id
      title
      description
    }
  }
`

const CREATE_WIDGET = gql`
  mutation CreateWidget($title: String!, $description: String) {
    createWidget(title: $title, description: $description) {
      id
      title
      description
    }
  }
`

const DELETE_WIDGET = gql`
  mutation DeleteWidget($id: Int!) {
    deleteWidget(id: $id) {
      id
    }
  }
`

const UPDATE_WIDGET = gql`
  mutation UpdateWidget($id: Int!, $title: String, $description: String) {
    updateWidget(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`




function WidgetRow({
  w,
  updateWidget,
  deleteWidget,
}: {
  w: Widget
  updateWidget: any
  deleteWidget: any
}) {
  const [title, setTitle] = useState(w.title)
  const [description, setDescription] = useState(w.description ?? "")


  const saveWidget = () => {
    updateWidget({
      variables: {
        id: Number(w.id),
        title,
        description,
      },
    })
  }

  // Debounced autosave (per widget)
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveWidget()
    }, 500)

    return () => clearTimeout(timeout)
  }, [title, description])

  return (
    <div style={{ marginBottom: 12 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={() =>
          deleteWidget({
            variables: { id: Number(w.id), },
          })
        }
      >
        Delete
      </button>
    </div>
  )
}

/* ---------------- App ---------------- */

function App() {
  const { data, loading, error } =
    useQuery<GetWidgetsData>(GET_WIDGETS)

  const [createWidget] = useMutation<
    CreateWidgetResponse,
    CreateWidgetVariables
  >(CREATE_WIDGET)

  const [deleteWidget] = useMutation<
    DeleteWidgetResponse,
    DeleteWidgetVariables
  >(DELETE_WIDGET, {
    update(cache, { data }) {
      if (!data) return

      cache.modify({
        fields: {
          widgets(existingRefs = [], { readField }) {
            return existingRefs.filter(
              (ref: any) =>
                readField("id", ref) !== data.deleteWidget.id
            )
          },
        },
      })
    }
  })


  const [updateWidget] = useMutation<
    UpdateWidgetResponse
  >(UPDATE_WIDGET)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Widgets</h1>

      {/* CREATE */}
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          await createWidget({
            variables: { title, description },
            update(cache, { data }) {
              if (!data) return

              cache.modify({
                fields: {
                  widgets(existing = [], { toReference }) {
                    return [
                      ...existing,
                      toReference(data.createWidget),
                    ]
                  },
                },
              })
            },
          })

          setTitle("")
          setDescription("")
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <button type="submit">Create Widget</button>
      </form>

      {/* LIST */}
      {data?.widgets.map((w) => (
        <WidgetRow
          key={w.id}
          w={w}
          updateWidget={updateWidget}
          deleteWidget={deleteWidget}
        />
      ))}
    </div>
  )
}

export default App