import { useState } from "react"
import type {
    Widget,
} from "../../../generated/graphql"

import { useDeleteWidget, useUpdateWidget } from "../../../features/widgets"

type Props = {
    w: Widget
}

export function WidgetRow({ w }: Props) {

    const [title, setTitle] = useState(w.title)
    const [description, setDescription] = useState(w.description ?? "")
    const { saveWidget } = useUpdateWidget()
    const { deleteWidget } = useDeleteWidget()


    return (
        <div style={{ marginBottom: 12 }}>
            <input
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                    saveWidget({
                        id: Number(w.id),
                        title: e.target.value,
                        description: description,
                    })
                }}
            />

            <input
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
                    saveWidget({
                        id: Number(w.id),
                        title: title,
                        description: e.target.value,
                    })
                }}
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