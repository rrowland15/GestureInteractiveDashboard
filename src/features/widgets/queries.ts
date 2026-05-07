import { gql } from "@apollo/client"

export const GET_WIDGETS = gql`
  query {
    widgets {
      id
      title
      description
    }
  }
`