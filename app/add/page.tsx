'use client'
import {useForm} from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
  Stack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react'

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting},
  } = useForm({
    defaultValues: {
      description: '',
      price: 0
    }
  })

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
    })
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={Boolean(errors.description)}>
        <FormLabel htmlFor='name'>Цена</FormLabel>
        <Input type="number"
               id='price'
               placeholder='Цена'
               {...register('price', {
                 required: 'This is required',
               })}
        />
        <FormErrorMessage>
          {errors.price && errors.price.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(errors.description)}>
        <FormLabel htmlFor='name'>Описание</FormLabel>
        <Textarea
          id='description'
          placeholder='Описание'
          {...register('description', {
            required: 'This is required',
            minLength: {value: 4, message: 'Minimum length should be 4'},
          })}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
  )
}
