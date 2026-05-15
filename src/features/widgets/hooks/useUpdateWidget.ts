import { useMutation } from "@apollo/client/react"
import { useRef } from "react"

import { UPDATE_WIDGET } from "../graphql/mutations"

// import type { UpdateWidgetResponse} from "../types/widget.types"
import type { UpdateWidgetMutationVariables, UpdateWidgetMutation } from "../../../generated/graphql"


export function useUpdateWidget() {
    const [updateWidget] =
        useMutation<UpdateWidgetMutation, UpdateWidgetMutationVariables>(
            UPDATE_WIDGET
        )

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const saveWidget = ({ id, title, description, order }: UpdateWidgetMutationVariables) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            updateWidget({
                variables: {
                    id,
                    title,
                    description,
                    order
                },
                optimisticResponse: {
                    updateWidget: {
                        id: id.toString(),
                        title: title ?? "",
                        description: description ?? "",
                        order: 0
                    },
                },
            })
        }, 500)
    }

    return { saveWidget }
}