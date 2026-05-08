import { useMutation } from "@apollo/client/react"
import { useEffect, useRef } from "react"

import { UPDATE_WIDGET, DELETE_WIDGET, CREATE_WIDGET } from "./mutations"

import type { UpdateWidgetResponse, DeleteWidgetResponse, DeleteWidgetVariables, CreateWidgetResponse, CreateWidgetVariables } from "./types"

type Params = {
    id: number
    title: string
    description: string
}

export function useUpdateWidget() {
    const [updateWidget] =
        useMutation<UpdateWidgetResponse>(
            UPDATE_WIDGET
        )

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const saveWidget = ({ id, title, description }: Params) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            updateWidget({
                variables: {
                    id,
                    title,
                    description,
                },
            })
        }, 500)
    }

    return { saveWidget }
}

export function useDeleteWidget() {
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
    return { deleteWidget }
}

export function useCreateWidget() {
    const [mutate] = useMutation<
        CreateWidgetResponse,
        CreateWidgetVariables
    >(CREATE_WIDGET, {
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

    const createWidget = async (
        title: string,
        description: string
    ) => {
        return mutate({
            variables: {
                title,
                description,
            },
        })
    }

    return { createWidget }
}