import {
  Box,
  Button,
  RadioGroup,
  BorderedRadio,
  Spacer,
  Flex,
  Text,
  BorderBox,
  Separator,
} from "@artsy/palette"
import React, { useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import styled from "styled-components"
import { SavedAddresses_me } from "v2/__generated__/SavedAddresses_me.graphql"
import {
  AddressModal,
  AddressModalAction,
} from "v2/Apps/Order/Components/AddressModal"
import { CommitMutation } from "v2/Apps/Order/Utils/commitMutation"
import createLogger from "v2/Utils/logger"
import { SavedAddressItem } from "v2/Apps/Order/Components/SavedAddressItem"
import { deleteUserAddress } from "v2/Apps/Order/Mutations/DeleteUserAddress"

export const NEW_ADDRESS = "NEW_ADDRESS"
const PAGE_SIZE = 30

interface SavedAddressesProps {
  me: SavedAddresses_me
  onSelect?: (string) => void
  handleClickEdit: (number) => void
  inCollectorProfile: boolean
  commitMutation?: CommitMutation
  relay: RelayRefetchProp
  addressCount?: number
}
type Address = SavedAddresses_me["addressConnection"]["edges"][0]["node"]

const defaultAddressIndex = addressList => {
  const indexOfDefaultAddress = addressList.findIndex(
    address => address.node.isDefault
  )
  return `${indexOfDefaultAddress > -1 ? indexOfDefaultAddress : 0}`
}

const SavedAddresses: React.FC<SavedAddressesProps> = props => {
  const [modalDetails, setModalDetails] = useState({
    addressModalTitle: null as string,
    addressModalAction: null as AddressModalAction,
  })
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [address, setAddress] = useState(null as Address)
  const logger = createLogger("SavedAddresses.tsx")
  const { onSelect, handleClickEdit, me, inCollectorProfile, relay } = props
  const addressList = me?.addressConnection?.edges ?? []

  const onSuccess = () => {
    relay.refetch(
      {
        first: PAGE_SIZE,
      },
      null,
      error => {
        if (error) {
          logger.error(error)
        }
      }
    )
  }

  const onError = (message: string) => {
    logger.error(message)
  }

  const handleDelete = (addressID: string) => {
    deleteUserAddress(props.commitMutation, addressID, onSuccess, onError)
  }

  const handleEdit = (address: Address) => {
    setShowAddressModal(true)
    setModalDetails({
      addressModalTitle: "Edit address",
      addressModalAction: "editUserAddress",
    })
    setAddress(address)
  }

  const collectorProfileAddressItems = addressList.map((address, index) => {
    if (!address.node) {
      return null
    }

    const isDefaultAddress = address.node.isDefault

    return (
      <BorderBox
        p={2}
        width="100%"
        flexDirection="column"
        key={"addressIndex" + index}
      >
        <SavedAddressItem
          index={index}
          address={address.node}
          handleClickEdit={handleClickEdit}
        />
        <Separator my={1} />
        <ModifyAddressWrapper>
          {!isDefaultAddress && (
            <Box mr={1}>
              <Text
                variant="text"
                color="black60"
                style={{
                  cursor: "pointer",
                }}
              >
                Set as Default
              </Text>
            </Box>
          )}
          <Box mr={1}>
            <Text
              onClick={() => handleEdit(address.node)}
              variant="text"
              color="blue100"
              style={{
                cursor: "pointer",
              }}
            >
              Edit
            </Text>
          </Box>
          <Box>
            <Text
              onClick={() => handleDelete(address.node.internalID)}
              variant="text"
              color="red100"
              style={{
                cursor: "pointer",
              }}
            >
              Delete
            </Text>
          </Box>
        </ModifyAddressWrapper>
      </BorderBox>
    )
  })

  const addAddressButton = (
    <>
      <Button
        mt={addressList.length > 0 ? 3 : 0}
        variant="primaryBlack"
        size="large"
        onClick={() => {
          setShowAddressModal(true),
            setModalDetails({
              addressModalTitle: "Add new address",
              addressModalAction: "createUserAddress",
            })
        }}
      >
        Add new address
      </Button>
      <AddressModal
        show={showAddressModal}
        modalDetails={modalDetails}
        closeModal={() => setShowAddressModal(false)}
        address={address}
        onSuccess={() => onSuccess}
        commitMutation={props.commitMutation}
        onError={onError}
        me={me}
      />
    </>
  )

  const addressItems = addressList
    .map((address, index) => {
      return (
        <BorderedRadio
          value={`${index}`}
          key={index}
          position="relative"
          data-test="savedAddress"
        >
          <SavedAddressItem
            index={index}
            address={address.node}
            handleClickEdit={handleClickEdit}
          />
        </BorderedRadio>
      )
    })
    .concat([
      <BorderedRadio value={NEW_ADDRESS} key="new-address">
        <Text variant="text">Add a new shipping address</Text>
      </BorderedRadio>,
    ])

  return inCollectorProfile ? (
    <>
      <Flex flexDirection="column">{collectorProfileAddressItems}</Flex>
      {addAddressButton}
    </>
  ) : (
    <>
      <RadioGroup
        onSelect={onSelect}
        defaultValue={defaultAddressIndex(addressList)}
      >
        {addressItems}
      </RadioGroup>
      <Spacer p="2" />
    </>
  )
}

const ModifyAddressWrapper = styled(Flex)`
  align-self: flex-end;
  justify-content: space-between;
`

export const SavedAddressesFragmentContainer = createRefetchContainer(
  SavedAddresses,
  {
    me: graphql`
      fragment SavedAddresses_me on Me
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 30 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        id
        addressConnection(
          first: $first
          last: $last
          before: $before
          after: $after
        ) @connection(key: "SavedAddresses_addressConnection") {
          edges {
            node {
              id
              internalID
              addressLine1
              addressLine2
              addressLine3
              city
              country
              isDefault
              name
              phoneNumber
              postalCode
              region
            }
          }
        }
      }
    `,
  },
  graphql`
    query SavedAddressesRefetchQuery {
      me {
        ...SavedAddresses_me
      }
    }
  `
)
