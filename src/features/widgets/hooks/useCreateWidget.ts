import { useMutation } from "@apollo/client/react"
import { useEffect, useRef } from "react"

import { UPDATE_WIDGET, DELETE_WIDGET, CREATE_WIDGET } from "../graphql/mutations"

import type { UpdateWidgetResponse, DeleteWidgetResponse, DeleteWidgetVariables, CreateWidgetResponse, CreateWidgetVariables } from "../types/widget.types"


export function useCreateWidget() {
    const [mutate] = useMutation<
        CreateWidgetResponse,
        CreateWidgetVariables
    >(CREATE_WIDGET, {
        optimisticResponse: (vars) => ({
            createWidget: {
                __typename: "Widget",
                id: -1,
                title: vars.title,
                description: vars.description,
            },
        }),


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