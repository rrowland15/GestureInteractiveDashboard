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
  mutation UpdateWidget($id: Int!, $title: String, $description: String) {
    updateWidget(id: $id, title: $title, description: $description) {
      ...WidgetFields
    }
  }

  ${WIDGET_FIELDS}
`