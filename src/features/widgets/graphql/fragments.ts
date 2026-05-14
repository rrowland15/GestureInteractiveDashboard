import { gql } from "@apollo/client"

export const WIDGET_FIELDS = gql`
  fragment WidgetFields on Widget {
    id
    title
    description
  }
`