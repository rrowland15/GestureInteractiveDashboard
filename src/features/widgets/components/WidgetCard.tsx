import type { WidgetStatus } from "../../../features/widgets/types/widget.types"

import type { WidgetFieldsFragment } from "../../../generated/graphql"

type Props = {
    widget: WidgetFieldsFragment
    status?: WidgetStatus
    onClick?: () => void
}

function renderStatus(status: WidgetStatus) {
    switch (status) {
        case "loading":
            return <p style={{ color: "gray" }}>Loading...</p>

        case "error":
            return <p style={{ color: "red" }}>Something went wrong</p>

        case "success":
            return <p style={{ color: "green" }}>Loaded</p>

        default:
            return null
    }
}

export function WidgetCard({
    widget,
    status = "idle",
    onClick,
}: Props) {
    return (
        <div
            onClick={onClick}
            style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "12px",
                cursor: onClick ? "pointer" : "default",
                transition: "all 0.2s ease",
            }}
        >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0 }}>{widget.title}</h3>
                {renderStatus(status)}
            </div>

            {/* Body */}
            <div style={{ marginTop: "8px" }}>
                {widget.description ? (
                    <p style={{ margin: 0, color: "#555" }}>{widget.description}</p>
                ) : (
                    <p style={{ margin: 0, color: "#aaa" }}>No description</p>
                )}
            </div>


        </div>
    )
}
