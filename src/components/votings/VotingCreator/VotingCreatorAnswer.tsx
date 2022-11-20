import { Box, Flex, FormLabel, IconButton } from '@chakra-ui/react'
import { creatorInputStyles } from 'data/styles'
import { Field, FieldArrayRenderProps } from 'formik'
import { MdDelete } from 'react-icons/md'
import Input from 'UI/Input'

interface Props {
  index: number
  arrayHelpers: FieldArrayRenderProps
}

const VotingCreatorAnswer = ({ index, arrayHelpers: { remove } }: Props) => {
  return (
    <Flex width={'full'}>
      <Flex w={8} alignItems={'center'}>
        <FormLabel htmlFor={`answers.${index}.id`} fontSize={'xl'} m={0}>
          {index + 1}
        </FormLabel>
      </Flex>
      <Box width={['full', 'auto']}>
        <Field
          {...creatorInputStyles}
          id={`answers.${index}.id`}
          type="text"
          name={`answers.${index}.title`}
          component={Input}
        />
      </Box>
      <IconButton
        onClick={() => remove(index)}
        bg="gray.700"
        _hover={{ bg: 'gray.600' }}
        ml={2}
        aria-label="delete-answer"
      >
        <MdDelete />
      </IconButton>
    </Flex>
  )
}

export default VotingCreatorAnswer
