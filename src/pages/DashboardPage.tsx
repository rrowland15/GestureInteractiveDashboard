import { useQuery } from "@apollo/client/react"
import { WidgetCard, GET_WIDGETS } from "../features/widgets"
import type { GetWidgetsQueryVariables, GetWidgetsQuery, UpdateWidgetMutationVariables, Widget } from "../generated/graphql"
import { useState, useEffect, useRef } from "react"
import { useDeleteWidget, useUpdateWidget, useReorderWidgets, useCreateWidget } from "../features/widgets"
import {
    DndContext,
    closestCenter,
} from "@dnd-kit/core"

import {
    SortableContext,
    arrayMove,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { SortableWidgetRow } from "../features/widgets/components/SortableWidgetRow"
import { WidgetForm } from "../features/widgets/components/WidgetForm"


export function DashboardPage() {

    const { loading, error, data } = useQuery<GetWidgetsQuery, GetWidgetsQueryVariables>(GET_WIDGETS)

    // const [items, setItems] = useState(data?.widgets ?? [])
    const { saveWidget } = useUpdateWidget()
    const { deleteWidget } = useDeleteWidget()
    const { reorderWidgets } = useReorderWidgets()
    const { createWidget } = useCreateWidget()
    // const isDraggingRef = useRef(false)

    const handleDelete = (id: string) => {
        deleteWidget({
            variables: { id: Number(id) },
        })

        setItems(items =>
            items.filter(item => item.id !== id)
        )
    }

    const [items, setItems] = useState<Widget[]>([])

    const handleCreate = async (
        title: string,
        description: string
    ) => {

        const result = await createWidget({
            title,
            description,
        })

        const newWidget = result.data?.createWidget

        if (newWidget) {
            setItems(items => [
                ...items,
                newWidget
            ])
        }
    }

    const handleUpdate = (
        updatedWidget: UpdateWidgetMutationVariables
    ) => {
        saveWidget(updatedWidget)

        setItems((items) =>
            items.map((item) =>
                item.id === String(updatedWidget.id)
                    ? {
                        ...item,
                        title: updatedWidget.title ?? item.title,
                        description:
                            updatedWidget.description ?? item.description,
                    }
                    : item
            )
        )
    }

    useEffect(() => {
        if (data?.widgets) {
            setItems((prev) => {
                // only initialize once or when empty
                if (prev.length === 0) return data.widgets
                return prev
            })
        }
    }, [data?.widgets])


    function handleDragEnd(event: any) {
        // isDraggingRef.current = false
        const { active, over } = event

        if (!over || active.id === over.id) return

        setItems((items) => {
            const oldIndex = items.findIndex(i => i.id === active.id)
            const newIndex = items.findIndex(i => i.id === over.id)

            const newItems = arrayMove(items, oldIndex, newIndex)

            reorderWidgets({
                variables: {
                    ids: newItems.map(i => i.id),
                },
            })

            return newItems
        })
    }

    if (loading) return <p>Loading dashboard...</p>
    if (error || !data) return <p>Failed to load dashboard</p>


    return (


        <div style={{ padding: "20px" }}>
            <h1>Dashboard</h1>


            <WidgetForm onCreate={handleCreate}></WidgetForm>

            <DndContext
                collisionDetection={closestCenter}
                // onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items.map(i => i.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map((widget) => (
                        <SortableWidgetRow
                            key={widget.id}
                            widget={widget}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    ))}
                </SortableContext>
            </DndContext>


        </div >


    )
}