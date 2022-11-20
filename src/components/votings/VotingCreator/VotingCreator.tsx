import { Box, Button, Flex, FormLabel, useToast, VStack } from '@chakra-ui/react'
import Input from 'UI/Input'
import { Field, Form, Formik } from 'formik'
import { ICreatorInitialValues } from './VotingCreator.type'
import VotingCreatorAnswerList from './VotingCreatorAnswerList'
import { creatorInputStyles } from 'data/styles'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Voting } from 'store/VotingContext'
import { newVotingSchema } from 'data/validationSchemas'

const VotingCreator = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()
  const { addVoting } = Voting()
  const toast = useToast()

  const submitHandler = async (values: ICreatorInitialValues) => {

    if (values.answers.length <= 1) {
      toast({
        title: 'Error!',
        description: 'There have to be atleast 2 possible answers!',
        status: 'error',
      })
      return
    }

    setIsLoading(true)
    try {
      await addVoting(values)
      toast({
        title: 'Voting created!',
        description: '',
        status: 'success',
      })
      push('/votings')
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          title: 'Error!',
          description: e.message,
          status: 'error',
        })
      }
    }

    setIsLoading(false)
  }

  const initialValues: ICreatorInitialValues = {
    title: '',
    answers: [],
  }

  return (
    <VStack alignItems={'start'} spacing={3}>
      <Formik validationSchema={newVotingSchema} onSubmit={submitHandler} initialValues={initialValues}>
        {({ values }) => (
          <Flex w="full" as={Form} flexDir={'column'}>
            <Box>
              <FormLabel htmlFor="title" fontSize={'2xl'} mb={3}>
                Voting name
              </FormLabel>
              <Field {...creatorInputStyles} id="title" type="text" name="title" component={Input} />
            </Box>
            <VotingCreatorAnswerList values={values} />
            <Button isLoading={isLoading} width={['full', 36]} mt={5} type="submit" colorScheme="teal">
              Create voting
            </Button>
          </Flex>
        )}
      </Formik>
    </VStack>
  )
}

export default VotingCreator
