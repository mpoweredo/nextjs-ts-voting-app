import { Flex, Center, FormLabel, Button, Stack } from '@chakra-ui/react'
import { FieldArray } from 'formik'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ICreatorInitialValues } from './VotingCreator.type'
import VotingCreatorAnswer from './VotingCreatorAnswer'

interface Props {
  values: ICreatorInitialValues
}

const VotingCreatorAnswerList = ({ values: { answers } }: Props) => {
  return (
    <FieldArray name="answers">
      {arrayHelpers => (
        <>
          <Flex gap={3}>
            <Center>
              <FormLabel htmlFor="voting-answer" fontSize={'2xl'} my={3}>
                Voting answers
              </FormLabel>
              <Button
                size={'sm'}
                onClick={() => arrayHelpers.push({ id: uuidv4(), title: '' })}
                type="button"
                colorScheme="orange"
              >
                Add
              </Button>
            </Center>
          </Flex>
          <Stack direction={'column'} spacing={3}>
            {answers.map((answer, index) => (
              <VotingCreatorAnswer key={answer.id} index={index} arrayHelpers={arrayHelpers} />
            ))}
          </Stack>
        </>
      )}
    </FieldArray>
  )
}

export default VotingCreatorAnswerList
