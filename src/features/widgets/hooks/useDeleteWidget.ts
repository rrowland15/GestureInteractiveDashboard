import { useMutation } from "@apollo/client/react"
import { useEffect, useRef } from "react"

import { UPDATE_WIDGET, DELETE_WIDGET, CREATE_WIDGET } from "../graphql/mutations"

import type { UpdateWidgetResponse, DeleteWidgetResponse, DeleteWidgetVariables, CreateWidgetResponse, CreateWidgetVariables } from "../types/widget.types"


export function useDeleteWidget() {
    const [deleteWidget] = useMutation<
        DeleteWidgetResponse,
        DeleteWidgetVariables
    >(DELETE_WIDGET, {
        optimisticResponse: (vars) => ({
            deleteWidget: {
                __typename: "Widget",
                id: vars.id,
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