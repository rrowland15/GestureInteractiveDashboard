import { useQuery } from "@apollo/client/react"
import { WidgetForm } from "./components/WidgetForm"
import { WidgetRow } from "./components/WidgetRow"

import { GET_WIDGETS } from "./features/widgets/queries"
import type { GetWidgetsData, } from "./features/widgets/types"


/* ---------------- App ---------------- */

function App() {
  const { data, loading, error } =
    useQuery<GetWidgetsData>(GET_WIDGETS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Widgets</h1>

      <WidgetForm />

      {data?.widgets.map((w) => (
        <WidgetRow
          key={w.id}
          w={w}
        />
      ))}
    </div>
  )
}

export default App