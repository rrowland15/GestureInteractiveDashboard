import { useEffect, useState } from "react"

type Widget = {
    id: string
    title: string
    description?: string
}

type State = {
    loading: boolean
    error: boolean
    data: Widget[] | null
}

export function useWidgetQuery(): State {
    const [state, setState] = useState<State>({
        loading: true,
        error: false,
        data: null,
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            // simulate success response
            setState({
                loading: false,
                error: false,
                data: [
                    {
                        id: "1",
                        title: "Notes",
                        description: "Fake GraphQL widget",
                    },
                    {
                        id: "2",
                        title: "Stats",
                        description: "Another server-fed widget",
                    },
                ],
            })
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return state
}
