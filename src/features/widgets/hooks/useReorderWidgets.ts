import { useMutation } from "@apollo/client/react"
import { REORDER_WIDGETS } from "../graphql/mutations"

export function useReorderWidgets() {
    const [reorderWidgets] = useMutation(REORDER_WIDGETS)

    return { reorderWidgets }
}