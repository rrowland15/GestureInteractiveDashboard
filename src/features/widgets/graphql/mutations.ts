import { gql } from "@apollo/client"
import { WIDGET_FIELDS } from "./fragments"


export const CREATE_WIDGET = gql`
  mutation CreateWidget($title: String!, $description: String) {
    createWidget(title: $title, description: $description) {
      ...WidgetFields
    }
  }

  ${WIDGET_FIELDS}
`

export const DELETE_WIDGET = gql`
  mutation DeleteWidget($id: Int!) {
    deleteWidget(id: $id) {
      id
    }
  }
  
`

export const UPDATE_WIDGET = gql`
  mutation UpdateWidget($id: Int!, $title: String, $description: String, $order: Int) {
    updateWidget(id: $id, title: $title, description: $description, order: $order) {
      ...WidgetFields
    }
  }

  ${WIDGET_FIELDS}
`

export const REORDER_WIDGETS = gql`
mutation ReorderWidgets($ids: [ID!]!) {
  reorderWidgets(ids: $ids) {
    ...WidgetFields
  }
}
${WIDGET_FIELDS}
`