import * as yup from 'yup'

const EmployeeSchema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  middle_name: yup.string().nullable(),
  last_name: yup.string().nullable(),
  birthdate: yup.date().nullable().required('Birthdate is required'),
  options: yup.array().of(yup.string()).nullable(),
  username: yup.string().min(4).required('Username is required'),
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email is required'),
  password_confirmation: yup
    .string()
    .required('Confirmation is required')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    }),
  password: yup
    .string()
    .min(8, 'Must be at least 8 characters')
    .required('Password is required'),
})

export const EmployeeForm = EmployeeSchema.pick([
  'first_name',
  'middle_name',
  'last_name',
  'birthdate',
  'username',
  'email',
  'options',
  'password',
  'password_confirmation',
])

export const EmployeeEditForm = EmployeeSchema.pick([
  'first_name',
  'middle_name',
  'last_name',
  'birthdate',
  'username',
  'email',
  'options',
])
