import { useMutation } from "@apollo/client/react"


import { CREATE_WIDGET } from "../graphql/mutations"

// import type {CreateWidgetResponse, CreateWidgetVariables } from "../types/widget.types"
import type {
    CreateWidgetMutation,
    CreateWidgetMutationVariables
} from "../../../generated/graphql"


export function useCreateWidget() {
    const [mutate] = useMutation<
        CreateWidgetMutation,
        CreateWidgetMutationVariables
    >(CREATE_WIDGET, {
        optimisticResponse: (vars) => ({
            createWidget: {
                __typename: "Widget",
                id: "optimistic-id",
                title: vars.title,
                description: vars.description ?? "",
                order: 0
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