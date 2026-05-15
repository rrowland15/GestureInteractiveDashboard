// export type Widget = {
//     __typename?: "Widget"
//     id: number
//     title: string
//     description?: string
// }

// export type GetWidgetsData = {
//     widgets: Widget[]
// }

// export type DeleteWidgetResponse = {
//     deleteWidget: {
//         id: number
//     }
// }

// export type DeleteWidgetVariables = {
//     id: number
// }

// export type CreateWidgetVariables = {
//     title: string
//     description?: string
// }

// export type CreateWidgetResponse = {
//     createWidget: Widget
// }

// export type UpdateWidgetResponse = {
//     updateWidget: Widget
// }

export type WidgetStatus = "idle" | "loading" | "error" | "success"

// export type WidgetCardProps = {
//     title: string
//     description?: string
//     status?: WidgetStatus
//     onClick?: () => void
// 
