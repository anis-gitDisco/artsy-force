import { Flex, Message } from "@artsy/palette"
import {
  Error,
  Footer,
  ForgotPassword,
  FormContainer as Form,
  SubmitButton,
} from "v2/Components/Authentication/commonElements"
import {
  FormProps,
  InputValues,
  ModalType,
} from "v2/Components/Authentication/Types"
import { LoginValidator } from "v2/Components/Authentication/Validators"
import { PasswordInput } from "v2/Components/PasswordInput"
import QuickInput from "v2/Components/QuickInput"
import { Formik, FormikProps, useFormikContext } from "formik"
import React, { Component, useEffect, useState } from "react"
import { recaptcha } from "v2/Utils/recaptcha"
import {
  isOtpError,
  isMissingOnDemandOtpError,
} from "v2/Components/Authentication/helpers"

interface ConditionalOtpInputProps {
  error: string
}

const ConditionalOtpInput: React.FC<ConditionalOtpInputProps> = props => {
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [showOtpOnDemandPrompt, setShowOtpOnDemandPrompt] = useState(false)
  const {
    errors,
    values,
    handleBlur,
    handleChange,
    setTouched,
  } = useFormikContext<InputValues>()
  const { error } = props

  if (!showOtpInput) {
    if (isOtpError(error)) setShowOtpInput(true)
    if (isMissingOnDemandOtpError(error)) setShowOtpOnDemandPrompt(true)
  }

  return (
    <>
      {showOtpOnDemandPrompt && (
        <Message>
          Your safety and security are important to us. Please check your email
          for a one-time authentication code to complete your login.
        </Message>
      )}
      {showOtpInput && (
        <QuickInput
          block
          error={errors.otp_attempt}
          name="otp_attempt"
          placeholder="Enter an authentication code"
          value={values.otp_attempt}
          label="Authentication Code"
          onChange={handleChange}
          onBlur={handleBlur}
          setTouched={setTouched}
          touchedOnChange={false}
          autoFocus
        />
      )}
    </>
  )
}

export interface LoginFormState {
  error?: string | null
  isSocialSignUp: boolean
  isLoading: boolean
  otpRequired: boolean
}

interface SubmitValues extends InputValues {
  otpRequired: boolean
}

export class LoginForm extends Component<FormProps, LoginFormState> {
  state = {
    error: this.props.error,
    isSocialSignUp: false,
    isLoading: false,
    otpRequired: false,
  }

  onSubmit = (values: InputValues, formikBag: FormikProps<InputValues>) => {
    recaptcha("login_submit")
    this.setState(
      {
        isSocialSignUp: false,
        isLoading: true,
      },
      () => {
        const submitValues: SubmitValues = {
          ...values,
          otpRequired: this.state.otpRequired,
        }
        this.props.handleSubmit?.(submitValues, formikBag)
      }
    )
  }

  render() {
    return (
      <Formik
        initialValues={this.props.values || {}}
        onSubmit={this.onSubmit}
        validationSchema={LoginValidator}
      >
        {({
          values,
          errors,
          touched,
          handleChange: formikHandleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          status,
          setStatus,
        }: FormikProps<InputValues>) => {
          const globalError: string =
            this.state.error || (status && !status.success && status.error)

          useEffect(() => {
            if (globalError) {
              this.setState({ isLoading: false })
            }

            if (isOtpError(globalError)) {
              this.setState({
                otpRequired: true,
              })
            }
          }, [globalError, status])

          const handleChange = e => {
            setStatus(null)
            this.setState({ error: null })
            formikHandleChange(e)
          }

          return (
            <Form onSubmit={handleSubmit} data-test="LoginForm">
              <QuickInput
                block
                error={
                  (!this.state.isSocialSignUp &&
                    touched.email &&
                    errors.email) ||
                  ""
                }
                placeholder="Enter your email address"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoFocus
              />
              <PasswordInput
                block
                error={(touched.password && errors.password) || ""}
                placeholder="Enter your password"
                name="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ConditionalOtpInput error={globalError} />
              <Flex alignItems="center" justifyContent="flex-end">
                <ForgotPassword
                  onClick={() =>
                    this.props.handleTypeChange?.(ModalType.forgot)
                  }
                />
              </Flex>
              {globalError && !isOtpError(globalError) && (
                <Error show>{globalError}</Error>
              )}
              <SubmitButton loading={isSubmitting || this.state.isLoading}>
                Log in
              </SubmitButton>
              <Footer
                handleTypeChange={() =>
                  this.props.handleTypeChange?.(ModalType.signup)
                }
                mode={"login" as ModalType}
                onAppleLogin={e => {
                  this.setState(
                    {
                      isSocialSignUp: true,
                    },
                    () => {
                      this.props.onAppleLogin?.(e)
                    }
                  )
                }}
                onFacebookLogin={e => {
                  this.setState(
                    {
                      isSocialSignUp: true,
                    },
                    () => {
                      this.props.onFacebookLogin?.(e)
                    }
                  )
                }}
                inline
              />
            </Form>
          )
        }}
      </Formik>
    )
  }
}
