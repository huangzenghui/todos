import Lokka from 'lokka';
import Transport from 'lokka-transport-http';
import {base_url} from '../config/config';

const client = new Lokka({
  transport: new Transport(`${base_url}/graphql`)
})

const todoInfo = client.createFragment(`
  fragment on Todo {
    _id
    text
    complete
    createAt
  }
`)

export const getTodos = () => {
  return client.query(`
  {
    todos {
      ...${todoInfo}
    }
  }
  `)
}

export const addTodo = (text) => {
  return client.mutate(`
    {
      todo:addTodo(
        text: "${text}"
      ) {
        ...${todoInfo}
      }
    }
  `)
}

export const updateTodo = (id, text) => {
  return client.mutate(`
    {
      updateTodo (
        id: "${id}"
        text: "${text}"
      ){
        ok
      }
    }
  `)
}

export const changeTodosState = (ids, complete) => {
  return client.mutate(`
    (
      $ids: [String]!
      $complete: Boolean!
    ) {
      changeTodosState(
        ids: $ids
        complete: $complete
      ) {
        ok
      }
    }
  `, {ids, complete})
}

export const removeTodos = (ids) => {
  return client.mutate(`
    (
      $ids: [String]!
    ) {
      removeTodos (
        ids: $ids
      ) {
        ok
      }
    }
  `, {ids})
}
