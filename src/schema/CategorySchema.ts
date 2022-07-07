import * as yup from 'yup'

const CategorySchema = yup.object().shape({
  name: yup.string().min(1).nullable().required('Category name is required'),
  parent: yup.string().nullable().notRequired(),
})

export const CategoryForm = CategorySchema.pick(['name', 'parent'])
