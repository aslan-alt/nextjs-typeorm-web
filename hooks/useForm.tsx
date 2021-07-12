import { AxiosResponse } from 'axios'
import Link from 'next/link';
import React, { useCallback, useState } from 'react'
import FormWrapper from 'styles/formStyle'

type Field<T> = {
    label: string,
    type: 'text' | 'password' | 'textarea',
    key: keyof T
}
type UseFormOptions<T> = {
    initFormData: T,
    fields: Field<T>[],
    buttonText: string;
    submit: {
        request: (formData: T) => Promise<AxiosResponse<T>>;
        success: (result: any, fromData: T) => void;
    },
    goToSignIn?: boolean;
}

export function useForm<T>(props: UseFormOptions<T>) {
    const { initFormData, fields, submit, buttonText, goToSignIn } = props
    type Keys = keyof T
    const [fromData, setFormData] = useState(initFormData)
    const [errors, setErrors] = useState(() => {
        const e: { [k in Keys]?: string[] } = {}
        Object.keys(initFormData).forEach(key => {
            e[key as Keys] = []
        })
        return e
    })
    const onChange = useCallback((key: Keys, value: string) => {
        setFormData(state => ({ ...state, [key]: value }))
    }, [])

    const _onSubmit = useCallback((e) => {
        e.preventDefault()
        submit.request(fromData).then(res => {
            submit.success(res, fromData)

        }, (error) => {
            const response: AxiosResponse = error.response
            if (response.status === 422) {
                setErrors({ ...response.data })
            }
            // else if (response.status === 401) {
            //     location.href = `/sign_in?returnTo=${encodeURIComponent(window.location.pathname)}`
            // }
        })
    }, [submit, fromData])

    const form = (
        <FormWrapper>
            {fields?.map((filed, index) => {
                return (
                    <div key={index} className="form-item">
                        {/* <div className="title">{filed.label}</div> */}
                        {filed.type === 'textarea' ?
                            <textarea className="form-item-input"
                                placeholder={filed.label}
                                defaultValue={fromData[filed.key].toString()}
                                onChange={(e) => {
                                    onChange(filed.key, e.target.value)
                                }} />
                            :
                            <input type={filed.type}
                                className="form-item-input"
                                placeholder={filed.label}
                                value={fromData[filed.key].toString()}
                                onChange={(e) => {
                                    onChange(filed.key, e.target.value)
                                }} />
                        }

                        <div className="error">
                            {errors[filed.key].length > 0 && errors[filed.key].join(',')}
                        </div>

                    </div>
                )
            })}
            <div className="submit">
                <button onClick={_onSubmit} >{buttonText}</button>
            </div>
            {
                goToSignIn &&
                <div className="go-to-sign-up">
                    <Link href={'/sign_up'}>
                        <a><span>没有账号？</span>立即注册 </a>
                    </Link>
                </div>
            }

        </FormWrapper>
    )

    return { form, setErrors }
}