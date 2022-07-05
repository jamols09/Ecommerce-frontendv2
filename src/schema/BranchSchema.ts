import * as yup from 'yup'

const telError = {
  message: 'Invalid format',
  excludeEmptyString: true,
}

const BranchSchema = yup.object().shape({
  name: yup.string().nullable().required('Branch name is required'),
  code: yup.string().nullable().notRequired(),
  telephone: yup
    .string()
    .nullable()
    .matches(new RegExp('^[0-9- ]{7,14}$'), telError),
  mobile: yup.string().nullable().notRequired(),
  country: yup.string().nullable().required('Country is required'),
  state: yup.string().nullable().required('Region or state is required'),
  city: yup.string().nullable().required('City is required'),
  barangay: yup.string().nullable().required('Barangay is required'),
  address_line_1: yup
    .string()
    .nullable()
    .required('Address line 1 is required'),
  address_line_2: yup.string().nullable().notRequired(),
  postal: yup.string().nullable().notRequired(),
  longitude: yup.string().nullable().notRequired(),
  latitude: yup.string().nullable().notRequired(),
})

export const BranchForm = BranchSchema.pick([
  'name',
  'code',
  'country',
  'state',
  'city',
  'barangay',
  'address_line_1',
  'address_line_2',
  'postal',
  'longitude',
  'latitude',
  'telephone',
  'mobile',
])
