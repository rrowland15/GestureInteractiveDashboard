import { useMutation } from "@apollo/client/react"

import { DELETE_WIDGET } from "../graphql/mutations"

// import type { DeleteWidgetResponse, DeleteWidgetVariables} from "../types/widget.types"
import type { DeleteWidgetMutationVariables, DeleteWidgetMutation } from "../../../generated/graphql"

export function useDeleteWidget() {
    const [deleteWidget] = useMutation<
        DeleteWidgetMutation,
        DeleteWidgetMutationVariables
    >(DELETE_WIDGET, {
        optimisticResponse: (vars) => ({
            deleteWidget: {
                __typename: "Widget",
                id: vars.id.toString()
            },
        }),

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