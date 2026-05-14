import { useQuery } from "@apollo/client/react"
import { WidgetForm } from "./features/widgets/components/WidgetForm"
import { WidgetRow } from "./features/widgets/components/WidgetRow"

import { GET_WIDGETS } from "./features/widgets/graphql/queries"
// import type { GetWidgetsData, } from "./features/widgets/types/widget.types"
import type { GetWidgetsQuery, GetWidgetsQueryVariables } from "./generated/graphql"

/* ---------------- App ---------------- */

function App() {
  const { data, loading, error } =
    useQuery<GetWidgetsQuery, GetWidgetsQueryVariables>(GET_WIDGETS)

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