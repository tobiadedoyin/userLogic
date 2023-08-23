import {z} from "zod"
  
export const inputValidation = z.object({
  username: z.string({
    required_error: "username is required",
    invalid_type_error: "username must be a string",
  }).transform(value => value.toLowerCase().trim()),
  email: z.string({
    required_error: "email is required",
    invalid_type_error: "email must be a string",
  }).email("input is not a valid email").transform(value => value.toLowerCase().trim()),
  password: z.string({
    required_error: "password is required",
    invalid_type_error: "password must be a string",
  }).min(8,{ message: "password Must be 8 or more characters long" })
})