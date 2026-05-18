import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Widget } from "../../../generated/graphql"
import { useState, useEffect } from "react"
import "../../../App.css"


type Props = {
    widget: Widget
    onDelete: (id: string) => void
    onUpdate: (args: any) => void
}

export function SortableWidgetRow({ widget, onDelete, onUpdate }: Props) {

    const [title, setTitle] = useState(widget.title)
    const [description, setDescription] = useState(widget.description ?? "")

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: widget.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "8px",
    }

    return (
        <div ref={setNodeRef} className="widgetRow" style={style} {...attributes}>
            { }
            <button {...listeners} className="dragHandle" style={{ cursor: "grab", marginRight: 8 }}>
                ☰
            </button>
            <input
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value)
                    onUpdate({
                        id: Number(widget.id),
                        title: e.target.value,
                        description: description,
                    })
                }}
            />

            <input
                value={description}
                onChange={(e) => {
                    setDescription(e.target.value)
                    onUpdate({
                        id: Number(widget.id),
                        title: title,
                        description: e.target.value,
                    })
                }}
            />

            <button
                onClick={() =>
                    onDelete(widget.id)
                }
            >
                Delete
            </button>



        </div>
    )
}
