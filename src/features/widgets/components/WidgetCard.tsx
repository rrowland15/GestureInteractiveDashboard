import { WidgetStatus, WidgetCardProps } from "../../../features/widgets"

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

    title,
    description,
    status = "idle",
    onClick,
}: WidgetCardProps) {
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
                <h3 style={{ margin: 0 }}>{title}</h3>
                {renderStatus(status)}
            </div>

            {/* Body */}
            <div style={{ marginTop: "8px" }}>
                {description ? (
                    <p style={{ margin: 0, color: "#555" }}>{description}</p>
                ) : (
                    <p style={{ margin: 0, color: "#aaa" }}>No description</p>
                )}
            </div>


        </div>
    )
}
