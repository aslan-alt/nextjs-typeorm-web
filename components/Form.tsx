import React, { ChangeEventHandler } from 'react'


type Props = {
    fields: {
        label: string,
        type: 'text' | 'password' | 'textarea',
        value: string,
        errors: string[],
        onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    }[],
    onSubmit: () => boolean;
    text: string
}
const Form: React.FC<Props> = (props: Props) => {
    return (
        <div>

            {props?.fields?.map((filed, index) => {
                return (
                    <div key={index}>
                        {filed.label}
                        {filed.type === 'textarea' ?
                            <textarea defaultValue={filed.value} onChange={filed.onChange} />
                            :
                            <input type={filed.type} onChange={filed.onChange} />
                        }

                        {filed.errors.length > 0 && filed.errors.join(',')}
                    </div>
                )
            })}
            <div>
                <button onClick={props.onSubmit} >{props.text}</button>
            </div>
        </div>
    )
}


export default Form