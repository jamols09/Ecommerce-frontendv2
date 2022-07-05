import * as yup from 'yup'

const ProductSchema = yup.object().shape({
  name: yup.string().min(3).required('Product name is required'),
  sku: yup.string(),
  department_id: yup.string().nullable().required('Please select department'),
  description: yup.string().required('Product description is required'),
  images: yup.mixed().required('Please select an image'),

  options: yup.array().of(yup.string()),
  branches: yup
    .array()
    .of(yup.string())
    .nullable()
    .required('Please select a branch'),
  quantity: yup.number().typeError('Empty field not allowed'),
  quantity_warn: yup.number().typeError('Empty field not allowed'),
  tags: yup.array().of(yup.string()).nullable().notRequired(),
  colors: yup.array().of(yup.string()).nullable().notRequired(),
  size: yup.array().of(yup.string()).nullable().notRequired(),
  weight_unit: yup.string().nullable(),
  weight_amount: yup.number().typeError('Empty field not allowed'),
  dimension_unit: yup.string().nullable(),
  length: yup.number().typeError('Empty field not allowed'),
  height: yup.number().typeError('Empty field not allowed'),
  width: yup.number().typeError('Empty field not allowed'),

  price: yup.number().typeError('Empty field not allowed'),
})

export const ProductInfoForm = ProductSchema.pick([
  'name',
  'sku',
  'description',
  'department_id',
  'images',
])

export const ProductSpecsForm = ProductSchema.pick([
  'branches',
  'quantity',
  'quantity_warn',
  'tags',
  'colors',
  'size',
  'weight_unit',
  'weight_amount',
  'dimension_unit',
  'length',
  'height',
  'width',
])

export const ProductPricingForm = ProductSchema.pick(['price'])
