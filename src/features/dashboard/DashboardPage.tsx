import { useWidgetQuery } from "./deprecated"
import { WidgetCard } from "../../components/WidgetCard"
import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { GET_WIDGETS } from "./GET_WIDGETS"

type Widget = {
    id: string
    title: string
    description?: string
}

type GetWidgetsData = {
    widgets: Widget[]
}

export function DashboardPage() {
    const { loading, error, data } = useQuery<GetWidgetsData>(GET_WIDGETS)

    if (loading) return <p>Loading dashboard...</p>
    if (error || !data) return <p>Failed to load dashboard</p>

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard</h1>

            {data.widgets.map((widget: any) => (
                <WidgetCard
                    key={widget.id}
                    title={widget.title}
                    description={widget.description}
                    status="success"
                />
            ))}
        </div>
    )
}