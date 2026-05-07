export type WidgetStatus = "idle" | "loading" | "error" | "success"

export type WidgetCardProps = {
    title: string
    description?: string
    status?: WidgetStatus
    onClick?: () => void
}