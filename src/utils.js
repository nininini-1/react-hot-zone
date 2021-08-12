import {nanoid} from 'nanoid'
import { map, assoc, omit } from 'ramda'

export const addid = map(assoc('id', nanoid()))

export const removeid = map(omit(['id']))
