import { useMutation } from "@apollo/client/react"
import { useEffect, useRef } from "react"

import { UPDATE_WIDGET, } from "./mutations"

import type { UpdateWidgetResponse, } from "./types"

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

