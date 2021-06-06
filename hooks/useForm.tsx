import Form from 'components/Form'
import React, { ChangeEventHandler, useCallback, useState } from 'react'

type Field<T> = {
    label: string,
    type: 'text' | 'password' | 'textarea',
    key: keyof T
}
type UseFormOptions<T> = {
    initFormData: T,
    fields: Field<T>[],
    onSubmit: (fd: T) => void,
    text: string
}

export function useForm<T>(props: UseFormOptions<T>) {
    const { initFormData, fields, onSubmit, text } = props
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
        setFormData({ ...fromData, [key]: value })
    }, [])

    const _onSubmit = useCallback((e) => {
        e.preventDefault()
        onSubmit(fromData)
    }, [onSubmit, fromData])

    const form = (
        <div>

            {fields?.map((filed, index) => {

                return (
                    <div key={index}>
                        {filed.label}
                        {filed.type === 'textarea' ?
                            <textarea onChange={(e) => {
                                onChange(filed.key, e.target.value)
                            }}>{fromData[filed.key]}</textarea>
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