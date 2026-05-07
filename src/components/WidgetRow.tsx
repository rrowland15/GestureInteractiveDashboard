import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client/react"

import {
    UPDATE_WIDGET, DELETE_WIDGET,
} from "../features/widgets/mutations"

import type {
    Widget,
    UpdateWidgetResponse,
    DeleteWidgetResponse,
    DeleteWidgetVariables,
} from "../features/widgets/types"

type Props = {
    w: Widget
}

export function WidgetRow({ w }: Props) {

    const [title, setTitle] = useState(w.title)
    const [description, setDescription] = useState(w.description ?? "")

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

    /* ---------------- UPDATE ---------------- */

    const [updateWidget] = useMutation<
        UpdateWidgetResponse
    >(UPDATE_WIDGET)


    /* ---------------- AUTOSAVE ---------------- */
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