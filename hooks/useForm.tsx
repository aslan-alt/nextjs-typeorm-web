import { AxiosResponse } from 'axios'
import React, { useCallback, useState } from 'react'

type Field<T> = {
    label: string,
    type: 'text' | 'password' | 'textarea',
    key: keyof T
}
type UseFormOptions<T> = {
    initFormData: T,
    fields: Field<T>[],
    text: string;
    submit: {
        request: (formData: T) => Promise<AxiosResponse<T>>;
        success: (result: any) => void;
    }
}

export function useForm<T>(props: UseFormOptions<T>) {
    const { initFormData, fields, submit, text } = props
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
            submit.success(res)
            console.log(res)
        }, (error) => {
            const response: AxiosResponse = error.response
            if (response.status === 422) {
                setErrors({ ...response.data })
            } else if (response.status === 401) {
                alert('请登录')
                location.href = `/sign_in?returnTo=${encodeURIComponent(window.location.pathname)}`
            }
        })
    }, [submit, fromData])

    const form = (
        <div>
            {fields?.map((filed, index) => {
                return (
                    <div key={index}>
                        {filed.label}
                        {filed.type === 'textarea' ?
                            <textarea defaultValue={fromData[filed.key].toString()} onChange={(e) => {
                                onChange(filed.key, e.target.value)
                            }} />
                            :
                            <input type={filed.type}
                                value={fromData[filed.key].toString()}
                                onChange={(e) => {
                                    onChange(filed.key, e.target.value)
                                }} />
                        }

                        {errors[filed.key].length > 0 && errors[filed.key].join(',')}
                    </div>
                )
            })}
            <div>
                <button onClick={_onSubmit} >{text}</button>
            </div>
        </div>
    )

    return { form, setErrors }
}