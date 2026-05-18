
import { useState } from "react"
import { useCreateWidget } from "../../../features/widgets"

type Props = {
    onCreate: (
        title: string,
        description: string
    ) => Promise<void>
}
export function WidgetForm({ onCreate }: Props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const { createWidget } = useCreateWidget()

    const handleSubmit = async (
        e: React.SubmitEvent
    ) => {
        e.preventDefault()

        await onCreate(
            title,
            description
        )

        setTitle("")
        setDescription("")
    }

    return (

        <form className="widgetForm"
            onSubmit={handleSubmit}>

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