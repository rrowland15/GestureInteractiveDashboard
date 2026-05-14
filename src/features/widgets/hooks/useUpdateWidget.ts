import { useMutation } from "@apollo/client/react"
import { useEffect, useRef } from "react"

import { UPDATE_WIDGET, DELETE_WIDGET, CREATE_WIDGET } from "../graphql/mutations"

import type { UpdateWidgetResponse, DeleteWidgetResponse, DeleteWidgetVariables, CreateWidgetResponse, CreateWidgetVariables } from "../types/widget.types"


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
                optimisticResponse: {
                    updateWidget: {
                        __typename: "Widget",
                        id,
                        title,
                        description,
                    },
                },
            })
        }, 500)
    }

    return { saveWidget }
}