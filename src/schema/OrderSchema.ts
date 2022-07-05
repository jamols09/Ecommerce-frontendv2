import * as yup from 'yup'

const telError = {
  message: 'Invalid format',
  excludeEmptyString: true,
}

const OrderSchema = yup.object().shape({
  firstName: yup.string().required('First name is required').trim(),
  middleName: yup.string().notRequired().trim(),
  lastName: yup.string().notRequired().trim(),
  country: yup.string().required('Country is required').trim(),
  stateRegion: yup.string().required('State or region is required').trim(),
  province: yup.string().required('Province is required').trim(),
  city: yup.string().required('City is required').trim(),
  barangay: yup.string().required('Barangay is required').trim(),
  line1: yup.string().required('Address Line 1 is required').trim(),
  line2: yup.string().notRequired().trim(),
  postal: yup.number().nullable().typeError('Postal is required').required(),
  mobile: yup.string().notRequired(),
  telephone: yup
    .string()
    .matches(new RegExp('^[0-9- ]{7,14}$'), telError)
    .notRequired(),
})

export const OrderCustomerForm = OrderSchema.pick([
  'firstName',
  'middleName',
  'lastName',
  'country',
  'province',
  'stateRegion',
  'city',
  'barangay',
  'line1',
  'line2',
  'postal',
  'mobile',
  'telephone',
])

export const OrderProductForm = OrderSchema.pick([])

// export const ProductPricingForm = OrderSchema.pick(['price'])
