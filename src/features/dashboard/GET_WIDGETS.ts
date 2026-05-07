import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"

export const GET_WIDGETS = gql`
  query GetWidgets {
    widgets {
      id
      title
      description
    }
  }
`