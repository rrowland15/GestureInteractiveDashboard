import { gql } from "@apollo/client"
import { WIDGET_FIELDS } from "./fragments"

export const GET_WIDGETS = gql`
  query GetWidgets {
    widgets {
      ...WidgetFields
    }
  }

  ${WIDGET_FIELDS}
`