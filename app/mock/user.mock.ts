import { v4 } from 'uuid'
import {UserModel} from "~/app/model/user.model";

export const collection: UserModel[] = [
  { uuid: v4(), email: 'test1@test.com', name: 'Tester 1' },
  { uuid: v4(), email: 'test2@test.com', name: 'Tester 2' },
  { uuid: v4(), email: 'test3@test.com', name: 'Tester 3' },
  { uuid: v4(), email: 'test4@test.com', name: 'Tester 4' },
  { uuid: v4(), email: 'test5@test.com', name: 'Tester 5' },
  { uuid: v4(), email: 'test6@test.com', name: 'Tester 6' },
]
