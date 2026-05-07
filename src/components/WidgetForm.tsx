import { useMutation } from "@apollo/client/react"
import { useState } from "react"

import {
    CREATE_WIDGET,
} from "../features/widgets/mutations"

import type {
    CreateWidgetResponse,
    CreateWidgetVariables,
} from "../features/widgets/types"

export function WidgetForm() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [createWidget] = useMutation<
        CreateWidgetResponse,
        CreateWidgetVariables
    >(CREATE_WIDGET)


    return (

        <form
            onSubmit={async (e) => {
                e.preventDefault()

                await createWidget({
                    variables: { title, description },
                    update(cache, { data }) {
                        if (!data) return

                        cache.modify({
                            fields: {
                                widgets(existing = [], { toReference }) {
                                    return [
                                        ...existing,
                                        toReference(data.createWidget),
                                    ]
                                },
                            },
                        })
                    },
                })

                setTitle("")
                setDescription("")
            }}
        >
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />

            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />

            <button type="submit">Create Widget</button>
        </form>
    )
}