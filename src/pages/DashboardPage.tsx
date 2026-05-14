import { useQuery } from "@apollo/client/react"
import { WidgetCard, GET_WIDGETS } from "../features/widgets"
import type { GetWidgetsQueryVariables, GetWidgetsQuery } from "../generated/graphql"



export function DashboardPage() {
    const { loading, error, data } = useQuery<GetWidgetsQuery, GetWidgetsQueryVariables>(GET_WIDGETS)

    if (loading) return <p>Loading dashboard...</p>
    if (error || !data) return <p>Failed to load dashboard</p>

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard</h1>

            {data.widgets.map((widget) => (
                <WidgetCard
                    key={widget.id}
                    widget={widget}
                    status="success"
                />
            ))}
        </div>
    )
}