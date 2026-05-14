
import { useState } from "react"
import { useCreateWidget } from "../../../features/widgets"

export function WidgetForm() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const { createWidget } = useCreateWidget()

    return (

        <form
            onSubmit={async (e) => {
                e.preventDefault()
                await createWidget(title, description)
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